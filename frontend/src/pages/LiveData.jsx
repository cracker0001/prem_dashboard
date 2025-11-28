// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// import "./LiveData.css"
// import batteryInfo from "../assets/battery_information.png"
// import connectivity from "../assets/connectivity.png"
// import account from "../assets/account.png"
// import deviceInfo from "../assets/device_information.png"
// import location from "../assets/location.png"
// import motorInfo from "../assets/motor_information.png"
// import odometer from "../assets/odometer.png"
// import performance from "../assets/performance.png"
// import systemInfo from "../assets/system_info.png"

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });
// function LiveData({ info }) {
//   if (!info) return null; // No waiting message

//   const attr = info.attributes || {};
//   const latitude = info.latitude;
//   const longitude = info.longitude;

//   return (
//     <div className="live-data-wrapper">
     
//        <div className="card-background">
//          <div className="card-layout">
//           {/* Device Info */}
//           <div className="card">
//             <h3> <img src= {deviceInfo} alt="" /> Device Information</h3>
//             <p><strong>Unique ID:</strong>{info.uniqueid}</p>
//             <p><strong>Device Name:</strong> {info.name}</p>
//             <p><strong>Account ID:</strong> {info.accountId}</p>
//             <p><strong>AccId:</strong> {info.accId}</p>
//             <p><strong>Device ID:</strong> {info.deviceId}</p>
//             <p><strong>Type:</strong> {info.type}</p>
//             <p><strong>Model:</strong> {info.model || "-"}</p>
//             <p><strong>Contact:</strong> {info.contact}</p>
//             <p><strong>Disabled:</strong> {info.disabled ? "Yes" : "No"}</p>
//             <p><strong>Valid Data:</strong> {info.valid ? "True" : "False"}</p>
//             <p><strong>Last Update:</strong> {info.lastupdate}</p>
//             <p><strong>Device Time:</strong> {info.deviceTime}</p>
//             <p><strong>Fix Time:</strong> {info.fixTime}</p>
//             <p><strong>Current State:</strong> {info.state}</p>
//             <p><strong>State Since:</strong> {info.statesince}</p>
//           </div>

//           {/* Motor Info */}
//           <div className="card">
//             <h3><img src= {motorInfo} alt="" /> Motor Information</h3>
//             <p><strong>Motor Temperature:</strong> {attr.motorTemp} °C</p>
//             <p><strong>Motor Speed:</strong> {attr.motorSpeed} RPM</p>
//             <p><strong>Motor Fault:</strong> {attr.motorFault}</p>
//             <p><strong>Controller Temperature:</strong> {attr.controllerTemp} °C</p>
//             <p><strong>Controller Fault:</strong> {attr.contFault}</p>
//             <p><strong>Controller OCA:</strong> {attr.contOca}</p>
//             <p><strong>Regeneration Flag:</strong> {attr.regenFlag}</p>
//             <p><strong>Charge/Discharge State:</strong> {attr.charDischarState}</p>
//           </div>

//           {/* Location */}
//           <div className="card location-card">
//             <h3><img src= {location} alt="" /> Location</h3>
//             <div className="map-placeholder">
//               {latitude && longitude ? (
//                 <MapContainer
//                   center={[latitude, longitude]}
//                   zoom={15}
//                   style={{ height: "200px", borderRadius: "8px" }}
//                 >
//                   <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                   <Marker position={[latitude, longitude]}>
//                     <Popup>
//                       <strong>Lat:</strong> {latitude}, <strong>Lng:</strong> {longitude}
//                     </Popup>
//                   </Marker>
//                 </MapContainer>
//               ) : (
//                 <p>Location not available</p>
//               )}
//             </div>
//             <p><strong>Latitude:</strong> {latitude || "-"}</p>
//             <p><strong>Longitude:</strong> {longitude || "-"}</p>
//             <p><strong>Speed:</strong> {info.speed || "-"} km/h</p>
//             <p><strong>Course:</strong> {info.course || "-"}°</p>
//           </div>

//           {/* Connectivity */}
//           <div className="card">
//             <h3> <img src= {connectivity} alt="" />  Connectivity</h3>
//             <p><strong>IoT Voltage:</strong> {attr.iotVoltage} V</p>
//             <p><strong>Motion:</strong> {attr.motion ? "Yes" : "No"}</p>
//             <p><strong>Ignition:</strong> {attr.ignition}</p>
//             <p><strong>Network RSSI:</strong> {attr.rssi} dBm</p>
//             <p><strong>Satellites:</strong> {attr.sat}</p>
//             <p><strong>CAN Bus Status:</strong> {attr.canBusStatus}</p>
//           </div>

//           {/* System Info */}
//           <div className="card">
//             <h3>  <img src= {systemInfo} alt="" />  System Information</h3>
//             <p><strong>Firmware Version:</strong> {attr.fwVersion}</p>
//             <p><strong>Total Resets:</strong> {attr.totRst}</p>
//             <p><strong>Reset Reason:</strong> {attr.rstRsn}</p>
//             <p><strong>Thermal Relay:</strong> {attr.thermRa}</p>
//             <p><strong>Alarm:</strong> {attr.alarm}</p>
//           </div>

