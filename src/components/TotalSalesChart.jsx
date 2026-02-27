import React from "react";
import ReactApexChart from "react-apexcharts";

export default function TotalSalesChart() {
  const options = {
    chart: { type: "area", toolbar: { show: false } },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2, colors: ["#4F46E5"] },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        colorStops: [
          { offset: 0, color: "#4F46E5", opacity: 0.3 },
          { offset: 100, color: "#4F46E5", opacity: 0.02 },
        ],
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      axisBorder: { show: false }, axisTicks: { show: false },
      labels: { style: { colors: "#9CA3AF", fontSize: "11px" } },
    },
    yaxis: {
      labels: {
        style: { colors: "#9CA3AF", fontSize: "11px" },
        formatter: (val) => `$${(val / 1000).toFixed(0)}k`,
      },
    },
    grid: { borderColor: "#F3F4F6", strokeDashArray: 4 },
    tooltip: { y: { formatter: (val) => `$${val.toLocaleString()}` } },
    colors: ["#4F46E5"],
  };

  const series = [{ name: "Total Sales", data: [42000, 55000, 48000, 70000, 62000, 90000] }];

  return (
    <div className="flex-1 min-w-0 bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex justify-between items-start mb-1">
        <p className="m-0 text-sm text-gray-500">Total Sales</p>
        <p className="m-0 text-xl font-bold text-gray-900">$756K</p>
      </div>
      <ReactApexChart options={options} series={series} type="area" height={160} />
      <div className="flex gap-4 justify-center mt-1">
        <span className="text-xs text-gray-500 flex items-center gap-1">
          <span className="inline-block rounded-sm" style={{ width: 20, height: 2, background: "#4F46E5" }} />
          Jan–Jun, 2025
        </span>
        <span className="text-xs text-gray-300 flex items-center gap-1">
          <span className="inline-block rounded-sm" style={{ width: 20, height: 2, background: "#D1D5DB" }} />
          Jan–Dec, 2024
        </span>
      </div>
    </div>
  );
}
