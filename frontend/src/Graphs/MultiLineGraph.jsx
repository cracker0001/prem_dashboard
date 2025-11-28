// import React, { useEffect, useRef } from "react";
// import * as echarts from "echarts";

// export default function MultiLineGraph({ data }) {
//   const voltageRef = useRef(null);
//   const currentRef = useRef(null);
//   const socRef = useRef(null);

//   const voltageChart = useRef(null);
//   const currentChart = useRef(null);
//   const socChart = useRef(null);

//   useEffect(() => {
//     if (!voltageChart.current)
//       voltageChart.current = echarts.init(voltageRef.current);

//     if (!currentChart.current)
//       currentChart.current = echarts.init(currentRef.current);

//     if (!socChart.current)
//       socChart.current = echarts.init(socRef.current);

//     return () => {
//       voltageChart.current?.dispose();
//       currentChart.current?.dispose();
//       socChart.current?.dispose();
//     };
//   }, []);

//   useEffect(() => {
//     if (!data || data.length === 0) return;

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


//     voltageChart.current.setOption({
//       title: {
//         text: "Voltage vs Time",
//         left: "center",
//         top: 10,
//       },
//       tooltip: { trigger: "axis" },
//       xAxis: {
//         type: "category",
//         data: times,
//         axisLabel: { rotate: 45 },
//       },
//       yAxis: {
//         type: "value",
//         name: "Voltage (V)",
//         nameLocation: "middle",
//         nameGap: 40,
//       },
//       series: [
//         {
//           name: "Voltage",
//           type: "line",
//           smooth: true,
//           data: voltage,
//           lineStyle: { width: 2, color: "#3a5fcd" },
//         },
//       ],
//     });


//     currentChart.current.setOption({
//       title: {
//         text: "Current vs Time",
//         left: "center",
//         top: 10,
//       },
//       tooltip: { trigger: "axis" },
//       xAxis: {
//         type: "category",
//         data: times,
//         axisLabel: { rotate: 45 },
//       },
//       yAxis: {
//         type: "value",
//         name: "Current (A)",
//         nameLocation: "middle",
//         nameGap: 40,
//       },
//       series: [
//         {
//           name: "Current",
//           type: "line",
//           smooth: true,
//           data: current,
//           lineStyle: { width: 2, color: "#27ae60" },
//         },
//       ],
//     });


//     socChart.current.setOption({
//       title: {
//         text: "SOC vs Time",
//         left: "center",
//         top: 10,
//       },
//       tooltip: { trigger: "axis" },
//       xAxis: {
//         type: "category",
//         data: times,
//         axisLabel: { rotate: 45 },
//       },
//       yAxis: {
//         type: "value",
//         name: "SOC (%)",
//         nameLocation: "middle",
//         nameGap: 40,
//       },
//       series: [
//         {
//           name: "SOC",
//           type: "line",
//           smooth: true,
//           data: soc,
//           lineStyle: { width: 2, color: "#000" },
//         },
//       ],
//     });
//   }, [data]);

//   return (
//     <div style={{ width: "100%" }}>
//     <div style={{display: "flex", gap: "10px"}}>
//           <div
//         ref={voltageRef}
//         style={{
//           height: "350px",
//            width: "50%",
//           background: "#fff",
//           marginBottom: "20px",
//           borderRadius: "12px",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//           padding: "10px",
//         }}
//       />

//       <div
//         ref={currentRef}
//         style={{
//           height: "350px",
//            width: "50%",
//           background: "#fff",
//           marginBottom: "20px",
//           borderRadius: "12px",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//           padding: "10px",
//         }}
//       />

//     </div>
//       <div
//         ref={socRef}
//         style={{
//           height: "320px",
//           background: "#fff",
//           borderRadius: "12px",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//           padding: "10px",
//         }}
//       />
//     </div>
//   );
// }
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

// smooth curve (moving average)
function smooth(values, window = 6) {
  return values.map((val, i) => {
    const start = Math.max(0, i - window);
    const end = Math.min(values.length, i + window);
    const slice = values.slice(start, end);
    return slice.reduce((a, b) => a + b, 0) / slice.length;
  });
}

// downsample large dataset
function downsample(times, values, maxPoints = 80) {
  if (times.length <= maxPoints) return { times, values };
  const step = Math.ceil(times.length / maxPoints);
  return {
    times: times.filter((_, i) => i % step === 0),
    values: values.filter((_, i) => i % step === 0),
  };
}

