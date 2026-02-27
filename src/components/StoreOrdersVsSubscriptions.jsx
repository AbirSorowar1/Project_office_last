import React from "react";
import ReactApexChart from "react-apexcharts";

export default function StoreOrdersVsSubscriptions() {
  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      background: "transparent",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        borderRadius: 2,
        borderRadiusApplication: "end",
        dataLabels: { position: "top" },
      },
    },
    dataLabels: { enabled: false },

    // Diagonal hatch pattern fill
    fill: {
      type: "pattern",
      pattern: {
        style: ["slantedLines", "slantedLines"],
        width: 5,
        height: 5,
        strokeWidth: 2,
      },
    },

    colors: ["rgb(39,110,241)", "rgb(188,210,251)"],

    stroke: {
      show: false,
    },

    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: "#9CA3AF", fontSize: "12px", fontFamily: "inherit" },
      },
    },

    yaxis: {
      min: 0,
      max: 10000,
      tickAmount: 5,
      labels: {
        style: { colors: "#9CA3AF", fontSize: "11px", fontFamily: "inherit" },
        formatter: (val) => `$${(val / 1000).toFixed(0)}000`,
      },
    },

    grid: {
      borderColor: "#F3F4F6",
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },

    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      offsetY: 4,
      markers: {
        shape: "circle",
        size: 7,
      },
      labels: {
        colors: "#6B7280",
      },
      fontSize: "13px",
      fontFamily: "inherit",
      itemMargin: { horizontal: 16 },
    },

    tooltip: {
      shared: true,
      intersect: false,
      style: { fontSize: "12px", fontFamily: "inherit" },
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        const month = w.globals.labels[dataPointIndex];
        const subscriptions = series[0][dataPointIndex];
        const orders = series[1][dataPointIndex];
        return `
          <div style="
            background: #fff;
            border: 1px solid #E5E7EB;
            border-radius: 8px;
            padding: 10px 14px;
            font-family: inherit;
            font-size: 13px;
            color: #111827;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            min-width: 160px;
          ">
            <div style="font-weight: 600; margin-bottom: 6px; color: #111827;">${month}</div>
            <div style="color: #6B7280; margin-bottom: 3px;">
              Subscriptions: <span style="font-weight: 600; color: #111827;">${subscriptions.toLocaleString()}</span>
            </div>
            <div style="color: #6B7280;">
              Orders: <span style="font-weight: 600; color: #111827;">${orders.toLocaleString()}</span>
            </div>
          </div>
        `;
      },
    },
  };

  const series = [
    {
      name: "Subscriptions",
      data: [7800, 8800, 3200, 4000, 8200, 7200],
    },
    {
      name: "Orders",
      data: [2800, 4200, 2200, 1800, 3200, 2600],
    },
  ];

  return (
    <div
      className="w-full bg-white border border-gray-200 rounded-xl box-border mb-6"
      style={{ padding: "20px 20px 8px 20px" }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <p className="m-0 text-sm font-semibold text-gray-900">
          Store Orders vs Subscriptions
        </p>
        <span className="text-xs text-indigo-500 cursor-pointer font-medium">
          → Growth
        </span>
      </div>

      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={290}
      />
    </div>
  );
}