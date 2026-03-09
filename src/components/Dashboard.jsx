import React, { useState } from "react";
import TopBar from "./TopBar";
import DateFilter from "./DateFilter";
import KeyMetricsStore from "./KeyMetricsStore";
import KeyMetricsLMS from "./KeyMetricsLMS";
import TotalSalesChart from "./TotalSalesChart";
import TotalOrdersChart from "./TotalOrdersChart";
import PaymentMethods from "./PaymentMethods";
import StoreOrdersVsSubscriptions from "./StoreOrdersVsSubscriptions";
import Top5SellingProducts from "./Top5SellingProducts";
import Top5SellingSubscriptionPlans from "./Top5SellingSubscriptionPlans";

export default function Dashboard() {
  const [filter, setFilter] = useState("thismonth");

  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        background: "#fff",
        overflowY: "auto",
        minHeight: "100vh",
        padding: 32,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: 48,
      }}
    >
      {/* ── Top Bar ── */}
      <TopBar />

      {/* ── Date Filter ── */}
      <DateFilter onFilterChange={setFilter} />

      {/* ── Key Metrics: Store ── */}
      <KeyMetricsStore filter={filter} />

      {/* ── Key Metrics: LMS ── */}
      <KeyMetricsLMS filter={filter} />

      {/* ── Charts Row ── */}
      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <TotalSalesChart filter={filter} />
        <TotalOrdersChart filter={filter} />
        <PaymentMethods filter={filter} />
      </div>

      {/* ── Store Orders vs Subscriptions ── */}
      <StoreOrdersVsSubscriptions filter={filter} />

      {/* ── Tables Row ── */}
      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <Top5SellingProducts />
        <Top5SellingSubscriptionPlans />
      </div>

      {/* Responsive column width overrides */}
      <style>{`
        @media (max-width: 1400px) {
          .col-price, .col-freq { width: 80px !important; }
          .col-qty              { width: 60px !important; }
        }
        @media (max-width: 1024px) {
          .col-price, .col-freq { width: 70px !important; }
          .col-qty              { width: 55px !important; }
        }
        @media (max-width: 1280px) {
          .charts-row,
          .tables-row {
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  );
}