//           {/* Odometer */}
//           <div className="card">
//             <h3>  <img src= {odometer} alt="" /> Odometer / Distance</h3>
//             <p><strong>Odometer:</strong> {attr.odometer}</p>
//             <p><strong>ODO (CAN):</strong> {attr.odoCan}</p>
//             <p><strong>ODO KM:</strong> {attr.odokm}</p>
//             <p><strong>Distance to Empty:</strong> {attr.distToEmpty}</p>
//           </div>

//           {/* Performance */}
//           <div className="card">
//             <h3> <img src= {performance} alt="" />  Performance</h3>
//             <p><strong>Power:</strong> {attr.power} W</p>
//             <p><strong>Speed:</strong> {attr.speed} km/h</p>
//           </div>

//           {/* Battery Info */}
//           <div className="card wide-card">
//             <h3> <img src= {batteryInfo} alt="" /> Battery Information</h3>
//             <div className="battery-grid">
//               <div>
//                 <p><strong>SOC:</strong> {attr.soc} %</p>
//                 <p><strong>SOH:</strong> {attr.soh} %</p>
//                 <p><strong>Voltage:</strong> {attr.battVoltage} V</p>
//                 <p><strong>Current:</strong> {attr.battCurrent} A</p>
//                 <p><strong>Energy:</strong> {attr.battEnergy} kWh</p>
//                 <p><strong>Battery:</strong> {attr.battery}</p>
//                 <p><strong>Charge Time:</strong> {attr.chargeTime} min</p>
//                 <p><strong>OTA Update:</strong> {attr.batOta}</p>
//               </div>

//               <div className="rated-capacity">
//                 <p><strong>Rated Capacity:</strong> {attr.ratedCapacity} Ah</p>
//                 <p><strong>Time to Discharge:</strong> {attr.timeToDischarge} hrs</p>
//                 <p><strong>Charge Cycles:</strong> {attr.chargeCycleCount}</p>
//                 <p><strong>Discharge Cycles:</strong> {attr.dischargeCycleCount}</p>
//                 <p><strong>Max Cell Voltage:</strong> {attr.maxCellVoltage} V</p>
//                 <p><strong>Min Cell Voltage:</strong> {attr.minCellVoltage} V</p>
//               </div>

//               <div>
//                 <p><strong>Cell Voltage Diff:</strong> {attr.cellVoltDiff} V</p>
//                 <p><strong>Over Voltage Alarm:</strong> {attr.batOva}</p>
//                 <p><strong>Under Voltage Alarm:</strong> {attr.batUva}</p>
//                 <p><strong>Protection:</strong> {attr.protection}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//        </div>
//     </div>
//   );
// }

// export default LiveData;

// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// import "./LiveData.css";

// import batteryInfo from "../assets/battery_information.png";
// import connectivity from "../assets/connectivity.png";
// import deviceInfo from "../assets/device_information.png";
// import locationIcon from "../assets/location.png";
// import motorInfo from "../assets/motor_information.png";
// import odometerIcon from "../assets/odometer.png";
// import performanceIcon from "../assets/performance.png";
// import systemInfo from "../assets/system_info.png";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });

// function LiveData({ info }) {
//   if (!info) return null;

//   const attr = info.attributes || {};
//   const latitude = info.latitude;
//   const longitude = info.longitude;

//   return (
//     <div className="live-data-wrapper">
//       <div className="card-background">
//         <div className="card-layout">
          
//           {/* 🔹 ROW 1 — BATTERY (big left) */}
//           <div className="card battery-card">
//             <h3><img src={batteryInfo} alt="" /> Battery Information</h3>

//             <div className="battery-grid">
//               <div>
//                 <p><strong>SOC:</strong> {attr.soc} %</p>
//                 <p><strong>SOH:</strong> {attr.soh} %</p>
//                 <p><strong>Voltage:</strong> {attr.battVoltage} V</p>
//                 <p><strong>Current:</strong> {attr.battCurrent} A</p>
//                 <p><strong>Energy:</strong> {attr.battEnergy} kWh</p>
//                 <p><strong>Battery:</strong> {attr.battery}</p>
//                 <p><strong>Charge Time:</strong> {attr.chargeTime} min</p>
//               </div>

//               <div className="rated-capacity">
//                 <p><strong>Rated Capacity:</strong> {attr.ratedCapacity} Ah</p>
//                 <p><strong>Time to Discharge:</strong> {attr.timeToDischarge} hrs</p>
//                 <p><strong>Charge Cycles:</strong> {attr.chargeCycleCount}</p>
//                 <p><strong>Discharge Cycles:</strong> {attr.dischargeCycleCount}</p>
//                 <p><strong>Max Cell Voltage:</strong> {attr.maxCellVoltage} V</p>
//                 <p><strong>Min Cell Voltage:</strong> {attr.minCellVoltage} V</p>
//               </div>

//               <div>
//                 <p><strong>Cell Voltage Diff:</strong> {attr.cellVoltDiff} V</p>
//                 <p><strong>Over Voltage Alarm:</strong> {attr.batOva}</p>
//                 <p><strong>Under Voltage Alarm:</strong> {attr.batUva}</p>
//                 <p><strong>Protection:</strong> {attr.protection}</p>
//               </div>
//             </div>
//           </div>

//           {/* 🔹 ROW 1 — MAP (big right) */}
//           <div className="card map-card">
//             <h3><img src={locationIcon} alt="" /> Location</h3>

