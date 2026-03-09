import React from "react";
import { MetricCard } from "./MetricCard";
import NewOrdersImg from "./New Orders.png";
import TotalRevenueImg from "./Total Revenue.png";
import TotalCompletedImg from "./Total Order Completed.png";
import TotalOrdersImg from "./Total Orders.png";
import Topdata from "../Topdata.json";

const MONTH_KEYS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december"
];

export default function KeyMetricsStore({ filter = "thismonth" }) {
  // Check if filter is a month name (e.g. "january")
  const isMonth = MONTH_KEYS.includes(filter);

  // Pick correct data block
  const d = isMonth
    ? (Topdata.months[filter] || Topdata.months["january"])
    : (Topdata[filter] || Topdata["thismonth"]);

  const metrics = [
    {
      img: NewOrdersImg,
      iconBg: "rgb(231,240,254)",
      title: "New Orders",
      value: d.newOrders.value,
      change: d.newOrders.change,
      changeLabel: d.newOrders.changeLabel,
      positive: d.newOrders.positive,
    },
    {
      img: TotalRevenueImg,
      iconBg: "rgb(237,233,254)",
      title: "Total Revenue",
      value: d.totalRevenue.value,
      change: d.totalRevenue.change,
      changeLabel: d.totalRevenue.changeLabel,
      positive: d.totalRevenue.positive,
    },
    {
      img: TotalCompletedImg,
      iconBg: "rgb(204,251,241)",
      title: "Total Order Completed",
      value: d.totalCompleted.value,
      change: d.totalCompleted.change,
      changeLabel: d.totalCompleted.changeLabel,
      positive: d.totalCompleted.positive,
    },
    {
      img: TotalOrdersImg,
      iconBg: "rgb(254,243,199)",
      title: "Total Orders",
      value: d.totalOrders.value,
      change: d.totalOrders.change,
      changeLabel: d.totalOrders.changeLabel,
      positive: d.totalOrders.positive,
    },
  ];

  return (
    <div style={{ marginBottom: "clamp(10px, 1vw, 24px)" }}>
      <h2
        style={{
          width: 194,
          height: 28,
          fontSize: 20,
          fontWeight: 600,
          fontFamily: "'DM Sans', sans-serif",
          color: "#111827",
          margin: "0 0 clamp(6px,0.7vw,14px)",
          lineHeight: "28px",
        }}
      >
        Key Metrics of Store
      </h2>

      <div style={{ display: "flex", gap: "clamp(6px, 0.75vw, 16px)", width: "100%" }}>
        {metrics.map((m, i) => (
          <MetricCard key={i} {...m} />
        ))}
      </div>
    </div>
  );
}