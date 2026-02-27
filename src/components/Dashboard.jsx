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
    <div className="flex-1 min-w-0 bg-gray-50 overflow-y-auto min-h-screen p-8 box-border max-lg:pt-16 max-lg:px-5 max-sm:px-3">

      <TopBar />
      <DateFilter />
      <div className="mt-6">
        <KeyMetricsStore />
      </div>
      <KeyMetricsLMS />

      {/* Charts Row */}
      <div className="flex gap-4 mb-6 max-lg:flex-col">
        <TotalSalesChart />
        <TotalOrdersChart />
        <PaymentMethods />
      </div>

      <StoreOrdersVsSubscriptions />

      {/* Tables Row — responsive: side by side on large, stacked on small */}
      <div className="flex gap-4 max-lg:flex-col">
        <Top5SellingProducts />
        <Top5SellingSubscriptionPlans />
      </div>

      {/* Responsive overrides for table column widths */}
      <style>{`
        @media (max-width: 1400px) {
          .col-price, .col-freq  { width: 80px !important; }
          .col-qty               { width: 60px !important; }
        }
        @media (max-width: 1024px) {
          .col-price, .col-freq  { width: 70px !important; }
          .col-qty               { width: 55px !important; }
        }
      `}</style>
    </div>
  );
}