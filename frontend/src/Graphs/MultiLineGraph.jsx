// import React, { useEffect, useRef } from "react";
// import * as echarts from "echarts";

// export default function MultiLineGraph({ data }) {
//   const chartRef = useRef(null);
//   const chart = useRef(null);

//   useEffect(() => {
//     if (!chart.current) {
//       chart.current = echarts.init(chartRef.current);
//     }
//     return () => chart.current && chart.current.dispose();
//   }, []);

//   useEffect(() => {
//     if (!chart.current || data.length === 0) return;

//     // ⭐ DATE + TIME formatted
//     const times = data.map((d) => {
//       const date = new Date(d.time);
//       return date.toLocaleString("en-GB", {
//         day: "2-digit",
//         month: "2-digit",
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit",
//         hour12: false,
//       });
//     });

//     const voltage = data.map((d) => d.voltage);
//     const current = data.map((d) => d.current);
//     const soc = data.map((d) => d.soc);

//     chart.current.setOption({
//       backgroundColor: "transparent",

//       title: {
//         text: "Battery Live Graph",
//         left: "center",
//         top: 10,
//         textStyle: { fontSize: 20, fontWeight: "bold", color: "#333" },
//       },

//       tooltip: {
//         trigger: "axis",
//         backgroundColor: "#fff",
//         borderColor: "#ddd",
//         borderWidth: 1,
//         textStyle: { color: "#000" },
//         padding: 10,
//       },

//       legend: {
//         data: ["Voltage (V)", "Current (A)", "SOC (%)"],
//         top: 55,
//         textStyle: { fontSize: 14, color: "#333" },
//         icon: "circle",
//       },

//       grid: {
//         top: 110,
//         left: 60,
//         right: 100,
//         bottom: 70,
//       },

//       xAxis: {
//         type: "category",
//         data: times,
//         axisLabel: {
//           rotate: 45,
//           color: "#555",
//           fontSize: 10,
//           margin: 18,
//         },
//         axisLine: { lineStyle: { color: "#ccc" } },
//       },

//       yAxis: [
//         {
//           name: "Voltage (V)",
//           type: "value",
//           position: "left",

//           min: -500,
//           max: 500,

//           nameTextStyle: { color: "#3a5fcd", fontWeight: "bold" },
//           axisLine: { lineStyle: { color: "#3a5fcd" } },
//           axisLabel: { color: "#3a5fcd" },
//           splitLine: { lineStyle: { color: "#eee" } },
//         },
//         {
//           name: "Current (A)",
//           type: "value",
//           position: "right",
//           offset: 60,

//           min: -500,
//           max: 500,

//           nameTextStyle: { color: "#39c", fontWeight: "bold" },
//           axisLine: { lineStyle: { color: "#39c" } },
//           axisLabel: { color: "#39c" },
//         },
//         {
//           name: "SOC (%)",
//           type: "value",
//           position: "right",
//           offset: 120,

//           // ⭐ FIXED RANGE
//           min: 0,
//           max: 100,

//           nameTextStyle: { color: "#27ae60", fontWeight: "bold" },
//           axisLine: { lineStyle: { color: "#27ae60" } },
//           axisLabel: { color: "#27ae60" },
//         },
//       ],

//      series: [
//   {
//     name: "Voltage (V)",
//     type: "line",
//     smooth: true,
//     yAxisIndex: 0,
//     data: voltage,
//     symbol: "circle",
//     symbolSize: 4,
//     lineStyle: { width: 2, color: "#3a5fcd" },
//     areaStyle: null, // ❌ remove area color
//   },
//   {
//     name: "Current (A)",
//     type: "line",
//     smooth: true,
//     yAxisIndex: 1,
//     data: current,
//     symbol: "circle",
//     symbolSize: 4,
//     lineStyle: { width: 2, color: "#27ae60" }, 
//     areaStyle: null, // ❌ remove light-blue background
//   },
//   {
//     name: "SOC (%)",
//     type: "line",
//     smooth: true,
//     yAxisIndex: 2,
//     data: soc,
//     symbol: "circle",
//     symbolSize: 4,
//     lineStyle: { width: 2, color: "#555" }, // black/grey
//     areaStyle: null, // ❌ remove fill
//   },
// ],

//     });
//   }, [data]);

