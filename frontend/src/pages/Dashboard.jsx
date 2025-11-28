// import { useState } from "react";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import { useNavigate, Outlet } from "react-router-dom";
// import { Link } from "react-router-dom";
// import Vehicle1 from "./Vehicle1.jsx";
// import './Dashboard.css'
// function Dashboard() {
//   const [tractorId, setTractorId] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//    const [activeTab, setActiveTab] = useState(null);

//   const navigate = useNavigate();
//  const handleFindData = () => {
//   setActiveTab("find");
//   handleSearch();   
// };


//   const handleSearch = async () => {
//     setData([]);
//     setError(null);
//     setIsLoading(true);


//     try {
//       if (!tractorId || !startDate || !endDate) {
//         alert("Please fill all fields before searching.");
//            return;
//         }
//       const res = await fetch("/api-local/data", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ tractorId, startDate, endDate })
//       });

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const responseData = await res.json();
//       console.log("Filtered Data:", responseData);
//       setData(responseData);
//     } catch (err) {
//       console.error("❌ Fetch error:", err);
//       setError("Failed to fetch data. Please check your inputs and try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const handleLogout = () => {
//     sessionStorage.removeItem("token");
//     navigate("/login");
//   };
//   const exportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array"
//     });

//     const blob = new Blob([excelBuffer], {
//       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     });

//     const fileName = `TractorData_${tractorId || "all"}_${startDate}_${endDate}.xlsx`;
//     saveAs(blob, fileName);
//   };

//   return (


//      <div className="dashboard">
//         <div className="dash-header">
            
//            <div className='header-logo'>
//              <img src="moonriderLogo.png" alt="logo" />
//            </div>
//            <div className="vehicle">
//             <button>vehicles</button>
//             <button
//              onClick={()=> navigate("/presentation")}
//             >Presentation</button>
//            </div>
//            <div>
//              <button
//              onClick={handleLogout}
//              style={{
//                padding: "8px 14px",
//                background: "#ed736bff",
//                color: "#fff",
//                border: "none",
//                borderRadius: "5px",
//                cursor: "pointer",
//                margin: "5px"
//              }}
//            >
//               Logout
//            </button>
//            </div>
//         </div> 

//         <div className='vin-details'>
          
//          <h3>Enter VIN details</h3>
//           <div className="vin">
//             <p>VIN number</p>
//                <div  className="input-vin">
//                     <input
//                       value={tractorId}
//                  onChange={(e) => setTractorId(e.target.value)}
//                  placeholder="Enter VIN number"
//         />
//                </div>
//           </div>
//           <div className="dates">
//             <div className="date-lable">
//                <label htmlFor="">Start Date</label>
//                <label htmlFor="">End Date</label>
//             </div>
//               <div className="select-date">
//                      <input
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                  style={{ marginRight: "10px", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
//                   />
//                    <input
//                  type="date"
//                  value={endDate}
//                  onChange={(e) => setEndDate(e.target.value)}
//                  style={{ marginRight: "10px", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
//                   />
//               </div>
//               <div className="submit">
//                     <button
//                       className="dashboard-data"
//                    onClick={handleFindData}
//                    disabled={isLoading}>   
//                        {isLoading ? "Searching..." : "Submit"}
//                         </button>
//               </div>
//           </div>

//         </div>
  

            
//     <div className="content">
//       <button
//         className={`dashboard-data ${activeTab === "find" ? "active" : ""}`}
//         onClick={handleFindData}
//         disabled={isLoading}
//       >
//         {isLoading ? "Searching..." : "Find Data"}
//       </button>

//      <button
//   className={`live-data ${activeTab === "live" ? "active" : ""}`}
//   onClick={() => {
//     if(!tractorId){
//       alert("Please enter VIN number to view live data.");
//       return;
//     }
//     setActiveTab("live");  
 
//   }}
// >
//   Live Data
// </button>

     
// <button
//   className={`graphs ${activeTab === "graph" ? "active" : ""}`}
//   onClick={() => {
//     setActiveTab("graph");  
   
//   }}
// >
//   Graphs
// </button>
//     </div>
     
//      {activeTab === "find" && (
//   <>
//     {isLoading && <p>Loading...</p>}
//     {error && <p style={{ color: "red" }}>{error}</p>}

//     {!isLoading && !error && data.length > 0 && (
//       <div style={{ marginTop: "20px" }}>
//         <button
//           onClick={exportToExcel}
//           disabled={data.length === 0}
//           style={{
//             padding: "8px 14px",
//             background: "#E7920D",
//             color: "#fff",
//             border: "none",
//             borderRadius: "5px",
//             cursor: data.length === 0 ? "not-allowed" : "pointer",
           
//           }}
//         >
//           Download Data
//         </button>
//         <table
//           style={{ width: "100%", borderCollapse: "collapse" }}
//           border="1"
//           cellPadding="8"
//         >
//           <thead>
//             <tr style={{ background: "#f2f2f2" }}>
//               {Object.keys(data[0]).map((col, idx) => (
//                 <th key={idx} style={{ padding: "12px", textAlign: "left" }}>
//                   {col}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, i) => (
//               <tr key={i} style={{ borderBottom: "1px solid #ddd" }}>
//                 {Object.values(row).map((val, j) => (
//                   <td key={j} style={{ padding: "12px" }}>
//                     {val}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     )}

//     {!isLoading && !error && data.length === 0 && (
//       <p>No data found for the selected criteria.</p>
//     )}
//   </>
// )}
//     {activeTab === "live" && (
//   <div style={{ marginTop: "20px" }}>
//     <Vehicle1 name={tractorId} />
//  {/* <Vehicle /> apna component import karo */}
//   </div>
// )}   
// </div>
//   );
// }
// export default Dashboard;

      
import { Outlet, useNavigate,NavLink } from "react-router-dom";
import "./Dashboard.css";
import logo from "../assets/moonriderLogo.png"

export default function DashboardLayout() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard">

      {/* TOP HEADER */}

      <div className="dash-header">

        <div className="header-logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="vehicle">
          
          <NavLink 
           style={
            (e)=>{
              return {
                color: e.isActive? "orange" : "grey",
              }
            }
           }
          to={"/dashboard/vehicle"}>Vehicle</NavLink>
          <NavLink
            style={
              (e)=>{
                return{
                  color: e.isActive? "orange" : "grey",
                }
              }
            }
          to={"/dashboard/presentation"}>Presentation</NavLink>
          
          
          {/* <button onClick={() => navigate("/dashboard/vehicle")}>
            Vehicle
          </button> */}

          {/* <button onClick={() => navigate("/dashboard/presentation")}>
            Presentation
          </button> */}
        </div>

        <div className="logout">
          <button
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

      </div>
      <Outlet />
    </div>
  );
}
