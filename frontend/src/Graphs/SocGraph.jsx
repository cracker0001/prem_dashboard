// import React, { useEffect, useRef } from "react";
// import * as echarts from "echarts";

// export default function SocGraph({ data }) {
//   const chartRef = useRef(null);
//   const chart = useRef(null);

//   useEffect(() => {
//     if (!chart.current) {
//       chart.current = echarts.init(chartRef.current);
//     }

//     const times = data.map(d => d.time);
//     const soc = data.map(d => d.soc);

//     chart.current.setOption({
//       title: { text: "SOC vs Time", left: "center" },
//       tooltip: { trigger: "axis" },
//       xAxis: {
//         type: "category",
//         data: times,
//         axisLabel: { rotate: 45 }
//       },
//       yAxis: {
//         type: "value",
//         name: "SOC (%)",
//         min: 0,
//         max: 100
//       },
//       series: [
//         {
//           name: "SOC",
//           type: "line",
//           smooth: true,
//           data: soc
//         }
//       ]
//     });

//     chart.current.resize();
//     return () => chart.current && chart.current.dispose();
//   }, [data]);

//   return <div ref={chartRef} style={{ height: "250px", width: "100%" }} />;
// }
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function SocGraph({ data }) {
  const chartRef = useRef(null);
  const chart = useRef(null);

  useEffect(() => {
    if (!chart.current) {
      chart.current = echarts.init(chartRef.current);
    }
    return () => {
      chart.current && chart.current.dispose();
    };
  }, []);

  useEffect(() => {
    if (!chart.current) return;

    const times = data.map(d => d.time);
    const soc = data.map(d => d.soc);

    chart.current.setOption({
      title: { text: "SOC vs Time", left: "center" },
      tooltip: { trigger: "axis" },
      xAxis: { type: "category", data: times, axisLabel: { rotate: 45 } },
      yAxis: { type: "value", min: 0, max: 100, name: "SOC (%)" },
      series: [
        {
          name: "SOC",
          type: "line",
          smooth: true,
          data: soc
        }
      ]
    });
  }, [data]);

  return <div ref={chartRef} style={{ height: "280px", width: "100%" }} />;
}