//             <div className="map-placeholder">
//               {latitude && longitude ? (
//                 <MapContainer
//                   center={[latitude, longitude]}
//                   zoom={15}
//                   style={{ height: "100%", width: "100%" }}
//                 >
//                   <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                   <Marker position={[latitude, longitude]}>
//                     <Popup>
//                       Lat: {latitude}, Lng: {longitude}
//                     </Popup>
//                   </Marker>
//                 </MapContainer>
//               ) : (
//                 <p>Location not available</p>
//               )}
//             </div>

//             <p><strong>Latitude:</strong> {latitude || "-"}</p>
//             <p><strong>Longitude:</strong> {longitude || "-"}</p>
//             <p><strong>Speed:</strong> {info.speed || "-"} km/h</p>
//             <p><strong>Course:</strong> {info.course || "-"}°</p>
//           </div>

//           {/* 🔹 ROW 2 — ODOMETER */}
//           <div className="card odometer-card">
//             <h3><img src={odometerIcon} alt="" /> Odometer / Distance</h3>
//             <p><strong>Odometer:</strong> {attr.odometer}</p>
//             <p><strong>ODO (CAN):</strong> {attr.odoCan}</p>
//             <p><strong>ODO KM:</strong> {attr.odokm}</p>
//             <p><strong>Distance to Empty:</strong> {attr.distToEmpty}</p>
//           </div>

//           {/* 🔹 ROW 2 — DEVICE INFO */}
//           <div className="card device-card">
//             <h3><img src={deviceInfo} alt="" /> Device Information</h3>
//             <p><strong>Unique ID:</strong> {info.uniqueid}</p>
//             <p><strong>Device Name:</strong> {info.name}</p>
//             <p><strong>Account ID:</strong> {info.accountId}</p>
//             <p><strong>Device ID:</strong> {info.deviceId}</p>
//             <p><strong>Type:</strong> {info.type}</p>
//             <p><strong>Model:</strong> {info.model}</p>
//             <p><strong>Last Update:</strong> {info.lastupdate}</p>
//             <p><strong>Fix Time:</strong> {info.fixTime}</p>
//             <p><strong>Current State:</strong> {info.state}</p>
//           </div>

//           {/* 🔹 ROW 2 — MOTOR */}
//           <div className="card motor-card">
//             <h3><img src={motorInfo} alt="" /> Motor Information</h3>
//             <p><strong>Motor Temp:</strong> {attr.motorTemp} °C</p>
//             <p><strong>Motor Speed:</strong> {attr.motorSpeed} RPM</p>
//             <p><strong>Motor Fault:</strong> {attr.motorFault}</p>
//             <p><strong>Controller Temp:</strong> {attr.controllerTemp} °C</p>
//             <p><strong>Controller Fault:</strong> {attr.contFault}</p>
//             <p><strong>Controller OCA:</strong> {attr.contOca}</p>
//             <p><strong>Regen Flag:</strong> {attr.regenFlag}</p>
//           </div>

//           {/* 🔹 ROW 3 — SYSTEM INFO */}
//           <div className="card system-card">
//             <h3><img src={systemInfo} alt="" /> System Information</h3>
//             <p><strong>Firmware:</strong> {attr.fwVersion}</p>
//             <p><strong>Total Resets:</strong> {attr.totRst}</p>
//             <p><strong>Reset Reason:</strong> {attr.rstRsn}</p>
//             <p><strong>Thermal Relay:</strong> {attr.thermRa}</p>
//             <p><strong>Alarm:</strong> {attr.alarm}</p>
//           </div>

//           {/* 🔹 ROW 3 — CONNECTIVITY */}
//           <div className="card connectivity-card">
//             <h3><img src={connectivity} alt="" /> Connectivity</h3>
//             <p><strong>IoT Voltage:</strong> {attr.iotVoltage} V</p>
//             <p><strong>Motion:</strong> {attr.motion ? "Yes" : "No"}</p>
//             <p><strong>Ignition:</strong> {attr.ignition}</p>
//             <p><strong>RSSI:</strong> {attr.rssi} dBm</p>
//             <p><strong>Satellites:</strong> {attr.sat}</p>
//           </div>

//           {/* 🔹 ROW 3 — PERFORMANCE */}
//           <div className="card performance-card">
//             <h3><img src={performanceIcon} alt="" /> Performance</h3>
//             <p><strong>Power:</strong> {attr.power} W</p>
//             <p><strong>Speed:</strong> {attr.speed} km/h</p>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default LiveData;
// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "./LiveData.css";

// import batteryInfo from "../assets/battery_information.png";
// import connectivity from "../assets/connectivity.png";
// import deviceInfo from "../assets/device_information.png";
// import locationIcon from "../assets/location.png";
// import motorInfo from "../assets/motor_information.png";
// import odometerIcon from "../assets/odometer.png";
// import performance from "../assets/performance.png";
// import systemInfo from "../assets/system_info.png";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });

// function LiveData({ info }) {
//   if (!info) return null;

//   const attr = info.attributes || {};
//   const latitude = info.latitude;
//   const longitude = info.longitude;

//   return (
//     <div className="live-data-wrapper">
//       <div className="card-background">
//         <div className="layout-grid">

