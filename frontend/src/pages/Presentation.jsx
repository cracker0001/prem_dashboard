// import { useEffect, useState, useRef } from "react";
// import LiveData from "./LiveData";
// import GraphContainer from "./GraphContainer";
// import { fetchVehicle, fetchHistory } from  "../api.jsx"

// function cleanFixTime(t) {
//   if (!t) return null;

//   let val = String(t).trim();
//   val = val.replace(" ", "T");
//   val = val.replace(/\//g, "-");
//   val = val.replace(/(\+\d{2})(\d{2})$/, "$1:$2");

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
//     "ME9BT525J01573002",
//     "ME9BT725G01573001",
//     "ME9BT725G01573003",
//     "ME9BT225E01573003",
//     "ME9BT225E01573002",
//   ];

//   const [vehicleIndex, setVehicleIndex] = useState(0);
//   const [screen, setScreen] = useState("live");
//   const [latestData, setLatestData] = useState(null);
//   const [weekHistory, setWeekHistory] = useState([]);

//   const historyCache = useRef({});
//   const loadingHistory = useRef(false);
//   useEffect(() => {
//     const name = vehicleList[vehicleIndex];
//     setWeekHistory([]);

//     const fetchHistory = async () => {
//       if (loadingHistory.current) return;
//       loadingHistory.current = true;

//       if (historyCache.current[name]) {
//         setWeekHistory(historyCache.current[name]);
//         loadingHistory.current = false;
//         return;
//       }

//       try {
//         const res = await fetch("/api-local/history", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ tractorId: name })
//         });

//         const history = await res.json();
//         console.log("📌 HISTORY RAW:", history);

//         if (!Array.isArray(history)) {
//           console.log("⚠️ API ERROR:", history);
//           loadingHistory.current = false;
//           return;
//         }

//         const formatted = history
//           .map((item) => {
//             const ft = cleanFixTime(item.fixTime);
//             if (!ft) return null;

//             return {
//               time: ft,
//               voltage: Number(item.battVoltage ?? 0),
//               current: Number(item.battCurrent ?? 0),
//               soc: Number(item.soc ?? 0),
//             };
//           })
//           .filter(Boolean);

//         console.log("📌 CLEAN HISTORY:", formatted);

//         historyCache.current[name] = formatted;
//         setWeekHistory(formatted);
//       } catch (e) {
//         console.log("History fetch error:", e);
//       }

//       loadingHistory.current = false;
//     };

//     fetchHistory();
//   }, [vehicleIndex]);

//   useEffect(() => {
//     const name = vehicleList[vehicleIndex];

//     const fetchLive = async () => {
//       try {
//         const res = await fetch(`/api-local/vehicle?tractorId=${name}`);
//         const json = await res.json();
//         setLatestData(json[0] || null);
//       } catch (e) {
//         console.log("❌ Live fetch error", e);
//       }
//     };

//     const t = setInterval(fetchLive, 1000);
//     return () => clearInterval(t);
//   }, [vehicleIndex]);

//   useEffect(() => {
//     const t = setInterval(() => {
//       setScreen((prev) => {
//         if (prev === "live") return "graph";
//         setVehicleIndex((v) => (v + 1) % vehicleList.length);
//         return "live";
//       });
//     }, 20000);

//     return () => clearInterval(t);
//   }, []);

//   const name = vehicleList[vehicleIndex];

//   return (
//     <div style={{ padding: 10 }}>
//      <h2 style={{ textAlign: "center", fontSize: "20px",marginBottom: "10px"}}>
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

// import { useEffect, useState, useRef } from "react";
// import LiveData from "./LiveData";
// import GraphContainer from "./GraphContainer";
// import { fetchVehicle, fetchHistory as fetchHistoryAPI } from "../api.jsx";

// function cleanFixTime(t) {
//   if (!t) return null;

//   let val = String(t).trim();
//   val = val.replace(" ", "T");
//   val = val.replace(/\//g, "-");
//   val = val.replace(/(\+\d{2})(\d{2})$/, "$1:$2");

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
//     "ME9BT525J01573002",
//     "ME9BT725G01573001",
//     "ME9BT725G01573003",
//     "ME9BT225E01573003",
//     "ME9BT225E01573002",
//   ];

//   const [vehicleIndex, setVehicleIndex] = useState(0);
//   const [screen, setScreen] = useState("live");
//   const [latestData, setLatestData] = useState(null);
//   const [weekHistory, setWeekHistory] = useState([]);

//   const historyCache = useRef({});
//   const loadingHistory = useRef(false);

