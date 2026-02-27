import React from "react";
import { MetricCard } from "./MetricCard";
import NewSubscriptionsImg from "./New Subscriptions.png";
import SubscriptionRevenueImg from "./Subscription Revenue.png";
import ActiveSubscribersImg from "./Active Subscribers.png";
import AverageMRRImg from "./Average MRR.png";

const metrics = [
  { img: NewSubscriptionsImg, iconBg: "rgb(231,240,254)", title: "New Subscriptions", value: "584", change: "+6.2%", changeLabel: "vs last 6 months", positive: true },
  { img: SubscriptionRevenueImg, iconBg: "rgb(237,233,254)", title: "Subscription Revenue", value: "$139K", change: "+9%", changeLabel: "", positive: true },
  { img: ActiveSubscribersImg, iconBg: "rgb(234,248,227)", title: "Active Subscribers", value: "8,284", change: "+6.2%", changeLabel: "vs last 6 months", positive: true },
  { img: AverageMRRImg, iconBg: "rgb(226,246,244)", title: "Average MRR", value: "$26K", change: "+1k", changeLabel: "", positive: true },
];

export default function KeyMetricsLMS() {
  return (
    <div style={{ marginBottom: "clamp(10px, 1vw, 24px)" }}>
      <h2 style={{ fontSize: "clamp(11px, 0.78vw, 15px)", fontWeight: 600, color: "#111827", margin: "0 0 clamp(6px,0.7vw,14px)" }}>
        Key Metrics of LMS
      </h2>
      <div style={{ display: "flex", gap: "clamp(6px, 0.75vw, 16px)", width: "100%" }}>
        {metrics.map((m, i) => <MetricCard key={i} {...m} />)}
      </div>
    </div>
  );
}