//           {/* --------- ROW 1 --------- */}
//           {/* BATTERY INFO (LEFT) */}
//           <div className="card battery-card">
//             <h3><img src={batteryInfo} /> Battery Information</h3>
//             <div className="battery-grid">
//               <div>
//                 <p><strong>SOC:</strong> <span>{attr.soc} %</span></p>
//                 <p><strong>SOH:</strong> <span>{attr.soh} %</span></p>
//                 <p><strong>Voltage:</strong> <span>{attr.battVoltage} V</span></p>
//                 <p><strong>Current:</strong> <span>{attr.battCurrent} A</span></p>
//                 <p><strong>Energy:</strong> <span>{attr.battEnergy} kWh</span></p>
//                 <p><strong>Battery:</strong> <span>{attr.battery}</span></p>
//                  <p><strong>Rated Capacity:</strong> <span>{attr.ratedCapacity} Ah</span></p>
//                 <p><strong>Time to Discharge:</strong> <span>{attr.timeToDischarge} hrs</span></p>
//               </div>

//               <div className="highlight-box">
//                 <p><strong>Charge Cycles:</strong> <span>{attr.chargeCycleCount}</span></p>
//                 <p><strong>Discharge Cycles:</strong> <span>{attr.dischargeCycleCount}</span></p>
//                  <p><strong>Max Cell Voltage:</strong> <span>{attr.maxCellVoltage} V</span></p>
//                 <p><strong>Min Cell Voltage:</strong> <span>{attr.minCellVoltage} V</span></p>
//                 <p><strong>Cell Voltage Diff:</strong> <span>{attr.cellVoltDiff} V</span></p>
//                 <p><strong>Over Voltage Alarm:</strong> <span>{attr.batOva}</span></p>
//                 <p><strong>Under Voltage Alarm:</strong> <span>{attr.batUva}</span></p>
//                 <p><strong>Protection:</strong> <span>{attr.protection}</span></p>
//               </div>
//             </div>
//           </div>

//           {/* MAP (RIGHT) */}
//           <div className="card map-card">
//             <h3><img src={locationIcon} /> Location</h3>
//             <div className="map-placeholder">
//               {latitude && longitude ? (
//                 <MapContainer
//                   center={[latitude, longitude]}
//                   zoom={15}
//                   style={{ height: "230px", borderRadius: "10px" }}
//                 >
//                   <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                   <Marker position={[latitude, longitude]}>
//                     <Popup>
//                       Lat: {latitude}, Lng: {longitude}
//                     </Popup>
//                   </Marker>
//                 </MapContainer>
//               ) : (
//                 <p>No location available</p>
//               )}
//             </div>

//             <p><strong>Latitude:</strong> <span>{latitude}</span></p>
//             <p><strong>Longitude:</strong> <span>{longitude}</span></p>
//             <p><strong>Speed:</strong> <span>{info.speed} km/h</span></p>
//             <p><strong>Course:</strong> <span>{info.course}°</span></p>
//           </div>


//           {/* --------- ROW 2 --------- */}
//           {/* ODOMETER */}
//           <div className="card">
//             <h3><img src={odometerIcon} /> Odometer</h3>
//             <p><strong>Odometer:</strong> <span>{attr.odometer}</span></p>
//             <p><strong>ODO CAN:</strong> <span>{attr.odoCan}</span></p>
//             <p><strong>ODO KM:</strong> <span>{attr.odokm}</span></p>
//             <p><strong>Distance to Empty:</strong> <span>{attr.distToEmpty}</span></p>
//           </div>

//           {/* DEVICE INFO */}
//           <div className="card">
//             <h3><img src={deviceInfo} /> Device Information</h3>
//             <p><strong>Unique ID:</strong> <span>{info.uniqueid}</span></p>
//             <p><strong>Device Name:</strong> <span>{info.name}</span></p>
//             <p><strong>Account ID:</strong> <span>{info.accountId}</span></p>
//             <p><strong>Type:</strong> <span>{info.type}</span></p>
//             <p><strong>Model:</strong> <span>{info.model}</span></p>
//             <p><strong>Fix Time:</strong> <span>{info.fixTime}</span></p>
//           </div>

//           {/* MOTOR INFO */}
//           <div className="card">
//             <h3><img src={motorInfo} /> Motor Information</h3>
//             <p><strong>Motor Temp:</strong> <span>{attr.motorTemp} °C</span></p>
//             <p><strong>Motor Speed:</strong> <span>{attr.motorSpeed} RPM</span></p>
//             <p><strong>Motor Fault:</strong> <span>{attr.motorFault}</span></p>
//             <p><strong>Controller Temp:</strong> <span>{attr.controllerTemp} °C</span></p>
//           </div>


       
//           <div className="card">
//             <h3><img src={systemInfo} /> System Information</h3>
//             <p><strong>Firmware:</strong> <span>{attr.fwVersion}</span></p>
//             <p><strong>Total Resets:</strong> <span>{attr.totRst}</span></p>
//             <p><strong>Reset Reason:</strong> <span>{attr.rstRsn}</span></p>
//             <p><strong>Alarm:</strong> <span>{attr.alarm}</span></p>
//           </div>

        
//           <div className="card">
//             <h3><img src={connectivity} /> Connectivity</h3>
//             <p><strong>IoT Voltage:</strong> <span>{attr.iotVoltage} V</span></p>
//             <p><strong>Motion:</strong> <span>{attr.motion ? "Yes" : "No"}</span></p>
//             <p><strong>Ignition:</strong> <span>{attr.ignition}</span></p>
//             <p><strong>RSSI:</strong> <span>{attr.rssi} dBm</span></p>
//             <p><strong>Satellites:</strong> <span>{attr.sat}</span></p>
//           </div>

        
//           <div className="card">
//             <h3><img src={performance} /> Performance</h3>
//             <p><strong>Power:</strong> <span>{attr.power} W</span></p>
//             <p><strong>Speed:</strong> <span>{attr.speed} km/h</span></p>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }
// export default LiveData;
// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "./LiveData.css";