//   return (
//     <div
//       ref={chartRef}
//       style={{
//         height: "500px",
//         width: "100%",
//         background: "white",
//         borderRadius: "12px",
//         boxShadow: "0 4px 18px rgba(0,0,0,0.12)",
//         padding: "10px",
//       }}
//     />
//   );
// }
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function MultiLineGraph({ data }) {
  const voltageRef = useRef(null);
  const currentRef = useRef(null);
  const socRef = useRef(null);

  const voltageChart = useRef(null);
  const currentChart = useRef(null);
  const socChart = useRef(null);

  useEffect(() => {
    if (!voltageChart.current)
      voltageChart.current = echarts.init(voltageRef.current);

    if (!currentChart.current)
      currentChart.current = echarts.init(currentRef.current);

    if (!socChart.current)
      socChart.current = echarts.init(socRef.current);

    return () => {
      voltageChart.current?.dispose();
      currentChart.current?.dispose();
      socChart.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const times = data.map((d) => {
      const date = new Date(d.time);
      return date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    });

    const voltage = data.map((d) => d.voltage);
    const current = data.map((d) => d.current);
    const soc = data.map((d) => d.soc);

    // ------------------------------------------
    // ⭐ 1) VOLTAGE GRAPH
    // ------------------------------------------
    voltageChart.current.setOption({
      title: {
        text: "Voltage vs Time",
        left: "center",
        top: 10,
      },
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: times,
        axisLabel: { rotate: 45 },
      },
      yAxis: {
        type: "value",
        name: "Voltage (V)",
        nameLocation: "middle",
        nameGap: 40,
      },
      series: [
        {
          name: "Voltage",
          type: "line",
          smooth: true,
          data: voltage,
          lineStyle: { width: 2, color: "#3a5fcd" },
        },
      ],
    });

    // ------------------------------------------
    // ⭐ 2) CURRENT GRAPH
    // ------------------------------------------
    currentChart.current.setOption({
      title: {
        text: "Current vs Time",
        left: "center",
        top: 10,
      },
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: times,
        axisLabel: { rotate: 45 },
      },
      yAxis: {
        type: "value",
        name: "Current (A)",
        nameLocation: "middle",
        nameGap: 40,
      },
      series: [
        {
          name: "Current",
          type: "line",
          smooth: true,
          data: current,
          lineStyle: { width: 2, color: "#27ae60" },
        },
      ],
    });

    // ------------------------------------------
    // ⭐ 3) SOC GRAPH
    // ------------------------------------------
    socChart.current.setOption({
      title: {
        text: "SOC vs Time",
        left: "center",
        top: 10,
      },
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: times,
        axisLabel: { rotate: 45 },
      },
      yAxis: {
        type: "value",
        name: "SOC (%)",
        nameLocation: "middle",
        nameGap: 40,
      },
      series: [
        {
          name: "SOC",
          type: "line",
          smooth: true,
          data: soc,
          lineStyle: { width: 2, color: "#000" },
        },
      ],
    });
  }, [data]);

  return (
    <div style={{ width: "100%" }}>
    <div style={{display: "flex", gap: "10px"}}>
          <div
        ref={voltageRef}
        style={{
          height: "350px",
           width: "50%",
          background: "#fff",
          marginBottom: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          padding: "10px",
        }}
      />

      <div
        ref={currentRef}
        style={{
          height: "350px",
           width: "50%",
          background: "#fff",
          marginBottom: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          padding: "10px",
        }}
      />

    </div>
      <div
        ref={socRef}
        style={{
          height: "320px",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          padding: "10px",
        }}
      />
    </div>
  );
}


// {
//     "name": "ME9BT225E01573003",
//     "uniqueid": "864524076178833",
//     "lastupdate": "2025-11-24T17:35:14.648Z",
//     "state": "stopped",
//     "model": "Moonrider Compact Tractor ",
//     "deviceTime": "2025-11-24T17:35:09.000Z",
//     "fixTime": "2025-11-24T23:05:09.000+0530",
//     "contact": "864524076178833",
//     "type": "tractor",
//     "disabled": false,
//     "valid": true,
//     "latitude": 13.09369834,
//     "longitude": 77.56625,
//     "speed": 0.0,
//     "course": 0.0,
//     "statesince": "",
//     "devicetags": "",
//     "accountId": "9dded89c2a0f",
//     "attributes": {
//         "motion": false,
//         "ignition": 0,
//         "iotVoltage": 12.33,
//         "battery": 4.75,
//         "odometer": 36945,
//         "odokm": 36.945,
//         "rssi": -69,
//         "sat": 16,
//         "distToEmpty": 0,
//         "chargeTime": 0,
//         "contFault": 0,
//         "odoCan": 0,
//         "regenFlag": 0,
//         "controllerTemp": 36,
//         "motorTemp": 27,
//         "motorSpeed": 0,
//         "motorFault": 0,
//         "ratedCapacity": 24.0,
//         "battVoltage": 75.9,
//         "timeToDischarge": 0.0,
//         "battCurrent": 3.0,
//         "power": 227.70000000000002,
//         "maxCellVoltage": 3.5,
//         "minCellVoltage": 3.394,
//         "cellVoltDiff": "",
//         "chargeCycleCount": 0,
//         "dischargeCycleCount": 0,
//         "alarm": "",
//         "maxTemp": 41,
//         "battTemp": 0,
//         "battEnergy": 0.0,
//         "fwVersion": "moonRider_27Hp_500K_v4_141125",
//         "speed": 0,
//         "canBusStatus": 4,
//         "batOta": 0,
//         "contOca": 0,
//         "charDischarState": 0,
//         "soc": 100,
//         "soh": 100,
//         "batOva": 0,
//         "batUva": 0,
//         "protection": "",
//         "thermRa": 0,
//         "totRst": 247,
//         "rstRsn": 3
//     },
//     "staticField": "",
//     "accId": 0,
//     "deviceId": 0
// }