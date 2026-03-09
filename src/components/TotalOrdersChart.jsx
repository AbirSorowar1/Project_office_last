import React from "react";
import ReactApexChart from "react-apexcharts";
import Topdata from "../Topdata.json";

const MONTH_KEYS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december"
];

function getLegendLabels(filter) {
  if (filter === "today") return ["Today", "Yesterday"];
  if (filter === "yesterday") return ["Yesterday", "2 Days Ago"];
  if (filter === "thisweek") return ["This Week", "Last Week"];
  if (filter === "lastweek") return ["Last Week", "Prev Week"];
  if (filter === "lastmonth") return ["Last Month", "Prev Month"];
  if (MONTH_KEYS.includes(filter)) {
    const label = filter.charAt(0).toUpperCase() + filter.slice(1);
    return [label, "Prev " + label];
  }
  return ["Jan–Jun, 2025", "Jan–Dec, 2024"];
}

export default function TotalOrdersChart({ filter = "thismonth" }) {
  const isMonth = MONTH_KEYS.includes(filter);
  const d = isMonth
    ? (Topdata.months[filter]?.ordersChart || Topdata.months["january"].ordersChart)
    : (Topdata[filter]?.ordersChart || Topdata["thismonth"].ordersChart);

  const allVals = [...d.current, ...d.previous];
  const dataMin = Math.min(...allVals);
  const dataMax = Math.max(...allVals);
  const yMin = Math.max(0, Math.floor(dataMin / 1000) * 1000 - 1000);
  const yMax = Math.ceil(dataMax / 1000) * 1000 + 1000;

  const [label1, label2] = getLegendLabels(filter);

  const options = {
    chart: { type: "line", toolbar: { show: false } },
    stroke: { curve: "smooth", width: [3, 2], dashArray: [0, 5] },
    colors: ["#1a73e8", "#a5c8ed"],
    xaxis: {
      categories: d.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: "#9CA3AF", fontSize: "11px" } },
    },
    yaxis: {
      min: yMin,
      max: yMax,
      tickAmount: 3,
      labels: {
        style: { colors: "#9CA3AF", fontSize: "11px" },
        formatter: (val) => val.toLocaleString(),
      },
    },
    grid: { borderColor: "#eee" },
    legend: { show: false },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: (val) => val.toLocaleString() } },
  };

  const series = [
    { name: label1, data: d.current },
    { name: label2, data: d.previous },
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
            width: 103,
            height: 28,
            fontSize: 16,
            lineHeight: "28px",
            color: "#111827",
            fontWeight: 700,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Total Orders
        </h2>
        <span
          className="font-bold text-gray-900"
          style={{
            height: 28,
            fontSize: 16,
            lineHeight: "28px",
            color: "#111827",
            fontWeight: 700,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {d.totalLabel}
        </span>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-0">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height="100%"
          key={filter}
        />
      </div>

      {/* Legend */}
      <div className="flex gap-2 justify-end mt-3 flex-nowrap overflow-x-auto">
        <span
          className="flex items-center gap-1 font-bold text-black px-2 py-0.5 rounded-md whitespace-nowrap"
          style={{ fontSize: 11, background: "var(--neutral-transparent-16, rgba(153,153,153,0.16))" }}
        >
          <span className="inline-block rounded-sm" style={{ width: 16, height: 2, background: "#1a73e8" }} />
          {label1}
        </span>
        <span
          className="flex items-center gap-1 font-bold text-black px-2 py-0.5 rounded-md whitespace-nowrap"
          style={{ fontSize: 11, background: "var(--neutral-transparent-16, rgba(153,153,153,0.16))" }}
        >
          <span className="inline-block rounded-sm" style={{ width: 16, height: 2, background: "#a5c8ed" }} />
          {label2}
        </span>
      </div>
    </div>
  );
}