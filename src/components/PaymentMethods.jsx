import React from "react";
import ReactApexChart from "react-apexcharts";

const methods = [
  { label: "Credit / Debit Card", percent: 51, color: "#2563eb" },
  { label: "Mobile Wallet", percent: 20, color: "#818cf8" },
  { label: "Cash", percent: 7, color: "#6ebf91" },
  { label: "Gift Card", percent: 22, color: "#ffb84d" },
];

export default function PaymentMethods() {
  const options = {
    chart: { type: "bar", stacked: true, toolbar: { show: false } },
    plotOptions: { bar: { horizontal: true, barHeight: "75%", borderRadius: 8 } },
    stroke: { show: true, width: 4, colors: ["#fff"] },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { show: false },
    grid: { show: false },
    legend: { show: false },
    dataLabels: { enabled: false },
    colors: methods.map((m) => m.color),
    tooltip: { y: { formatter: (val) => `${val}%` } },
  };

  const series = methods.map((m) => ({ name: m.label, data: [m.percent] }));

  return (
    <div className="flex-1 min-w-0 bg-white border border-gray-200 rounded-xl flex flex-col box-border p-6 overflow-hidden" style={{ height: "clamp(260px, 27vw, 400px)" }}>
      {/* Header */}
      <h2 className="m-0 mb-2 font-bold text-gray-900" style={{ fontSize: "clamp(11px, 0.78vw, 15px)" }}>
        Payment Methods
      </h2>

      {/* Chart */}
      <div className="shrink-0">
        <ReactApexChart options={options} series={series} type="bar" height={160} />
      </div>

      {/* Legend list */}
      <div className="flex flex-col gap-3 mt-2 flex-1 justify-center">
        {methods.map((m, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <span className="inline-block rounded shrink-0" style={{ width: 16, height: 16, background: m.color }} />
              <span className="text-sm font-semibold text-gray-700">{m.label}</span>
            </div>
            <span className="text-sm font-bold text-gray-900">{m.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}