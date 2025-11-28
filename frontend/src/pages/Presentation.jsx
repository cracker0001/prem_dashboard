// import { useEffect, useState } from "react";
// import LiveData from "./LiveData";

// function Presentation() {

//   const vehicleList = [
//    "ME9BT725G01573001",
//    "ME9BT525J01573002",
//    "ME9BT225E01573003",
   
//   ];

//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     // change screen every 5 seconds
//     const timer = setInterval(() => {
//       setIndex((prev) => (prev + 1) % vehicleList.length);
//     }, 5000);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div style={{ padding: "10px" }}>
//       <h2 style={{ marginBottom: "10px" }}>
//         Showing Live Data for: <span style={{ color: "#ff6600" }}>{vehicleList[index]}</span>
//       </h2>

//       {/* Show the LIVE-SCREEN for the current tractor */}
//       <LiveData name={vehicleList[index]} />
//     </div>
//   );
// }

// export default Presentation;

// import { useEffect, useState } from "react";
// import LiveData from "./LiveData";
// import GraphContainer from "./GraphContainer";

// function Presentation() {

//   const vehicleList = [
//     "ME9BT725G01573001",
//     "ME9BT725G01573003",
//     "ME9BT525J01573002",
//     "ME9BT225E01573003",
//     "ME9BT225E01573002",

//   ];


//   const [vehicleIndex, setVehicleIndex] = useState(0);
//   const [screen, setScreen] = useState("live");
//   const [latestData, setLatestData] = useState(null);
//   const [graphHistory, setGraphHistory] = useState([]);


//     const [weekHistory, setWeekHistory] = useState([]);

//    useEffect(() => {
//     const name = vehicleList[vehicleIndex];

//     const fetchHistory = async () => {
//       try {
//         const res = await fetch("/api-local/history", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ tractorId: name })
//         });

//         const history = await res.json();
//         setWeekHistory(history);   // store past week Athena data
//       } catch (e) {
//         console.log("History fetch error:", e);
//       }
//     };

//     fetchHistory();
//     setGraphHistory([]);  // reset live graph when vehicle changes
//   }, [vehicleIndex]);


//   // Fetch data every 1 sec
//   useEffect(() => {
//     const name = vehicleList[vehicleIndex];

//     const fetchData = async () => {
//       try {
//         const res = await fetch(`/api-local/vehicle?tractorId=${name}`);
//         const json = await res.json();
//         const info = json[0];
//         if (!info) return;

//         setLatestData(info);

//         // Add to graph history (KEEP 100 POINTS)
//         setGraphHistory(prev => [
//           ...prev.slice(-100),
//           {
//             time: info.fixTime || info.deviceTime,
//             voltage: info.attributes?.battVoltage || 0,
//             soc: info.attributes?.soc || 0,
//             current: info.attributes?.battCurrent || 0,
//           }
//         ]);

//       } catch (e) {
//         console.log("Fetch error", e);
//       }
//     };

//     const timer = setInterval(fetchData, 1000);
//     return () => clearInterval(timer);

//   }, [vehicleIndex]);