// import batteryInfo from "../assets/battery_information.png";
// import connectivity from "../assets/connectivity.png";
// import deviceInfo from "../assets/device_information.png";
// import locationIcon from "../assets/location.png";
// import motorInfo from "../assets/motor_information.png";
// import odometerIcon from "../assets/odometer.png";
// import performance from "../assets/performance.png";
// import systemInfo from "../assets/system_info.png";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// });

// function LiveData({ info }) {
//   if (!info) return null;

//   const attr = info.attributes || {};
//   const latitude = info.latitude;
//   const longitude = info.longitude;

//   return (
//     <div className="live-data-wrapper">
//       <div className="card-background">
//         <div className="layout-grid">

//           {/* -------- ROW 1 : BATTERY -------- */}
//           <div className="card battery-card">
//             <h3><img src={batteryInfo} /> Battery Information</h3>

//             <div className="battery-grid">

//               {/* COLUMN 1 */}
//               <div>
//                 <p className="row"><span className="key">SOC:</span><span className="value">{attr.soc} %</span></p>
//                 <p className="row"><span className="key">SOH:</span><span className="value">{attr.soh} %</span></p>
//                 <p className="row"><span className="key">Voltage:</span><span className="value">{attr.battVoltage} V</span></p>
//                 <p className="row"><span className="key">Current:</span><span className="value">{attr.battCurrent} A</span></p>
//                 <p className="row"><span className="key">Energy:</span><span className="value">{attr.battEnergy} kWh</span></p>
//                 <p className="row"><span className="key">Battery:</span><span className="value">{attr.battery}</span></p>
//                 <p className="row"><span className="key">Rated Capacity:</span><span className="value">{attr.ratedCapacity} Ah</span></p>
//                 <p className="row"><span className="key">Time to Discharge:</span><span className="value">{attr.timeToDischarge} hrs</span></p>
//               </div>

//               {/* COLUMN 2 */}
//               <div className="highlight-box">
//                 <p className="row"><span className="key">Charge Cycles:</span><span className="value">{attr.chargeCycleCount}</span></p>
//                 <p className="row"><span className="key">Discharge Cycles:</span><span className="value">{attr.dischargeCycleCount}</span></p>
//                 <p className="row"><span className="key">Max Cell Voltage:</span><span className="value">{attr.maxCellVoltage} V</span></p>
//                 <p className="row"><span className="key">Min Cell Voltage:</span><span className="value">{attr.minCellVoltage} V</span></p>
//                 <p className="row"><span className="key">Cell Voltage Diff:</span><span className="value">{attr.cellVoltDiff} V</span></p>
//                 <p className="row"><span className="key">Over Voltage Alarm:</span><span className="value">{attr.batOva}</span></p>
//                 <p className="row"><span className="key">Under Voltage Alarm:</span><span className="value">{attr.batUva}</span></p>
//                 <p className="row"><span className="key">Protection:</span><span className="value">{attr.protection}</span></p>
//               </div>
//             </div>
//           </div>

//           {/* -------- ROW 1 : MAP -------- */}
//           <div className="card map-card">
//             <h3><img src={locationIcon} /> Location</h3>

//             <div className="map-placeholder">
//               {latitude && longitude ? (
//                 <MapContainer center={[latitude, longitude]} zoom={15} style={{ height: "230px", borderRadius: "10px" }}>
//                   <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                   <Marker position={[latitude, longitude]}>
//                     <Popup>Lat: {latitude}, Lng: {longitude}</Popup>
//                   </Marker>
//                 </MapContainer>
//               ) : <p>No location available</p>}
//             </div>

//             <p className="row"><span className="key">Latitude:</span><span className="value">{latitude}</span></p>
//             <p className="row"><span className="key">Longitude:</span><span className="value">{longitude}</span></p>
//             <p className="row"><span className="key">Speed:</span><span className="value">{info.speed} km/h</span></p>
//             <p className="row"><span className="key">Course:</span><span className="value">{info.course}°</span></p>
//           </div>

//           {/* -------- ROW 2 -------- */}
//           {/* ODOMETER */}
//           <div className="card">
//             <h3><img src={odometerIcon} /> Odometer</h3>

//             <p className="row"><span className="key">Odometer:</span><span className="value">{attr.odometer}</span></p>
//             <p className="row"><span className="key">ODO CAN:</span><span className="value">{attr.odoCan}</span></p>
//             <p className="row"><span className="key">ODO KM:</span><span className="value">{attr.odokm}</span></p>
//             <p className="row"><span className="key">Distance to Empty:</span><span className="value">{attr.distToEmpty}</span></p>
//           </div>

//           {/* DEVICE INFO */}
//           <div className="card">
//             <h3><img src={deviceInfo} /> Device Information</h3>

