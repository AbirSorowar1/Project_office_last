import React, { useState } from "react";
import { Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import NumImg from "./num.png";

const products = [
  { key: 1, product: "Creation Story – Genesis Curriculum", price: "$320", quantity: 18, disabled: false },
  { key: 2, product: "Noah's Ark – Faith and Trust Curriculu...", price: "$275", quantity: 16, disabled: true },
  { key: 3, product: "Story of Jonah – Obedience Curriculu...", price: "$310", quantity: 15, disabled: false },
  { key: 4, product: "Birth of Jesus – The Gift of Love Curr...", price: "$289", quantity: 13, disabled: true },
  { key: 5, product: "Story of Esther – Courage and Loyalty...", price: "$285", quantity: 12, disabled: false },
];

export default function Top5SellingProducts() {
  const [period, setPeriod] = useState("12months");

  return (
    <div className="flex-1 min-w-0 rounded-xl border border-gray-200 p-5 bg-white flex flex-col gap-4 box-border">

      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0 flex-wrap gap-2">
        <span className="text-base font-semibold text-gray-900">
          Top 5 Selling Products
        </span>
        <Select
          value={period}
          onChange={setPeriod}
          size="small"
          suffixIcon={<DownOutlined className="text-xs text-gray-700" />}
          className="!w-36 !h-8 bg-gray-100"
          options={[
            { value: "12months", label: "Last 12 months" },
            { value: "6months", label: "Last 6 months" },
            { value: "3months", label: "Last 3 months" },
          ]}
        />
      </div>

      {/* Column Headers */}
      <div className="flex items-center border-b border-gray-200 pb-2 flex-shrink-0">
        <div className="flex-1 text-xs font-semibold text-gray-900">Product</div>
        <div className="w-24 sm:w-20 lg:w-24 text-xs font-semibold text-gray-900 border-r border-gray-200 px-2 flex items-center justify-center flex-shrink-0">
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
              <div className="w-[26px] h-[26px] rounded-md bg-black/[0.08] flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img
                  src={NumImg}
                  alt={`${item.key}`}
                  className="w-4 h-4 object-contain"
                />
              </div>
              <span className="text-[13px] text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap flex-1">
                {item.product}
              </span>
            </div>

            {/* Price */}
            <div className="w-24 sm:w-20 lg:w-24 h-11 sm:h-[52px] lg:h-[60px] flex items-center justify-center text-[13px] text-gray-900 border-r border-gray-200 px-2 flex-shrink-0">
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