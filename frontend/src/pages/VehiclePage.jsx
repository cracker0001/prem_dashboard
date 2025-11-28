import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./Dashboard.css";
import LiveData from "./LiveData.jsx";
import Graph from "./graph.jsx";
import "./VehiclePage.css";
export default function VehiclePage() {
  const [tractorId, setTractorId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("find");
  const [liveInfo, setLiveInfo] = useState(null);


  const handleFindData = () => {
    setActiveTab("find");
    handleSearch();
  };

//   const handleSearch = async () => {
//     setData([]);
//     setError(null);
//     setIsLoading(true);

//     try {
//       if (!tractorId || !startDate || !endDate) {
//         alert("Please fill all fields before searching.");
//         return;
//       }

//       const res = await fetch("/api-local/data", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ tractorId, startDate, endDate })
//       });

//       const responseData = await res.json();
//       setData(responseData);

//     } catch (err) {
//       setError("Failed to fetch data.");
//     } finally {
//       setIsLoading(false);
//     }
//   };


//for calling live data
useEffect(() => {
  if (activeTab !== "live" || !tractorId) return;

  const fetchLive = async () => {
    try {
      const res = await fetch(`/api-local/vehicle?tractorId=${tractorId}`);
      const json = await res.json();
      setLiveInfo(json[0]);  // full info object
    } catch (e) {
      console.log("Live fetch error", e);
    }
  };

  fetchLive();

  const timer = setInterval(fetchLive, 2000);
  return () => clearInterval(timer);
}, [activeTab, tractorId]);


const handleSearch = async () => {
  setError(null);
  setIsLoading(true);

  console.log("🔍 Searching...");
  console.log("Sending:", { tractorId, startDate, endDate });

  try {
    if (!tractorId || !startDate || !endDate) {
      alert("Please fill all fields before searching.");
      setIsLoading(false);    // ← FIXED
      return;
    }

    const res = await fetch("/api-local/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tractorId, startDate, endDate })
    });

    console.log("STATUS:", res.status);

    const responseData = await res.json();
    console.log("API RESPONSE:", responseData);

    setData(responseData);

  } catch (err) {
    console.log("FETCH ERROR:", err);
    setError("Failed to fetch data.");
  } finally {
    setIsLoading(false);
  }
};


  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const fileName = `TractorData_${tractorId}_${startDate}_${endDate}.xlsx`;
    saveAs(blob, fileName);
  };

  return (
 <div className="vehiclepage">

  <div className="text">
    <h3>Enter VIN details</h3>
  </div>

  {/* VIN + DATE FORM */}
  <div className="vin-details">
    <div className="vin-box">
      <div className="vehicle-value">
        
        <div className="vehicle-value-left">
          <div className="vin">
            <p>VIN number</p>
            <div className="input-vin">
              <input
                value={tractorId}
                onChange={(e) => setTractorId(e.target.value)}
                placeholder="Enter VIN number"
              />
            </div>
          </div>

          <div className="dates">
            <div className="start-date">
              <label>Start Date</label>
              <input
                className="select-dates"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="end-date">
              <label>End Date</label>
              <input
                className="select-dates"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="submit">
            <button
              className="dashboard-data"
              onClick={handleFindData}
              disabled={isLoading}
            >
              {isLoading ? "Searching..." : "Submit"}
            </button>
          </div>
        </div>

        <div className="vehicle-value-right">
          <div className="instructions">
            <ul>
              <li>Enter the VIN to fetch vehicle-specific records.</li>
              <li>Select the Start and End Dates to filter the expected time range.</li>
              <li>Click Submit to generate and view the detailed report.</li>
            </ul>
          </div>
        </div>

      </div> {/* vehicle-value */}
    </div> {/* vin-box */}
  </div> {/* vin-details */}

  {/* TABS — MOVED INSIDE VEHICLEPAGE */}
  <div className="content">
    <button
      className={`dashboard-data ${activeTab === "find" ? "active" : ""}`}
      onClick={handleFindData}
    >
      {activeTab === "find" && <span className="live-indicator"></span>}
      Data
    </button>

    <button
      className={`live-data ${activeTab === "live" ? "active" : ""}`}
      onClick={() => {
        if (!tractorId) return alert("Enter VIN");
        setActiveTab("live");
      }}
    >
      {activeTab === "live" && <span className="live-indicator"></span>}
      Live Data
    </button>

    <button
      className={`graphs ${activeTab === "graph" ? "active" : ""}`}
      onClick={() => setActiveTab("graph")}
    >
      {activeTab === "graph" && <span className="live-indicator"></span>}
      Graphs
    </button>
  </div>

  {/* TAB CONTENT */}
    {activeTab === "find" && (
      <>
        {isLoading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!isLoading && data.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <button onClick={exportToExcel}>Download Data</button>

            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  {Object.keys(data[0]).map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((val, j) => (
                      <td key={j}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </>
    )}

    {activeTab === "live" && (
      <div style={{ marginTop: "20px" }}>
        <LiveData info={liveInfo} />
      </div>
    )}

    {activeTab === "graph" && (
      <div style={{ marginTop: "20px" }}>
        <Graph data={data} />
      </div>
    )}
 

</div> 

  );
}






