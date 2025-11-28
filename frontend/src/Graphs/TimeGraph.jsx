import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function TimeGraph({ data }) {
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
    const indexValues = data.map((_, i) => i + 1);

    chart.current.setOption({
      title: { text: "Data Points Timeline", left: "center" },
      tooltip: { trigger: "axis" },
      xAxis: { type: "category", data: times, axisLabel: { rotate: 45 } },
      yAxis: { type: "value", name: "Index" },
      series: [
        {
          name: "Index",
          type: "line",
          smooth: true,
          data: indexValues
        }
      ]
    });
  }, [data]);

  return <div ref={chartRef} style={{ height: "280px", width: "100%" }} />;
}
