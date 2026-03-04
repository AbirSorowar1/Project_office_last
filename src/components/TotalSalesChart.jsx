import React from "react";
import ReactApexChart from "react-apexcharts";

export default function TotalSalesChart() {
  const options = {
    chart: { type: "line", toolbar: { show: false } },
    stroke: { curve: "smooth", width: [2, 3], dashArray: [5, 0] },
    colors: ["#a5c8ed", "#1a73e8"],
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: "#9CA3AF", fontSize: "11px" } },
    },
    yaxis: {
      min: 4000,
      max: 10000,
      tickAmount: 3,
      labels: {
        style: { colors: "#9CA3AF", fontSize: "11px" },
        formatter: (val) => `$${val.toLocaleString()}`,
      },
    },
    grid: { borderColor: "#eee" },
    legend: { show: false },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: (val) => `$${val.toLocaleString()}` } },
  };

  const series = [
    { name: "2024", data: [6000, 6000, 6000, 6000, 4000, 4000] },
    { name: "2025", data: [4000, 4000, 4000, 4000, 9999, 10000] },
  ];

  return (
    <div
      className="flex-1 min-w-0 bg-white border border-gray-200 rounded-xl flex flex-col box-border p-6 overflow-hidden"
      style={{ height: "clamp(260px, 27vw, 400px)" }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2
          className="m-0 font-bold"
          style={{
            width: 103,           // fixed width
            height: 28,
            fontSize: 16,         // chhoto kore dilam
            color: "#111827",
            fontWeight: 700,
            lineHeight: "28px",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Total Sales
        </h2>
        <span
          className="font-bold text-gray-900"
          style={{
            height: 28,
            fontSize: 16,         // match h2
            lineHeight: "28px",
            color: "#111827",
            fontWeight: 700,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          $756K
        </span>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-0">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height="100%"
        />
      </div>

      {/* Legend */}
      <div className="flex gap-2 justify-end mt-3 flex-nowrap overflow-x-auto">
        <span
          className="flex items-center gap-1 font-bold text-black px-2 py-0.5 rounded-md whitespace-nowrap"
          style={{
            fontSize: 11,
            background:
              "var(--neutral-transparent-16, rgba(153, 153, 153, 0.16))",
          }}
        >
          <span
            className="inline-block rounded-sm"
            style={{ width: 16, height: 2, background: "#1a73e8" }}
          />
          Jan–Jun, 2025
        </span>

        <span
          className="flex items-center gap-1 font-bold text-black px-2 py-0.5 rounded-md whitespace-nowrap"
          style={{
            fontSize: 11,
            background:
              "var(--neutral-transparent-16, rgba(153, 153, 153, 0.16))",
          }}
        >
          <span
            className="inline-block rounded-sm"
            style={{ width: 16, height: 2, background: "#a5c8ed" }}
          />
          Jan–Dec, 2024
        </span>
      </div>
    </div>
  );
}