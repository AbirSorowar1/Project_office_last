import React, { useState, useEffect, useRef } from "react";

// Import the JSON data
import jsonData from "../data.json";

const paddingXS = 8;

const selectOptions = [
  { value: "12months", label: "Last 12 months" },
  { value: "6months", label: "Last 6 months" },
  { value: "3months", label: "Last 3 months" },
];

function CustomSelect({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} style={{ position: "relative", width: 144, flexShrink: 0 }}>
      <button
        onClick={() => setOpen((p) => !p)}
        style={{
          width: "100%",
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 10px",
          border: "1px solid #E5E7EB",
          borderRadius: 8,
          background: "#F9FAFB",
          cursor: "pointer",
          fontSize: 13,
          color: "rgba(0,0,0,0.48)",
          boxSizing: "border-box",
          gap: 6,
        }}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {selected?.label}
        </span>
        <svg
          width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ flexShrink: 0, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 4px)",
          right: 0,
          width: "100%",
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          zIndex: 100,
          overflow: "hidden",
        }}>
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              style={{
                padding: "8px 12px",
                fontSize: 13,
                color: opt.value === value ? "#111827" : "rgba(0,0,0,0.48)",
                fontWeight: opt.value === value ? 600 : 400,
                background: opt.value === value ? "#F3F4F6" : "transparent",
                cursor: "pointer",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) => { if (opt.value !== value) e.currentTarget.style.background = "#F9FAFB"; }}
              onMouseLeave={(e) => { if (opt.value !== value) e.currentTarget.style.background = "transparent"; }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Top5SellingSubscriptionPlans() {
  const [period, setPeriod] = useState("12months");
  const [plans, setPlans] = useState([]);
  const [rowH, setRowH] = useState(60);
  const [freqW, setFreqW] = useState(100);
  const [qtyW, setQtyW] = useState(80);

  // Load data from JSON file based on selected period
  useEffect(() => {
    // Get data for the selected period from JSON
    const periodData = jsonData.topSellingSubscriptionPlans[period];
    setPlans(periodData);
  }, [period]);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setRowH(44); setFreqW(70); setQtyW(56);
      } else if (w < 1024) {
        setRowH(52); setFreqW(84); setQtyW(68);
      } else {
        setRowH(60); setFreqW(100); setQtyW(80);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div style={{
      flex: 1, minWidth: 0,
      borderRadius: 12, border: "1px solid #E5E7EB",
      padding: 20, background: "#fff",
      boxSizing: "border-box",
      display: "flex", flexDirection: "column", gap: 16,
    }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, flexWrap: "wrap", gap: 8 }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: "#111827" }}>
          Top 5 Selling Subscription Plans
        </span>
        <CustomSelect value={period} onChange={setPeriod} options={selectOptions} />
      </div>

      {/* Column Headers */}
      <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #E5E7EB", paddingBottom: 8, flexShrink: 0 }}>
        <div style={{ flex: 1, fontSize: 12, fontWeight: 600, color: "#111827" }}>Plan</div>
        <div style={{
          width: freqW, fontSize: 12, fontWeight: 600, color: "#111827",
          paddingLeft: paddingXS, paddingRight: paddingXS,
          textAlign: "right", flexShrink: 0,
        }}>Frequency</div>
        <div style={{
          width: qtyW, fontSize: 12, fontWeight: 600, color: "#111827",
          paddingRight: paddingXS, textAlign: "right", flexShrink: 0,
        }}>Quantity</div>
      </div>

      {/* Rows - Show only first 5 items */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {plans.slice(0, 5).map((item) => (
          <div
            key={item.key}
            style={{
              display: "flex", alignItems: "center",
              borderBottom: "0.5px solid #F3F4F6",
              background: item.disabled ? "rgba(0, 0, 0, 0.02)" : "transparent",
            }}
          >
            {/* Plan name */}
            <div style={{
              flex: 1, height: rowH,
              display: "flex", alignItems: "center",
              paddingTop: paddingXS, paddingBottom: paddingXS,
              minWidth: 0,
            }}>
              <span style={{ fontSize: 13, color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {item.plan}
              </span>
            </div>

            {/* Frequency */}
            <div style={{
              width: freqW, height: rowH,
              display: "flex", alignItems: "center", justifyContent: "flex-end",
              fontSize: 13, fontWeight: 500, color: "#111827",
              paddingLeft: paddingXS, paddingRight: paddingXS,
              flexShrink: 0,
            }}>
              {item.frequency}
            </div>

            {/* Quantity */}
            <div style={{
              width: qtyW, height: rowH,
              display: "flex", alignItems: "center", justifyContent: "flex-end",
              fontSize: 13, color: "#111827",
              borderTop: "1px solid #F3F4F6", borderBottom: "1px solid #F3F4F6",
              paddingRight: paddingXS, flexShrink: 0,
            }}>
              {item.quantity}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}