import React from "react";
import ReactApexChart from "react-apexcharts";

export default function TotalSalesChart() {
  const options = {
    chart: { type: "line", toolbar: { show: false } },
    stroke: { curve: "smooth", width: [2, 3], dashArray: [5, 0] },
    colors: ["#a5c8ed", "#1a73e8"],
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      axisBorder: { show: false }, axisTicks: { show: false },
      labels: { style: { colors: "#9CA3AF", fontSize: "11px" } },
    },
    yaxis: {
      min: 4000, max: 10000, tickAmount: 3,
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
    { name: "2024", data: [6000, 6000, 6000, 6000, 5000, 4000] },
    { name: "2025", data: [4000, 4000, 4000, 4000, 6000, 10000] },
  ];

  return (
    <div className="flex-1 min-w-0 bg-white border border-gray-200 rounded-xl flex flex-col box-border p-6 overflow-hidden" style={{ height: "clamp(260px, 27vw, 400px)" }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="m-0 font-bold text-gray-900" style={{ fontSize: "clamp(11px, 0.78vw, 15px)" }}>Total Sales</h2>
        <span className="font-bold text-gray-900" style={{ fontSize: "clamp(11px, 0.78vw, 15px)" }}>$756K</span>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-0">
        <ReactApexChart options={options} series={series} type="line" height="100%" />
      </div>

      {/* Legend */}
      <div className="flex gap-4 justify-center mt-2">
        <span className="flex items-center gap-1.5 font-bold text-gray-700" style={{ fontSize: 11 }}>
          <span className="inline-block rounded-sm" style={{ width: 20, height: 2, background: "#1a73e8" }} />
          Jan–Jun, 2025
        </span>
        <span className="flex items-center gap-1.5 text-gray-400" style={{ fontSize: 11 }}>
          <span className="inline-block rounded-sm" style={{ width: 20, height: 2, background: "#a5c8ed" }} />
          Jan–Dec, 2024
        </span>
      </div>
    </div>
  );
}