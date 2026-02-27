import { useState, useRef, useEffect } from "react";

const PRESETS = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "thisweek", label: "This Week" },
  { value: "lastweek", label: "Last Week" },
  { value: "thismonth", label: "This Month" },
  { value: "lastmonth", label: "Last Month" },
  { value: "custom", label: "Custom" },
];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  // 0=Sun..6=Sat, convert to Mo=0
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function Calendar({ onSelect }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState(today.getDate());

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const prevMonthDays = getDaysInMonth(viewYear, viewMonth - 1);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push({ day: prevMonthDays - firstDay + 1 + i, other: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, other: false });
  }
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, other: true });
  }

  const isToday = (d, other) => !other && d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

  return (
    <div style={{ padding: "12px 14px", minWidth: 230 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", gap: 2 }}>
          <NavBtn onClick={() => { setViewMonth(0); setViewYear(y => y - 1); }}>«</NavBtn>
          <NavBtn onClick={prevMonth}>‹</NavBtn>
        </div>
        <span style={{ fontWeight: 600, fontSize: 14, color: "#1a1a1a" }}>
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <div style={{ display: "flex", gap: 2 }}>
          <NavBtn onClick={nextMonth}>›</NavBtn>
          <NavBtn onClick={() => { setViewMonth(11); setViewYear(y => y + 1); }}>»</NavBtn>
        </div>
      </div>

      {/* Day headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", marginBottom: 4 }}>
        {DAYS.map(d => (
          <div key={d} style={{ fontSize: 12, fontWeight: 600, color: "#888", padding: "2px 0" }}>{d}</div>
        ))}
      </div>

      {/* Cells */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", gap: "2px 0" }}>
        {cells.map((cell, i) => {
          const isSel = !cell.other && cell.day === selected && viewMonth === viewMonth;
          const isT = isToday(cell.day, cell.other);
          return (
            <div
              key={i}
              onClick={() => {
                if (!cell.other) {
                  setSelected(cell.day);
                  onSelect && onSelect(new Date(viewYear, viewMonth, cell.day));
                }
              }}
              style={{
                width: 30, height: 28, lineHeight: "28px", margin: "0 auto",
                borderRadius: "50%",
                fontSize: 13,
                cursor: cell.other ? "default" : "pointer",
                color: cell.other ? "#ccc" : isSel ? "#fff" : "#222",
                backgroundColor: isSel ? "#1677ff" : isT && !isSel ? "#e6f0ff" : "transparent",
                fontWeight: isSel || isT ? 600 : 400,
                transition: "background 0.15s",
              }}
              onMouseEnter={e => { if (!cell.other && !isSel) e.currentTarget.style.backgroundColor = "#f0f0f0"; }}
              onMouseLeave={e => { if (!cell.other && !isSel) e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              {cell.day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NavBtn({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        border: "none", background: "none", cursor: "pointer",
        color: "#555", fontSize: 14, padding: "2px 5px", borderRadius: 4,
        lineHeight: 1,
      }}
    >{children}</button>
  );
}

export default function DateFilter() {
  const [selected, setSelected] = useState("6months");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selectedLabel = PRESETS.find(p => p.value === selected)?.label || "Last 6 months";

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block", fontFamily: "system-ui, sans-serif" }}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "8px 14px", border: "1px solid #d9d9d9",
          borderRadius: 8, background: "#fff", cursor: "pointer",
          fontSize: 14, color: "#1a1a1a", fontWeight: 500,
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          minWidth: 144,
        }}
      >
        <span style={{ flex: 1, textAlign: "left" }}>{selectedLabel}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 4l4 4 4-4" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0,
          background: "#fff", borderRadius: 10,
          boxShadow: "0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
          display: "flex", zIndex: 1000, overflow: "hidden",
          border: "1px solid #f0f0f0",
        }}>
          {/* Left sidebar */}
          <div style={{ width: 130, borderRight: "1px solid #f0f0f0", padding: "8px 0" }}>
            {PRESETS.map(p => (
              <div
                key={p.value}
                onClick={() => { setSelected(p.value); if (p.value !== "custom") setOpen(false); }}
                style={{
                  padding: "7px 16px",
                  fontSize: 13.5,
                  cursor: "pointer",
                  borderRadius: 6,
                  margin: "1px 6px",
                  color: selected === p.value ? "#1677ff" : "#333",
                  backgroundColor: selected === p.value ? "#e8f0fe" : "transparent",
                  fontWeight: selected === p.value ? 600 : 400,
                  transition: "background 0.1s",
                }}
                onMouseEnter={e => { if (selected !== p.value) e.currentTarget.style.backgroundColor = "#f7f7f7"; }}
                onMouseLeave={e => { if (selected !== p.value) e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                {p.label}
              </div>
            ))}
          </div>

          {/* Calendar */}
          <Calendar onSelect={(date) => {
            setSelected("custom");
            // You can lift this date up via a prop callback
          }} />
        </div>
      )}
    </div>
  );
}