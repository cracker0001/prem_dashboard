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