import React from "react";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

export function MetricCard({ img, iconBg, title, value, change, changeLabel, positive }) {
    return (
        <div
            className="flex-1 min-w-0 max-w-full bg-white border border-gray-200 rounded-lg flex flex-col justify-between overflow-hidden box-border"
            style={{
                padding: "clamp(8px, 0.85vw, 16px)",
                height: "clamp(90px, 9.5vw, 146px)",
            }}
        >
            {/* Top group — icon + title + value */}
            <div
                className="flex items-center min-w-0 overflow-hidden"
                style={{ gap: "clamp(5px, 0.6vw, 12px)" }}
            >
                {/* Icon box */}
                <div
                    className="flex items-center justify-center shrink-0"
                    style={{
                        width: "clamp(28px, 3.2vw, 60px)",
                        height: "clamp(28px, 3.2vw, 60px)",
                        minWidth: "clamp(28px, 3.2vw, 60px)",
                        borderRadius: "clamp(5px, 0.4vw, 10px)",
                        background: iconBg,
                    }}
                >
                    <img
                        src={img}
                        alt={title}
                        className="object-contain"
                        style={{ width: "56%", height: "56%" }}
                    />
                </div>

                {/* Title + Value */}
                <div className="flex flex-col min-w-0 flex-1 overflow-hidden" style={{ gap: 1 }}>
                    <span
                        className="block truncate"
                        style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 600,
                            fontSize: 14,          // same as sidebar
                            lineHeight: "22px",
                            color: "rgba(0, 0, 0, 0.48)", // <-- updated color
                        }}
                    >
                        {title}
                    </span>
                    <span
                        className="block font-semibold truncate"
                        style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 600,
                            fontSize: 14,          // same as sidebar
                            lineHeight: "22px",
                            color: "#111827",
                        }}
                    >
                        {value}
                    </span>
                </div>
            </div>

            {/* Bottom — change */}
            <div
                className="flex items-center min-w-0 overflow-hidden shrink-0"
                style={{ gap: "clamp(4px, 0.5vw, 10px)" }}
            >
                <span
                    className="inline-flex items-center shrink-0 font-semibold whitespace-nowrap"
                    style={{
                        gap: 3,
                        fontSize: "clamp(12px, 1vw, 20px)",
                        color: positive ? "#10B981" : "#EF4444",
                    }}
                >
                    {positive ? (
                        <ArrowUpOutlined style={{ fontSize: "clamp(10px, 0.8vw, 16px)" }} />
                    ) : (
                        <ArrowDownOutlined style={{ fontSize: "clamp(10px, 0.8vw, 16px)" }} />
                    )}
                    {change}
                </span>

                {changeLabel && (
                    <span
                        className="text-gray-400 truncate"
                        style={{ fontSize: "clamp(11px, 0.9vw, 18px)" }}
                    >
                        {changeLabel}
                    </span>
                )}
            </div>
        </div>
    );
}