//             <p className="row"><span className="key">Unique ID:</span><span className="value">{info.uniqueid}</span></p>
//             <p className="row"><span className="key">Device Name:</span><span className="value">{info.name}</span></p>
//             <p className="row"><span className="key">Account ID:</span><span className="value">{info.accountId}</span></p>
//             <p className="row"><span className="key">Type:</span><span className="value">{info.type}</span></p>
//             <p className="row"><span className="key">Model:</span><span className="value">{info.model}</span></p>
//             <p className="row"><span className="key">Fix Time:</span><span className="value">{info.fixTime}</span></p>
//           </div>

//           {/* MOTOR INFO */}
//           <div className="card">
//             <h3><img src={motorInfo} /> Motor Information</h3>

//             <p className="row"><span className="key">Motor Temp:</span><span className="value">{attr.motorTemp} °C</span></p>
//             <p className="row"><span className="key">Motor Speed:</span><span className="value">{attr.motorSpeed} RPM</span></p>
//             <p className="row"><span className="key">Motor Fault:</span><span className="value">{attr.motorFault}</span></p>
//             <p className="row"><span className="key">Controller Temp:</span><span className="value">{attr.controllerTemp} °C</span></p>
//           </div>

//           {/* SYSTEM INFO */}
//           <div className="card">
//             <h3><img src={systemInfo} /> System Information</h3>

//             <p className="row"><span className="key">Firmware:</span><span className="value">{attr.fwVersion}</span></p>
//             <p className="row"><span className="key">Total Resets:</span><span className="value">{attr.totRst}</span></p>
//             <p className="row"><span className="key">Reset Reason:</span><span className="value">{attr.rstRsn}</span></p>
//             <p className="row"><span className="key">Alarm:</span><span className="value">{attr.alarm}</span></p>
//           </div>

//           {/* CONNECTIVITY */}
//           <div className="card">
//             <h3><img src={connectivity} /> Connectivity</h3>

//             <p className="row"><span className="key">IoT Voltage:</span><span className="value">{attr.iotVoltage} V</span></p>
//             <p className="row"><span className="key">Motion:</span><span className="value">{attr.motion ? "Yes" : "No"}</span></p>
//             <p className="row"><span className="key">Ignition:</span><span className="value">{attr.ignition}</span></p>
//             <p className="row"><span className="key">RSSI:</span><span className="value">{attr.rssi} dBm</span></p>
//             <p className="row"><span className="key">Satellites:</span><span className="value">{attr.sat}</span></p>
//           </div>

//           {/* PERFORMANCE */}
//           <div className="card">
//             <h3><img src={performance} /> Performance</h3>

//             <p className="row"><span className="key">Power:</span><span className="value">{attr.power} W</span></p>
//             <p className="row"><span className="key">Speed:</span><span className="value">{attr.speed} km/h</span></p>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }
// export default LiveData;
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./LiveData.css";

