
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function VoltageGraph({ data }) {
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
    const voltage = data.map(d => d.voltage);

    chart.current.setOption({
      title: { text: "Battery Voltage vs Time", left: "center" },
      tooltip: { trigger: "axis" },
      xAxis: { type: "category", data: times, axisLabel: { rotate: 45 } },
      yAxis: { type: "value", name: "Voltage (V)" },
      series: [
        {
          name: "Voltage",
          type: "line",
          smooth: true,
          data: voltage
        }
      ]
    });
  }, [data]);

  return <div ref={chartRef} style={{ height: "280px", width: "100%" }} />;
}
