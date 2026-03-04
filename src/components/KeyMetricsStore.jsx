import React from "react";
import { MetricCard } from "./MetricCard";
import NewOrdersImg from "./New Orders.png";
import TotalRevenueImg from "./Total Revenue.png";
import TotalCompletedImg from "./Total Order Completed.png";
import TotalOrdersImg from "./Total Orders.png";

const metrics = [
  { img: NewOrdersImg, iconBg: "rgb(231,240,254)", title: "New Orders", value: "254", change: "+7.4%", changeLabel: "vs last 6 months", positive: true },
  { img: TotalRevenueImg, iconBg: "rgb(237,233,254)", title: "Total Revenue", value: "$4,175,580", change: "+11%", changeLabel: "", positive: true },
  { img: TotalCompletedImg, iconBg: "rgb(204,251,241)", title: "Total Order Completed", value: "18,975", change: "+6.2%", changeLabel: "vs last 6 months", positive: true },
  { img: TotalOrdersImg, iconBg: "rgb(254,243,199)", title: "Total Orders", value: "27,357", change: "+11%", changeLabel: "", positive: true },
];

export default function KeyMetricsStore() {
  return (
    <div style={{ marginBottom: "clamp(10px, 1vw, 24px)" }}>
      {/* Updated heading */}
      <h2
        style={{
          width: 194,           // fixed width
          height: 28,           // fixed height
          fontSize: 20,         // bigger size
          fontWeight: 600,      // semi-bold
          fontFamily: "'DM Sans', sans-serif",
          color: "#111827",
          margin: "0 0 clamp(6px,0.7vw,14px)",
          lineHeight: "28px",
        }}
      >
        Key Metrics of Store
      </h2>

      {/* Metric cards */}
      <div style={{ display: "flex", gap: "clamp(6px, 0.75vw, 16px)", width: "100%" }}>
        {metrics.map((m, i) => <MetricCard key={i} {...m} />)}
      </div>
    </div>
  );
}