//   // Switch screen every 5 seconds
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setScreen(prev => {
//         if (prev === "live") {
//           return "graph";   // Show graph next
//         }

//         setVehicleIndex(v => (v + 1) % vehicleList.length);
//         setGraphHistory([]);
//         return "live";
//       });
//     }, 5000);

//     return () => clearInterval(timer);
//   }, []);

//   const name = vehicleList[vehicleIndex];

//   return (
//     <div style={{ padding: 10 }}>
//       <h2>
//         Showing {screen === "live" ? "Live Data" : "Graphs"} for:
//         <span style={{ color: "#ff6600" }}> {name}</span>
//       </h2>

//       {screen === "live" ? (
//         <LiveData info={latestData} />
//       ) : (
//         <GraphContainer data={graphHistory} />
//       )}
//     </div>
//   );
// }

// export default Presentation;


// import { useEffect, useState } from "react";
// import LiveData from "./LiveData";
// import GraphContainer from "./GraphContainer";

// function Presentation() {

//   const vehicleList = [
//     "ME9BT725G01573001",
//     "ME9BT725G01573003",
//     "ME9BT525J01573002",
//     "ME9BT225E01573003",
//     "ME9BT225E01573002",
//   ];

//   const [vehicleIndex, setVehicleIndex] = useState(0);
//   const [screen, setScreen] = useState("live");
//   const [latestData, setLatestData] = useState(null);

//   const [graphHistory, setGraphHistory] = useState([]);   // LIVE graph data
//   const [weekHistory, setWeekHistory] = useState([]);     // PAST 1 WEEK DATA


// useEffect(() => {
//   const name = vehicleList[vehicleIndex];

//   // reset old week history
//   setWeekHistory([]);

//   const fetchHistory = async () => {
//     try {
//       const res = await fetch("/api-local/history", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ tractorId: name })
//       });

//       const history = await res.json();
//       setWeekHistory(history);   // set past week Athena data
//     } catch (e) {
//       console.log("History fetch error:", e);
//     }
//   };

//   fetchHistory();
//   setGraphHistory([]); // reset live history only
// }, [vehicleIndex]);



//   useEffect(() => {
//     const name = vehicleList[vehicleIndex];

//     const fetchLive = async () => {
//       try {
//         const res = await fetch(`/api-local/vehicle?tractorId=${name}`);
//         const json = await res.json();
//         const info = json[0];
//         if (!info) return;

//         setLatestData(info);

//         // add into live graph history
//         setGraphHistory(prev => [
//           ...prev.slice(-100),
//           {
//             time: info.fixTime || info.deviceTime,
//             voltage: info.attributes?.battVoltage || 0,
//             soc: info.attributes?.soc || 0,
//             current: info.attributes?.battCurrent || 0,
//           }
//         ]);

//       } catch (e) {
//         console.log("Live fetch error", e);
//       }
//     };

//     const timer = setInterval(fetchLive, 1000);
//     return () => clearInterval(timer);

//   }, [vehicleIndex]);


//   useEffect(() => {
//     const timer = setInterval(() => {
//       setScreen(prev => {
//         if (prev === "live") return "graph";

//         setVehicleIndex(v => (v + 1) % vehicleList.length);
//         return "live";
//       });
//     }, 5000);

//     return () => clearInterval(timer);
//   }, []);


//   const name = vehicleList[vehicleIndex];

//   return (
//     <div style={{ padding: 10 }}>
//       <h2>
//         Showing {screen === "live" ? "Live Data" : "Graphs"} for:
//         <span style={{ color: "#ff6600" }}> {name}</span>
//       </h2>

//       {screen === "live" ? (
//         <LiveData info={latestData} />
//       ) : (
//         <GraphContainer data={[...weekHistory, ...graphHistory]} />
//       )}
//     </div>
//   );
// }

// export default Presentation;
// import { useEffect, useState } from "react";
// import LiveData from "./LiveData";
// import GraphContainer from "./GraphContainer";

// // ⭐ UNIVERSAL FIX FOR ANY FIXTIME FORMAT
// function cleanFixTime(t) {
//   if (!t) return null;

//   let val = String(t).trim();

//   // Convert space → T
//   val = val.replace(" ", "T");

//   // Convert "/" → "-"
//   val = val.replace(/\//g, "-");

//   // Convert "+0530" → "+05:30"
//   val = val.replace(/(\+\d{2})(\d{2})$/, "$1:$2");

//   // If timezone missing → add +05:30
//   if (!/[\+\-]\d{2}:\d{2}$/.test(val) && !val.endsWith("Z")) {
//     val += "+05:30";
//   }

//   const d = new Date(val);
//   if (isNaN(d.getTime())) {
//     console.log("❌ INVALID FIXTIME:", t, " => ", val);
//     return null;
//   }

//   return val;
// }

// function Presentation() {
//   const vehicleList = [
//     "ME9BT725G01573001",
//     "ME9BT725G01573003",
//     "ME9BT525J01573002",
//     "ME9BT225E01573003",
//     "ME9BT225E01573002",
//   ];

//   const [vehicleIndex, setVehicleIndex] = useState(0);
//   const [screen, setScreen] = useState("live");
//   const [latestData, setLatestData] = useState(null);
//   const [weekHistory, setWeekHistory] = useState([]);

//   // ⭐ FETCH PAST WEEK HISTORY
//   useEffect(() => {
//     const name = vehicleList[vehicleIndex];
//     setWeekHistory([]);

//     const fetchHistory = async () => {
//       try {
//         const res = await fetch("/api-local/history", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ tractorId: name }),
//         });

//         const history = await res.json();
//         console.log("📌 HISTORY RAW:", history);

//         // ❌ If backend returned error → stop
//         if (!Array.isArray(history)) {
//           console.log("⚠️ History API error:", history);
//           return;
//         }

//         // ⭐ SAFE MAPPING FOR GRAPH
//         const formatted = history
//           .map((item) => {
//             const safeTime = cleanFixTime(item.fixTime);
//             if (!safeTime) return null;

//             return {
//               time: safeTime,
//               voltage: Number(item.battVoltage ?? 0),
//               current: Number(item.battCurrent ?? 0),
//               soc: Number(item.soc ?? 0),
//             };
//           })
//           .filter(Boolean); // remove null rows

//         console.log("📌 HISTORY CLEAN:", formatted);
//         setWeekHistory(formatted);
//       } catch (e) {
//         console.log("History fetch error:", e);
//       }
//     };

//     fetchHistory();
//   }, [vehicleIndex]);

//   // ⭐ FETCH LIVE DATA
//   useEffect(() => {
//     const name = vehicleList[vehicleIndex];

//     const fetchLive = async () => {
//       try {
//         const res = await fetch(`/api-local/vehicle?tractorId=${name}`);
//         const json = await res.json();
//         const info = json[0];

//         if (!info) return;

//         setLatestData(info);
//       } catch (e) {
//         console.log("❌ Live fetch error", e);
//       }
//     };

//     const t = setInterval(fetchLive, 1000);
//     return () => clearInterval(t);
//   }, [vehicleIndex]);

//   // ⭐ AUTO SWITCH EVERY 5s
//   useEffect(() => {
//     const t = setInterval(() => {
//       setScreen((prev) => {
//         if (prev === "live") return "graph";
//         setVehicleIndex((v) => (v + 1) % vehicleList.length);
//         return "live";
//       });
//     }, 5000);

//     return () => clearInterval(t);
//   }, []);

//   const name = vehicleList[vehicleIndex];

//   return (
//     <div style={{ padding: 10 }}>
//       <h2>
//         Showing {screen === "live" ? "Live Data" : "Graph"} for:{" "}
//         <span style={{ color: "#ff6600" }}>{name}</span>
//       </h2>

//       {screen === "live" ? (
//         <LiveData info={latestData} />
//       ) : (
//         <GraphContainer data={weekHistory} />
//       )}
//     </div>
//   );
// }

// export default Presentation;
import { useEffect, useState, useRef } from "react";
import LiveData from "./LiveData";
import GraphContainer from "./GraphContainer";

// ⭐ Clean any fixTime format into valid ISO
function cleanFixTime(t) {
  if (!t) return null;

  let val = String(t).trim();
  val = val.replace(" ", "T");
  val = val.replace(/\//g, "-");
  val = val.replace(/(\+\d{2})(\d{2})$/, "$1:$2");

  if (!/[\+\-]\d{2}:\d{2}$/.test(val) && !val.endsWith("Z")) {
    val += "+05:30";
  }

  const d = new Date(val);
  if (isNaN(d.getTime())) {
    console.log("❌ INVALID FIXTIME:", t, " => ", val);
    return null;
  }

  return val;
}

function Presentation() {
  const vehicleList = [
    "ME9BT525J01573002",
    "ME9BT725G01573001",
    "ME9BT725G01573003",
    "ME9BT225E01573003",
    "ME9BT225E01573002",
  ];

  const [vehicleIndex, setVehicleIndex] = useState(0);
  const [screen, setScreen] = useState("live");
  const [latestData, setLatestData] = useState(null);
  const [weekHistory, setWeekHistory] = useState([]);

  const historyCache = useRef({});
  const loadingHistory = useRef(false);
  useEffect(() => {
    const name = vehicleList[vehicleIndex];
    setWeekHistory([]);

    const fetchHistory = async () => {
      if (loadingHistory.current) return;
      loadingHistory.current = true;

      // Serve cache instantly
      if (historyCache.current[name]) {
        setWeekHistory(historyCache.current[name]);
        loadingHistory.current = false;
        return;
      }

      try {
        const res = await fetch("/api-local/history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tractorId: name })
        });

        const history = await res.json();
        console.log("📌 HISTORY RAW:", history);

        if (!Array.isArray(history)) {
          console.log("⚠️ API ERROR:", history);
          loadingHistory.current = false;
          return;
        }

        const formatted = history
          .map((item) => {
            const ft = cleanFixTime(item.fixTime);
            if (!ft) return null;

            return {
              time: ft,
              voltage: Number(item.battVoltage ?? 0),
              current: Number(item.battCurrent ?? 0),
              soc: Number(item.soc ?? 0),
            };
          })
          .filter(Boolean);

        console.log("📌 CLEAN HISTORY:", formatted);

        historyCache.current[name] = formatted;
        setWeekHistory(formatted);
      } catch (e) {
        console.log("History fetch error:", e);
      }

      loadingHistory.current = false;
    };

    fetchHistory();
  }, [vehicleIndex]);

  // ⭐ FETCH LIVE DATA EVERY 1 SEC
  useEffect(() => {
    const name = vehicleList[vehicleIndex];

    const fetchLive = async () => {
      try {
        const res = await fetch(`/api-local/vehicle?tractorId=${name}`);
        const json = await res.json();
        setLatestData(json[0] || null);
      } catch (e) {
        console.log("❌ Live fetch error", e);
      }
    };

    const t = setInterval(fetchLive, 1000);
    return () => clearInterval(t);
  }, [vehicleIndex]);

  // ⭐ AUTO SWITCH — SAFE INTERVAL (8 seconds)
  useEffect(() => {
    const t = setInterval(() => {
      setScreen((prev) => {
        if (prev === "live") return "graph";
        setVehicleIndex((v) => (v + 1) % vehicleList.length);
        return "live";
      });
    }, 20000);

    return () => clearInterval(t);
  }, []);

  const name = vehicleList[vehicleIndex];

  return (
    <div style={{ padding: 10 }}>
     <h2 style={{ textAlign: "center", fontSize: "20px",marginBottom: "10px"}}>
        Showing {screen === "live" ? "Live Data" : "Graph"} for:{" "}
        <span style={{ color: "#ff6600" }}>{name}</span>
      </h2>

      {screen === "live" ? (
        <LiveData info={latestData} />
      ) : (
        <GraphContainer data={weekHistory} />
      )}
    </div>
  );
}

export default Presentation;