import batteryInfo from "../assets/battery_information.png";
import connectivity from "../assets/connectivity.png";
import deviceInfo from "../assets/device_information.png";
import locationIcon from "../assets/location.png";
import motorInfo from "../assets/motor_information.png";
import odometerIcon from "../assets/odometer.png";
import performance from "../assets/performance.png";
import systemInfo from "../assets/system_info.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LiveData({ info }) {
  if (!info) return null;

  const attr = info.attributes || {};
  const latitude = info.latitude;
  const longitude = info.longitude;
  const isActive =
  attr.motion === true ||
  info.speed > 1 ||
  info.state === "moving";

  return (
         <div className="live-screen">
             <div className="live-data-box">
               <div className="battery-info">
                <div className="card-header">
                  <img src={batteryInfo} />
                   <h3 className="h3"> Battery Information</h3>
                </div>
                   <p className="row"><span className="key">SOC:</span><span className="value">{attr.soc} %</span></p>
                   <p className="row"><span className="key">SOH:</span><span className="value">{attr.soh} %</span></p>
                   <p className="row"><span className="key">Voltage:</span><span className="value">{attr.battVoltage} V</span></p>
                   <p className="row"><span className="key">Current:</span><span className="value">{attr.battCurrent} A</span></p>
                   <p className="row"><span className="key">Energy:</span><span className="value">{attr.battEnergy} kWh</span></p>
                   <p className="row"><span className="key">Battery:</span><span className="value">{attr.battery}</span></p>
                   <p className="row"><span className="key">Rated Capacity:</span><span className="value">{attr.ratedCapacity} Ah</span></p>
                   <p className="row"><span className="key">Time to Discharge:</span><span className="value">{attr.timeToDischarge} hrs</span></p>
                   <p className="row"><span className="key">Max Cell Voltage:</span><span className="value">{attr.maxCellVoltage} V</span></p>
                   <p className="row"><span className="key">Min Cell Voltage:</span><span className="value">{attr.minCellVoltage} V</span></p>
                   <p className="row"><span className="key">Cell Voltage Diff:</span><span className="value">{attr.cellVoltDiff} V</span></p>
                   <p className="row"><span className="key">Over Voltage Alarm:</span><span className="value">{attr.batOva}</span></p>
                   <p className="row"><span className="key">Under Voltage Alarm:</span><span className="value">{attr.batUva}</span></p>
            

                </div>
                <div className="odometer-info">
                <div className="card-header">
                  <img src={odometerIcon} />
                   <h3 className="h3">Odometer</h3>
                </div>
                   <p className="row"><span className="key">Odometer:</span><span className="value">{attr.odometer}</span></p>
                   <p className="row"><span className="key">ODO KM:</span><span className="value">{attr.odokm}</span></p>
                   <p className="row"><span className="key">Unique ID:</span><span className="value">{info.uniqueid}</span></p>
                   <p className="row"><span className="key">Device Name:</span><span className="value">{info.name}</span></p>
                   <p className="row"><span className="key">Account ID:</span><span className="value">{info.accountId}</span></p>
                   <p className="row"><span className="key">Type:</span><span className="value">{info.type}</span></p>
                   <p className="row"><span className="key">Model:</span><span className="value">{info.model}</span></p>
                   <p className="row"><span className="key">Fix Time:</span><span className="value">{info.fixTime}</span></p>
                   <p className="row">
  <span className="key">Status:</span>

  <span
    style={{
      background: isActive ? "#4CAF50" : "#E53935", 
      width: "100px",
      color: "#fff",
      textAlign: "end",
      padding: "2px 15px",
      borderRadius: "20px",
      fontWeight: "medium",
    }}
  >
    {isActive ? "Active" : "Stopped"}
  </span>
</p>

                </div>
                
            
             <div className="card-map">
                <div className="card-header">
                  <img src={odometerIcon} />
                   <h3 className="h3">Location</h3>
                </div>
               <div className="map-placeholder">
                 {latitude && longitude ? (
                <MapContainer
                  center={[latitude, longitude]}
                  zoom={15}
                  className="map"
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[latitude, longitude]}>
                    <Popup>Lat: {latitude}, Lng: {longitude}</Popup>
                  </Marker>
                </MapContainer>
              ) : <p>No location available</p>}
            </div>

            <p className="row"><span className="key">Latitude:</span><span className="value">{latitude}</span></p>
            <p className="row"><span className="key">Longitude:</span><span className="value">{longitude}</span></p>
            <p className="row"><span className="key">Speed:</span><span className="value">{info.speed} km/h</span></p>
          </div>
                 {/* MOTOR INFO */}
            <div className="motor-info">
                <div className="card-header">
                  <img src={motorInfo} />
                   <h3 className="h3"> Motor Information</h3>
                </div>
                <p className="row"><span className="key">Motor Temp:</span><span className="value">{attr.motorTemp} °C</span></p>
                <p className="row"><span className="key">Motor Speed:</span><span className="value">{attr.motorSpeed} RPM</span></p>
                <p className="row"><span className="key">Motor Fault:</span><span className="value">{attr.motorFault}</span></p>
                <p className="row"><span className="key">Controller Temp:</span><span className="value">{attr.controllerTemp} °C</span></p>
                </div>
           
              {/* PERFORMANCE */}
           <div className="performance">
             <div className="card-header">
                  <img src={performance} />
                   <h3 className="h3">Performance</h3>
                </div>
             <p className="row"><span className="key">Power:</span><span className="value">{attr.power} W</span></p>
             <p className="row"><span className="key">Speed:</span><span className="value">{attr.speed} km/h</span></p>
           </div>
             {/* CONNECTIVITY */}
           <div className="connectivity">
             <div className="card-header">
                  <img src={connectivity} />
                   <h3 className="h3">Connectivity</h3>
                </div>
             <p className="row"><span className="key">IoT Voltage:</span><span className="value">{attr.iotVoltage} V</span></p>
             <p className="row"><span className="key">Ignition:</span><span className="value">{attr.ignition}</span></p>
             <p className="row"><span className="key">RSSI:</span><span className="value">{attr.rssi} dBm</span></p>
             <p className="row"><span className="key">Satellites:</span><span className="value">{attr.sat}</span></p>
           </div>
         </div>

      </div>
  );
}