//   useEffect(() => {
//     const name = vehicleList[vehicleIndex];
//     setWeekHistory([]);

//     const fetchHistory = async () => {
//       if (loadingHistory.current) return;
//       loadingHistory.current = true;

//       if (historyCache.current[name]) {
//         setWeekHistory(historyCache.current[name]);
//         loadingHistory.current = false;
//         return;
//       }

//       try {
//         // 🔥 NEW API CALL (replaces fetch("/api-local/history"))
//         const res = await fetchHistoryAPI({ tractorId: name });
//         const history = res.data;

//         console.log("📌 HISTORY RAW:", history);

//         if (!Array.isArray(history)) {
//           console.log("⚠️ API ERROR:", history);
//           loadingHistory.current = false;
//           return;
//         }

//         const formatted = history
//           .map((item) => {
//             const ft = cleanFixTime(item.fixTime);
//             if (!ft) return null;

//             return {
//               time: ft,
//               voltage: Number(item.battVoltage ?? 0),
//               current: Number(item.battCurrent ?? 0),
//               soc: Number(item.soc ?? 0),
//             };
//           })
//           .filter(Boolean);

//         console.log("📌 CLEAN HISTORY:", formatted);

//         historyCache.current[name] = formatted;
//         setWeekHistory(formatted);
//       } catch (e) {
//         console.log("History fetch error:", e);
//       }

//       loadingHistory.current = false;
//     };

//     fetchHistory();
//   }, [vehicleIndex]);

//   useEffect(() => {
//     const name = vehicleList[vehicleIndex];

//     const fetchLive = async () => {
//       try {
//         // 🔥 NEW API CALL (replaces fetch(`/api-local/vehicle?...`))
//         const res = await fetchVehicle(name);
//         const json = res.data;

//         setLatestData(json[0] || null);
//       } catch (e) {
//         console.log("❌ Live fetch error", e);
//       }
//     };

//     const t = setInterval(fetchLive, 1000);
//     return () => clearInterval(t);
//   }, [vehicleIndex]);

//   useEffect(() => {
//     const t = setInterval(() => {
//       setScreen((prev) => {
//         if (prev === "live") return "graph";
//         setVehicleIndex((v) => (v + 1) % vehicleList.length);
//         return "live";
//       });
//     }, 20000);

//     return () => clearInterval(t);
//   }, []);

//   const name = vehicleList[vehicleIndex];

//   return (
//     <div style={{ padding: 10 }}>
//       <h2 style={{ textAlign: "center", fontSize: "20px", marginBottom: "10px" }}>
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
import { fetchVehicle, fetchHistory as fetchHistoryAPI } from "../api.jsx";

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

  // ---------------- HISTORY ----------------
  useEffect(() => {
    const name = vehicleList[vehicleIndex];
    setWeekHistory([]);

    const loadHistory = async () => {
      if (loadingHistory.current) return;
      loadingHistory.current = true;

      if (historyCache.current[name]) {
        setWeekHistory(historyCache.current[name]);
        loadingHistory.current = false;
        return;
      }

      try {
        const res = await fetchHistoryAPI({ tractorId: name });
        const history = res.data;

        if (!Array.isArray(history)) {
          console.log("⚠️ Invalid History:", history);
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

        historyCache.current[name] = formatted;
        setWeekHistory(formatted);
      } catch (err) {
        console.log("History fetch error:", err);
      }

      loadingHistory.current = false;
    };

    loadHistory();
  }, [vehicleIndex]);

  // ---------------- LIVE DATA ----------------
  useEffect(() => {
    const name = vehicleList[vehicleIndex];

    const loadLive = async () => {
      try {
        const res = await fetchVehicle(name);
        const json = res.data;
        setLatestData(json[0] || null);
      } catch (err) {
        console.log("❌ Live fetch error:", err);
      }
    };

    const interval = setInterval(loadLive, 1000);
    return () => clearInterval(interval);
  }, [vehicleIndex]);

  // --------- AUTO SWITCH SCREEN + VEHICLE ----------
  useEffect(() => {
    const interval = setInterval(() => {
      setScreen((prev) => {
        if (prev === "live") return "graph";
        setVehicleIndex((i) => (i + 1) % vehicleList.length);
        return "live";
      });
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const name = vehicleList[vehicleIndex];

  return (
    <div style={{ padding: 10 }}>
      <h2 style={{ textAlign: "center", fontSize: "20px", marginBottom: "10px" }}>
        Showing {screen === "live" ? "Live Data" : "Graph"} for:
        <span style={{ color: "#ff6600" }}> {name}</span>
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