export default function MultiLineGraph({ data }) {
  const voltageRef = useRef(null);
  const currentRef = useRef(null);
  const socRef = useRef(null);

  const voltageChart = useRef(null);
  const currentChart = useRef(null);
  const socChart = useRef(null);

  useEffect(() => {
    voltageChart.current = echarts.init(voltageRef.current);
    currentChart.current = echarts.init(currentRef.current);
    socChart.current = echarts.init(socRef.current);

    return () => {
      voltageChart.current?.dispose();
      currentChart.current?.dispose();
      socChart.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!data || data.length === 0) return;

    // format time labels
    const times = data.map((d) =>
      new Date(d.time).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    );

    // raw values
    let voltage = smooth(data.map((d) => d.voltage));
    let current = smooth(data.map((d) => d.current));
    let soc = smooth(data.map((d) => d.soc));

    // downsample
    const v = downsample(times, voltage);
    const c = downsample(times, current);
    const s = downsample(times, soc);

    // COMMON GRID STYLE
    const grid = {
      left: "10%",
      right: "5%",
      bottom: "15%",
      top: "15%",
    };

    // ---------------- VOLTAGE ----------------
    voltageChart.current.setOption({
      title: { text: "Voltage vs Time", left: "center", top: 5, textStyle: { fontWeight: "600" } },
      tooltip: { trigger: "axis" },
      grid,
      xAxis: {
        type: "category",
        data: v.times,
        axisLabel: { rotate: 45, fontSize: 10 },
      },
      yAxis: { type: "value", name: "Voltage (V)" },
      series: [
        {
          type: "line",
          smooth: true,
          data: v.values,
          symbol: "circle",
          symbolSize: 3,
          lineStyle: { width: 3, color: "#2D61E4" },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(45,97,228,0.4)" },
              { offset: 1, color: "rgba(45,97,228,0.05)" },
            ]),
          },
        },
      ],
    });

    // ---------------- CURRENT ----------------
    currentChart.current.setOption({
      title: { text: "Current vs Time", left: "center", top: 5, textStyle: { fontWeight: "600" } },
      tooltip: { trigger: "axis" },
      grid,
      xAxis: { type: "category", data: c.times, axisLabel: { rotate: 45, fontSize: 10 } },
      yAxis: { type: "value", name: "Current (A)" },
      series: [
        {
          type: "line",
          smooth: true,
          data: c.values,
          symbol: "circle",
          symbolSize: 3,
          lineStyle: { width: 3, color: "#1FB676" },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(31,182,118,0.35)" },
              { offset: 1, color: "rgba(31,182,118,0.05)" },
            ]),
          },
        },
      ],
    });

    // ---------------- SOC ----------------
    socChart.current.setOption({
      title: { text: "SOC vs Time", left: "center", top: 5, textStyle: { fontWeight: "600" } },
      tooltip: { trigger: "axis" },
      grid,
      xAxis: { type: "category", data: s.times, axisLabel: { rotate: 45, fontSize: 10 } },
      yAxis: { type: "value", name: "SOC (%)" },
      series: [
        {
          type: "line",
          smooth: true,
          data: s.values,
          symbol: "circle",
          symbolSize: 3,
          lineStyle: { width: 3, color: "#000" },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(0,0,0,0.3)" },
              { offset: 1, color: "rgba(0,0,0,0.03)" },
            ]),
          },
        },
      ],
    });
  }, [data]);

  return (
    <div style={{ width: "100%" }}>
      {/* TOP TWO GRAPHS */}
      <div style={{ display: "flex", gap: "10px" }}>
        <div
          ref={voltageRef}
          style={{
            height: "350px",
            width: "50%",
            background: "#fff",
            borderRadius: "12px",
            padding: "10px",
            boxShadow: "0 4px 18px rgba(0,0,0,0.12)",
          }}
        />
        <div
          ref={currentRef}
          style={{
            height: "350px",
            width: "50%",
            background: "#fff",
            borderRadius: "12px",
            padding: "10px",
            boxShadow: "0 4px 18px rgba(0,0,0,0.12)",
          }}
        />
      </div>

      {/* SOC */}
      <div
        ref={socRef}
        style={{
          height: "330px",
          background: "#fff",
          borderRadius: "12px",
          padding: "10px",
          boxShadow: "0 4px 18px rgba(0,0,0,0.12)",
          marginTop: "10px",
        }}
      />
    </div>
  );
}