export default LiveData;





  // <div className="live-data-wrapper">
  //     <div className="card-background">
  //       <div className="layout-grid">

  //         {/* BATTERY INFORMATION */}
  //         <div className="card battery-card">
  //           <h3><img src={batteryInfo} /> Battery Information</h3>

  //           <div className="battery-grid">
  //             <div>
  //               <p className="row"><span className="key">SOC:</span><span className="value">{attr.soc} %</span></p>
  //               <p className="row"><span className="key">SOH:</span><span className="value">{attr.soh} %</span></p>
  //               <p className="row"><span className="key">Voltage:</span><span className="value">{attr.battVoltage} V</span></p>
  //               <p className="row"><span className="key">Current:</span><span className="value">{attr.battCurrent} A</span></p>
  //               <p className="row"><span className="key">Energy:</span><span className="value">{attr.battEnergy} kWh</span></p>
  //               <p className="row"><span className="key">Battery:</span><span className="value">{attr.battery}</span></p>
  //               <p className="row"><span className="key">Rated Capacity:</span><span className="value">{attr.ratedCapacity} Ah</span></p>
  //               <p className="row"><span className="key">Time to Discharge:</span><span className="value">{attr.timeToDischarge} hrs</span></p>
  //             </div>

  //             <div className="highlight-box">
  //               <p className="row"><span className="key">Max Cell Voltage:</span><span className="value">{attr.maxCellVoltage} V</span></p>
  //               <p className="row"><span className="key">Min Cell Voltage:</span><span className="value">{attr.minCellVoltage} V</span></p>
  //               <p className="row"><span className="key">Cell Voltage Diff:</span><span className="value">{attr.cellVoltDiff} V</span></p>
  //               <p className="row"><span className="key">Over Voltage Alarm:</span><span className="value">{attr.batOva}</span></p>
  //               <p className="row"><span className="key">Under Voltage Alarm:</span><span className="value">{attr.batUva}</span></p>
  //             </div>
  //           </div>
  //         </div>

  //         {/* LOCATION */}
  //         <div className="card map-card">
  //           <h3><img src={locationIcon} /> Location</h3>

  //           <div className="map-placeholder">
  //             {latitude && longitude ? (
  //               <MapContainer
  //                 center={[latitude, longitude]}
  //                 zoom={15}
  //                 className="map"
  //               >
  //                 <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  //                 <Marker position={[latitude, longitude]}>
  //                   <Popup>Lat: {latitude}, Lng: {longitude}</Popup>
  //                 </Marker>
  //               </MapContainer>
  //             ) : <p>No location available</p>}
  //           </div>

  //           <p className="row"><span className="key">Latitude:</span><span className="value">{latitude}</span></p>
  //           <p className="row"><span className="key">Longitude:</span><span className="value">{longitude}</span></p>
  //           <p className="row"><span className="key">Speed:</span><span className="value">{info.speed} km/h</span></p>
  //           <p className="row"><span className="key">Course:</span><span className="value">{info.course}°</span></p>
  //         </div>

  //         {/* ODOMETER */}
  //         <div className="card">
  //           <h3><img src={odometerIcon} /> Odometer</h3>
  //           <p className="row"><span className="key">Odometer:</span><span className="value">{attr.odometer}</span></p>
  //           <p className="row"><span className="key">ODO CAN:</span><span className="value">{attr.odoCan}</span></p>
  //           <p className="row"><span className="key">ODO KM:</span><span className="value">{attr.odokm}</span></p>
  //           <p className="row"><span className="key">Distance to Empty:</span><span className="value">{attr.distToEmpty}</span></p>
  //         </div>

  //         {/* DEVICE INFO */}
  //         <div className="card">
  //           <h3><img src={deviceInfo} /> Device Information</h3>
  //           <p className="row"><span className="key">Unique ID:</span><span className="value">{info.uniqueid}</span></p>
  //           <p className="row"><span className="key">Device Name:</span><span className="value">{info.name}</span></p>
  //           <p className="row"><span className="key">Account ID:</span><span className="value">{info.accountId}</span></p>
  //           <p className="row"><span className="key">Type:</span><span className="value">{info.type}</span></p>
  //           <p className="row"><span className="key">Model:</span><span className="value">{info.model}</span></p>
  //           <p className="row"><span className="key">Fix Time:</span><span className="value">{info.fixTime}</span></p>
  //         </div>

  //         {/* MOTOR INFO */}
  //         <div className="card">
  //           <h3><img src={motorInfo} /> Motor Information</h3>
  //           <p className="row"><span className="key">Motor Temp:</span><span className="value">{attr.motorTemp} °C</span></p>
  //           <p className="row"><span className="key">Motor Speed:</span><span className="value">{attr.motorSpeed} RPM</span></p>
  //           <p className="row"><span className="key">Motor Fault:</span><span className="value">{attr.motorFault}</span></p>
  //           <p className="row"><span className="key">Controller Temp:</span><span className="value">{attr.controllerTemp} °C</span></p>
  //         </div>

  //         {/* SYSTEM INFO */}
  //         <div className="card">
  //           <h3><img src={systemInfo} /> System Information</h3>
  //           <p className="row"><span className="key">Firmware:</span><span className="value">{attr.fwVersion}</span></p>
  //           <p className="row"><span className="key">Total Resets:</span><span className="value">{attr.totRst}</span></p>
  //           <p className="row"><span className="key">Reset Reason:</span><span className="value">{attr.rstRsn}</span></p>
  //           <p className="row"><span className="key">Alarm:</span><span className="value">{attr.alarm}</span></p>
  //         </div>

  //         {/* CONNECTIVITY */}
  //         <div className="card">
  //           <h3><img src={connectivity} /> Connectivity</h3>
  //           <p className="row"><span className="key">IoT Voltage:</span><span className="value">{attr.iotVoltage} V</span></p>
  //           <p className="row"><span className="key">Motion:</span><span className="value">{attr.motion ? "Yes" : "No"}</span></p>
  //           <p className="row"><span className="key">Ignition:</span><span className="value">{attr.ignition}</span></p>
  //           <p className="row"><span className="key">RSSI:</span><span className="value">{attr.rssi} dBm</span></p>
  //           <p className="row"><span className="key">Satellites:</span><span className="value">{attr.sat}</span></p>
  //         </div>

  //         {/* PERFORMANCE */}
  //         <div className="card">
  //           <h3><img src={performance} /> Performance</h3>
  //           <p className="row"><span className="key">Power:</span><span className="value">{attr.power} W</span></p>
  //           <p className="row"><span className="key">Speed:</span><span className="value">{attr.speed} km/h</span></p>
  //         </div>

  //       </div>
  //     </div>
  //   </div>