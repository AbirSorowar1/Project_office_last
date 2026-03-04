import React from "react";
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
  return (
    <div
      style={{
        // Spec: width=1160, left=280px, padding=32px, gap=48px
        flex: 1,
        minWidth: 0,
        background: "#fff",
        overflowY: "auto",
        minHeight: "100vh",
        padding: 32,               // padding: 32px all sides
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: 48,                   // gap: 48px between all top-level sections
      }}
    >
      {/* ── Top Bar ── */}
      <TopBar />

      {/* ── Date Filter ── */}
      <DateFilter />

      {/* ── Key Metrics: Store ── */}
      <KeyMetricsStore />

      {/* ── Key Metrics: LMS ── */}
      <KeyMetricsLMS />

      {/* ── Charts Row ── */}
      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <TotalSalesChart />
        <TotalOrdersChart />
        <PaymentMethods />
      </div>

      {/* ── Store Orders vs Subscriptions ── */}
      <StoreOrdersVsSubscriptions />

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
          /* Stack charts and tables vertically below breakpoint */
          .charts-row,
          .tables-row {
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  );
}