import React from "react";

const methods = [
  { label: "Credit / Debit Card", percent: 51, color: "#2563eb", patId: "pm-pat-0" },
  { label: "Mobile Wallet", percent: 20, color: "#818cf8", patId: "pm-pat-1" },
  { label: "Cash", percent: 7, color: "#6ebf91", patId: "pm-pat-2" },
  { label: "Gift Card", percent: 22, color: "#ffb84d", patId: "pm-pat-3" },
];

export default function PaymentMethods() {
  const total = methods.reduce((s, m) => s + m.percent, 0);
  const GAP = 3;
  const totalGaps = (methods.length - 1) * GAP;
  const availableWidth = 400 - totalGaps;
  const R = 8;
  const H = 80;

  let x = 0;
  const segments = methods.map((m, i) => {
    const w = (m.percent / total) * availableWidth;
    const rx = x;
    x += w + GAP;

    const isFirst = i === 0;
    const isLast = i === methods.length - 1;
    const tl = isFirst ? R : 2;
    const bl = isFirst ? R : 2;
    const tr = isLast ? R : 2;
    const br = isLast ? R : 2;

    const path = `
      M ${rx + tl},0
      H ${rx + w - tr}
      Q ${rx + w},0 ${rx + w},${tr}
      V ${H - br}
      Q ${rx + w},${H} ${rx + w - br},${H}
      H ${rx + bl}
      Q ${rx},${H} ${rx},${H - bl}
      V ${tl}
      Q ${rx},0 ${rx + tl},0 Z
    `;
    return { ...m, path };
  });

  return (
    <div
      className="flex-1 min-w-0 bg-white border border-gray-200 rounded-xl flex flex-col box-border p-6 overflow-hidden"
      style={{ height: "clamp(260px, 27vw, 400px)" }}
    >
      {/* Header */}
      <h2
        className="m-0 mb-4 font-bold"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          fontSize: 16,
          lineHeight: "28px",
          color: "#111827",
        }}
      >
        Payment Methods
      </h2>

      {/* SVG Stacked Bar */}
      <div className="shrink-0 w-full mt-8">
        <svg
          width="100%"
          viewBox="0 0 400 80"
          preserveAspectRatio="none"
          style={{ display: "block", overflow: "visible" }}
        >
          <defs>
            {segments.map((m) => (
              <pattern
                key={m.patId}
                id={m.patId}
                patternUnits="userSpaceOnUse"
                width="10"
                height="10"
                patternTransform="rotate(45 0 0)"
              >
                <rect width="10" height="10" fill={m.color} />
                <line
                  x1="5"
                  y1="0"
                  x2="5"
                  y2="10"
                  stroke="white"
                  strokeWidth="0.7"
                />
              </pattern>
            ))}
          </defs>

          {segments.map((m) => (
            <path key={m.patId} d={m.path} fill={`url(#${m.patId})`}>
              <title>{m.label} — {m.percent}%</title>
            </path>
          ))}
        </svg>
      </div>

      {/* Legend list */}
      <div className="flex flex-col gap-3 mt-4 flex-1 justify-center">
        {methods.map((m, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <svg width="16" height="16" style={{ flexShrink: 0, display: "block" }}>
                <rect width="16" height="16" rx="4" fill={m.color} />
              </svg>
              <span
                className="text-sm font-semibold"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#4B5563",
                }}
              >
                {m.label}
              </span>
            </div>
            <span
              className="text-sm font-bold"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "#111827",
              }}
            >
              {m.percent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}