import React, { useState, useEffect, useRef } from "react";

const products = [
  { key: 1, product: "Creation Story – Genesis Curriculum", price: "$320", quantity: 18, disabled: false },
  { key: 2, product: "Noah's Ark – Faith and Trust Curriculu...", price: "$275", quantity: 16, disabled: true },
  { key: 3, product: "Story of Jonah – Obedience Curriculu...", price: "$310", quantity: 15, disabled: false },
  { key: 4, product: "Birth of Jesus – The Gift of Love Curr...", price: "$289", quantity: 13, disabled: true },
  { key: 5, product: "Story of Esther – Courage and Loyalty...", price: "$285", quantity: 12, disabled: false },
];

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

const ImagePlaceholder = () => (
  <div style={{
    width: 26, height: 26,
    borderRadius: 6,
    background: "rgba(0,0,0,0.08)",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, overflow: "hidden",
  }}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  </div>
);

export default function Top5SellingProducts() {
  const [period, setPeriod] = useState("12months");

  return (
    <div className="flex-1 min-w-0 rounded-xl border border-gray-200 p-5 bg-white flex flex-col gap-4 box-border">

      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0 flex-wrap gap-2">
        <span className="text-base font-semibold text-gray-900">
          Top 5 Selling Products
        </span>
        <CustomSelect value={period} onChange={setPeriod} options={selectOptions} />
      </div>

      {/* Column Headers */}
      <div className="flex items-center border-b border-gray-200 pb-2 flex-shrink-0">
        <div className="flex-1 text-xs font-semibold text-gray-900">Product</div>
        <div className="w-24 sm:w-20 lg:w-24 text-xs font-semibold text-gray-900 px-2 flex items-center justify-center flex-shrink-0">
          Price
        </div>
        <div className="w-20 sm:w-14 lg:w-20 text-xs font-semibold text-gray-900 pr-2 text-right flex-shrink-0">
          Quantity
        </div>
      </div>

      {/* Rows */}
      <div className="flex flex-col flex-1">
        {products.map((item) => (
          <div
            key={item.key}
            className={`flex items-center border-b border-gray-100 ${item.disabled ? "bg-black/[0.02]" : "bg-transparent"}`}
          >
            {/* Product */}
            <div className="flex-1 h-11 sm:h-[52px] lg:h-[60px] flex items-center gap-2 py-2 min-w-0">
              <ImagePlaceholder />
              <span className="text-[13px] text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap flex-1">
                {item.product}
              </span>
            </div>

            {/* Price */}
            <div className="w-24 sm:w-20 lg:w-24 h-11 sm:h-[52px] lg:h-[60px] flex items-center justify-center text-[13px] text-gray-900 px-2 flex-shrink-0">
              {item.price}
            </div>

            {/* Quantity */}
            <div className="w-20 sm:w-14 lg:w-20 h-11 sm:h-[52px] lg:h-[60px] flex items-center justify-end text-[13px] text-gray-900 border-t border-b border-gray-100 pr-2 flex-shrink-0">
              {item.quantity}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}