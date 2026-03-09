import React from "react";
import { MetricCard } from "./MetricCard";
import NewSubscriptionsImg from "./New Subscriptions.png";
import SubscriptionRevenueImg from "./Subscription Revenue.png";
import ActiveSubscribersImg from "./Active Subscribers.png";
import AverageMRRImg from "./Average MRR.png";
import Topdata from "../Topdata.json";

const MONTH_KEYS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december"
];

export default function KeyMetricsLMS({ filter = "thismonth" }) {
  const isMonth = MONTH_KEYS.includes(filter);
  const d = isMonth
    ? (Topdata.months[filter] || Topdata.months["january"])
    : (Topdata[filter] || Topdata["thismonth"]);

  const metrics = [
    {
      img: NewSubscriptionsImg,
      iconBg: "rgb(231,240,254)",
      title: "New Subscriptions",
      value: d.newSubscriptions.value,
      change: d.newSubscriptions.change,
      changeLabel: d.newSubscriptions.changeLabel,
      positive: d.newSubscriptions.positive,
    },
    {
      img: SubscriptionRevenueImg,
      iconBg: "rgb(237,233,254)",
      title: "Subscription Revenue",
      value: d.subscriptionRevenue.value,
      change: d.subscriptionRevenue.change,
      changeLabel: d.subscriptionRevenue.changeLabel,
      positive: d.subscriptionRevenue.positive,
    },
    {
      img: ActiveSubscribersImg,
      iconBg: "rgb(234,248,227)",
      title: "Active Subscribers",
      value: d.activeSubscribers.value,
      change: d.activeSubscribers.change,
      changeLabel: d.activeSubscribers.changeLabel,
      positive: d.activeSubscribers.positive,
    },
    {
      img: AverageMRRImg,
      iconBg: "rgb(226,246,244)",
      title: "Average MRR",
      value: d.averageMRR.value,
      change: d.averageMRR.change,
      changeLabel: d.averageMRR.changeLabel,
      positive: d.averageMRR.positive,
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
          lineHeight: "28px",
          margin: "0 0 clamp(6px,0.7vw,14px)",
        }}
      >
        Key Metrics of LMS
      </h2>

      <div style={{ display: "flex", gap: "clamp(6px, 0.75vw, 16px)", width: "100%" }}>
        {metrics.map((m, i) => (
          <MetricCard key={i} {...m} />
        ))}
      </div>
    </div>
  );
}