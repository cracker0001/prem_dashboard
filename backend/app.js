import express from "express";
import cors from "cors";
import {
  AthenaClient,
  StartQueryExecutionCommand,
  GetQueryExecutionCommand,
  GetQueryResultsCommand,
} from "@aws-sdk/client-athena";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const athenaClient = new AthenaClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

app.post("/data", async (req, res) => {
  try {
    const { tractorId, startDate, endDate } = req.body;

    const startQuery = new StartQueryExecutionCommand({
      QueryString: `
 SELECT
    accId,
    accountId,
    contact,
    course,
    deviceId,
    deviceTime,
    devicetags,
    disabled,
    fixTime,
    lastupdate,
    latitude,
    longitude,
    model,
    name,
    speed,
    state,
    statesince,
    staticField,
    type,
    uniqueid,
    valid,
    p_date,
    p_hour,
    attributes.alarm,
    attributes.batOta,
    attributes.batOva,
    attributes.batUva,
    attributes.battCurrent,
    attributes.battEnergy,
    attributes.battVoltage,
    attributes.battery,
    attributes.canBusStatus,
    attributes.cellVoltDiff,
    attributes.charDischarState,
    attributes.chargeCycleCount,
    attributes.chargeTime,
    attributes.contFault,
    attributes.contOca,
    attributes.controllerTemp,
    attributes.dischargeCycleCount,
    attributes.distToEmpty,
    attributes.fwVersion,
    attributes.ignition,
    attributes.iotVoltage,
    attributes.maxCellVoltage,
    attributes.minCellVoltage,
    attributes.motion,
    attributes.motorFault,
    attributes.motorSpeed,
    attributes.motorTemp,
    attributes.odoCan,
    attributes.odokm,
    attributes.odometer,
    attributes.power,
    attributes.protection,
    attributes.ratedCapacity,
    attributes.regenFlag,
    attributes.rssi,
    attributes.rstRsn,
    attributes.sat,
    attributes.soc,
    attributes.soh,
    attributes.speed,
    attributes.thermRa,
    attributes.timeToDischarge,
    attributes.totRst
    
FROM
    tractor_data_optimized 
WHERE
  p_date BETWEEN '${startDate}' AND '${endDate}'
  AND name = '${tractorId}'
ORDER BY 
  fixtime ASC;    

      `,
      QueryExecutionContext: { Database: process.env.ATHENA_DATABASE_NAME },
      ResultConfiguration: { OutputLocation: process.env.ATHENA_OUTPUT_LOCATION },
    });

    const queryResponse = await athenaClient.send(startQuery);
    const queryExecutionId = queryResponse.QueryExecutionId;

    let state = "RUNNING";
    while (state === "RUNNING" || state === "QUEUED") {
      const getExecution = new GetQueryExecutionCommand({ QueryExecutionId: queryExecutionId });
      const executionResult = await athenaClient.send(getExecution);
      state = executionResult.QueryExecution.Status.State;
      if (state === "FAILED") return res.status(500).json({ error: "Athena query failed" });
      if (state === "SUCCEEDED") break;
      await new Promise((r) => setTimeout(r, 1000));
    }

    const getResults = new GetQueryResultsCommand({ QueryExecutionId: queryExecutionId });
    const results = await athenaClient.send(getResults);

    const columns = results.ResultSet.ResultSetMetadata.ColumnInfo.map((col) => col.Name);
    const rows = results.ResultSet.Rows.slice(1).map((row) => {
      const obj = {};
      row.Data.forEach((val, idx) => {
        obj[columns[idx]] = val.VarCharValue || null;
      });
      return obj;
    });

    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching data:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/history", async (req, res) => {
  try {
    const { tractorId } = req.body;

    if (!tractorId) {
      return res.status(400).json({ error: "tractorId is required" });
    }

    // Last 7 days
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    const format = (d) => d.toISOString().split("T")[0];
    const start = format(startDate);
    const end = format(endDate);

    console.log("📌 HISTORY QUERY:", tractorId, start, end);

    // ⭐ MAIN QUERY
    const query = `
      SELECT 
        fixTime,
        attributes.battVoltage,
        attributes.battCurrent,
        attributes.soc
      FROM tractor_data_optimized
      WHERE name = '${tractorId}'
      AND TRY(
            to_unixtime(
              from_iso8601_timestamp(
                regexp_replace(fixTime, '(\\\\+\\\\d{2})(\\\\d{2})$', '\\\\1:\\\\2')
              )
            )
          ) * 1000
      BETWEEN 
        to_unixtime(from_iso8601_timestamp('${start}T00:00:00+05:30')) * 1000
      AND 
        to_unixtime(from_iso8601_timestamp('${end}T23:59:59+05:30')) * 1000
      ORDER BY fixTime ASC;
    `;

    // ⭐ START QUERY EXECUTION
    const startQuery = new StartQueryExecutionCommand({
      QueryString: query,
      QueryExecutionContext: {
        Database: process.env.ATHENA_DATABASE_NAME,
      },
      ResultConfiguration: {
        OutputLocation: process.env.ATHENA_OUTPUT_LOCATION,
      },
    });

    const queryResponse = await athenaClient.send(startQuery);
    const queryExecutionId = queryResponse.QueryExecutionId;

    // ⭐ WAIT FOR COMPLETION
    let state = "RUNNING";
    while (state === "RUNNING" || state === "QUEUED") {
      const exec = await athenaClient.send(
        new GetQueryExecutionCommand({ QueryExecutionId: queryExecutionId })
      );

      state = exec.QueryExecution.Status.State;

      if (state === "FAILED") {
        console.log("❌ ATHENA FAILED:", exec.QueryExecution.Status);
        return res.status(500).json({ error: "Athena query failed" });
      }

      if (state === "SUCCEEDED") break;
      await new Promise((r) => setTimeout(r, 500));
    }

    // ⭐ FETCH PAGINATED RESULTS
    let rows = [];
    let nextToken = null;

    do {
      const result = await athenaClient.send(
        new GetQueryResultsCommand({
          QueryExecutionId: queryExecutionId,
          NextToken: nextToken || undefined,
        })
      );

      const cols = result.ResultSet.ResultSetMetadata.ColumnInfo.map(
        (c) => c.Name
      );

      const dataRows = nextToken
        ? result.ResultSet.Rows
        : result.ResultSet.Rows.slice(1); // skip header in first page

      const parsed = dataRows
        .map((row) => {
          let obj = {};
          row.Data.forEach((val, i) => {
            obj[cols[i]] = val.VarCharValue || null;
          });

          // Skip invalid fixTime
          if (!obj.fixTime) return null;

          // Convert +0530 → +05:30
          obj.fixTime = obj.fixTime.replace(/(\+\d{2})(\d{2})$/, "$1:$2");

          return obj;
        })
        .filter(Boolean);

      rows = [...rows, ...parsed];

      nextToken = result.NextToken;
    } while (nextToken);

    console.log(`📌 TOTAL ROWS SENT: ${rows.length}`);

    // ⭐ SEND ALL ROWS
    res.json(rows);

  } catch (err) {
    console.error("🔥 HISTORY ERROR:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});



app.get("/vehicle", async (req, res) => {
    const { tractorId } = req.query;
    if (!tractorId) {
        return res.status(400).json({ error: "tractorId is required" });
    }
    const moonriderURL = `https://backend-prod.moonrider.ai/iniesta/sse/subscribe/?name=${tractorId}`;

    try {
        const response = await fetch(moonriderURL, {
            headers: { 'Accept': 'text/event-stream' }
        });

        if (!response.ok || !response.body) {
            const status = response ? response.status : 'No Status';
            const statusText = response ? response.statusText : 'Unknown Error';
            return res.status(500).json({ 
                error: `Failed to connect to Moonrider. Status: ${status} ${statusText}` 
            });
        }

        let rawData = "";
        const decoder = new TextDecoder('utf-8');
        let done = false;

        const reader = response.body.getReader();

        while (!done) {
            const { value, done: readerDone } = await reader.read();
            done = readerDone;

            if (value) {
                const chunkStr = decoder.decode(value, { stream: !done });
                rawData += chunkStr;

                
                if (rawData.includes("data:")) {
                    break; 
                }
            }
        }
        
      
        reader.cancel(); 

       
        const jsonLine = rawData
            .split("\n")
            .find((line) => line.startsWith("data:"));

        const jsonString = jsonLine?.replace(/^data: ?/, "").trim(); 

        const parsedData = JSON.parse(jsonString || "{}");

        res.status(200).json([parsedData]);

    } catch (err) {
        console.error("❌ SSE fetch error:", err.message);
        res.status(500).json({ error: `Internal SSE fetch error: ${err.message}` });
    }
});
const PORT = 6000;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});


