import React from "react";
import ReactApexChart from "react-apexcharts";

const methods = [
  { label: "Credit / Debit Card", percent: 51, color: "#3B82F6" },
  { label: "Mobile Wallet", percent: 20, color: "#A855F7" },
  { label: "Cash", percent: 7, color: "#10B981" },
  { label: "Gift Card", percent: 22, color: "#F59E0B" },
];

export default function PaymentMethods() {
  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      stacked: true,
    },
    // ──────────────────────────────────────────────
    // This block adds white divider lines between segments (most important for your picture)
    stroke: {
      show: true,
      width: 3,               // thickness of the white lines — try 2, 3 or 4
      colors: ["#ffffff"],    // pure white dividers
    },
    // ──────────────────────────────────────────────
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "70%",
        borderRadius: 4,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: [""],
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
      crosshairs: { show: false },
    },
    yaxis: { show: false },
    grid: { show: false },
    legend: { show: false },
    colors: methods.map((m) => m.color),
    tooltip: {
      y: { formatter: (val) => `${val}%` },
    },
  };

  const series = methods.map((m) => ({ name: m.label, data: [m.percent] }));

  return (
    <div className="flex-1 min-w-0 bg-white border border-gray-200 rounded-xl p-5">
      <p className="m-0 mb-3 text-sm font-semibold text-gray-900">Payment Methods</p>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={140}
      />
      <div className="flex flex-col gap-2 mt-4">
        {methods.map((m, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="inline-block rounded-sm shrink-0"
                style={{ width: 10, height: 10, background: m.color }}
              />
              <span className="text-xs text-gray-500">{m.label}</span>
            </div>
            <span className="text-xs font-semibold text-gray-900">{m.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}