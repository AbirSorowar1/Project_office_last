import React, { useState, useEffect } from "react";
import { Menu, Input, Avatar, Tooltip } from "antd";
import { AppstoreOutlined, SearchOutlined } from "@ant-design/icons";
import Logo from "./Logo.png";
import DockIcon from "./dock_to_right.png";

// ── breakpoint: sidebar collapses below this width ──
const COLLAPSE_BREAKPOINT = 1280;

const navLabel = (text) => (
  <span className="inline-block whitespace-nowrap" style={{ width: 130, height: 22, lineHeight: "22px" }}>
    {text}
  </span>
);

const groupLabel = (text) => (
  <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase">{text}</span>
);

// ── Corrected imports ──
import SubscriptionsImg from "./components/Subscriptions.png";
import OrdersImg from "./components/Orders.png";
import ProductsImg from "./components/Products.png";
import BibleStoriesImg from "./components/BibleStories.png";
import VBSifySeriesImg from "./components/VBSifySeries.png";
import TeacherHandbooksImg from "./components/TeacherHandbooks.png";
import CustomersImg from "./components/Customers.png";
import SubscriptionPlansImg from "./components/SubscriptionPlans.png";
import PromotionsImg from "./components/Promotions.png";
import ReportsImg from "./components/Reports.png";
import SettingsImg from "./components/settings.png";

const collapsedItems = [
  { key: "dashboard", icon: <Tooltip title="Dashboard" placement="right"><AppstoreOutlined className="text-base" /></Tooltip> },
  { key: "subscriptions", icon: <Tooltip title="Subscriptions" placement="right"><img src={SubscriptionsImg} alt="Subscriptions" className="w-5 h-5 object-contain" /></Tooltip> },
  { key: "orders", icon: <Tooltip title="Orders" placement="right"><img src={OrdersImg} alt="Orders" className="w-5 h-5 object-contain" /></Tooltip> },
  { key: "products", icon: <Tooltip title="Products" placement="right"><img src={ProductsImg} alt="Products" className="w-5 h-5 object-contain" /></Tooltip> },
  { key: "bible-stories", icon: <Tooltip title="Bible Stories" placement="right"><img src={BibleStoriesImg} alt="Bible Stories" className="w-5 h-5 object-contain" /></Tooltip> },
  { key: "vbsify", icon: <Tooltip title="VBSify Series" placement="right"><img src={VBSifySeriesImg} alt="VBSify Series" className="w-5 h-5 object-contain" /></Tooltip> },
  { key: "handbooks", icon: <Tooltip title="Teacher Handbooks" placement="right"><img src={TeacherHandbooksImg} alt="Teacher Handbooks" className="w-5 h-5 object-contain" /></Tooltip> },
  { key: "customers", icon: <Tooltip title="Customers" placement="right"><img src={CustomersImg} alt="Customers" className="w-5 h-5 object-contain" /></Tooltip> },
  { key: "subscription-plans", icon: <Tooltip title="Subscription Plans" placement="right"><img src={SubscriptionPlansImg} alt="Subscription Plans" className="w-5 h-5 object-contain" /></Tooltip> },
  { key: "promotions", icon: <Tooltip title="Promotions" placement="right"><img src={PromotionsImg} alt="Promotions" className="w-5 h-5 object-contain" /></Tooltip> },
  { key: "reports", icon: <Tooltip title="Reports" placement="right"><img src={ReportsImg} alt="Reports" className="w-5 h-5 object-contain" /></Tooltip> },
  { key: "settings", icon: <Tooltip title="Settings" placement="right"><img src={SettingsImg} alt="Settings" className="w-5 h-5 object-contain" /></Tooltip> },
];

const menuItems = [
  {
    key: "main-group", type: "group", label: groupLabel("Main"),
    children: [
      { key: "dashboard", icon: <AppstoreOutlined />, label: navLabel("Dashboard") },
      { key: "subscriptions", icon: <img src={SubscriptionsImg} alt="Subscriptions" className="w-5 h-5 object-contain" />, label: navLabel("Subscriptions"), children: [{ key: "sub-active", label: "Active" }, { key: "sub-cancelled", label: "Cancelled" }] },
      { key: "orders", icon: <img src={OrdersImg} alt="Orders" className="w-5 h-5 object-contain" />, label: navLabel("Orders"), children: [{ key: "orders-all", label: "All Orders" }, { key: "orders-pending", label: "Pending" }] },
      { key: "products", icon: <img src={ProductsImg} alt="Products" className="w-5 h-5 object-contain" />, label: navLabel("Products"), children: [{ key: "products-all", label: "All Products" }, { key: "products-add", label: "Add Product" }] },
      { key: "bible-stories", icon: <img src={BibleStoriesImg} alt="Bible Stories" className="w-5 h-5 object-contain" />, label: navLabel("Bible Stories"), children: [{ key: "bible-all", label: "All Stories" }] },
      { key: "vbsify", icon: <img src={VBSifySeriesImg} alt="VBSify Series" className="w-5 h-5 object-contain" />, label: navLabel("VBSify Series"), children: [{ key: "vbs-all", label: "All Series" }] },
      { key: "handbooks", icon: <img src={TeacherHandbooksImg} alt="Teacher Handbooks" className="w-5 h-5 object-contain" />, label: navLabel("Teacher Handbooks"), children: [{ key: "handbook-all", label: "All Handbooks" }] },
      { key: "customers", icon: <img src={CustomersImg} alt="Customers" className="w-5 h-5 object-contain" />, label: navLabel("Customers"), children: [{ key: "customers-all", label: "All Customers" }] },
      { key: "subscription-plans", icon: <img src={SubscriptionPlansImg} alt="Subscription Plans" className="w-5 h-5 object-contain" />, label: navLabel("Subscription Plans"), children: [{ key: "plans-all", label: "All Plans" }] },
      { key: "promotions", icon: <img src={PromotionsImg} alt="Promotions" className="w-5 h-5 object-contain" />, label: navLabel("Promotions"), children: [{ key: "promo-all", label: "All Promotions" }] },
    ],
  },
  {
    key: "essentials-group", type: "group", label: groupLabel("Essentials"),
    children: [
      { key: "reports", icon: <img src={ReportsImg} alt="Reports" className="w-5 h-5 object-contain" />, label: navLabel("Reports"), children: [{ key: "reports-sales", label: "Sales" }, { key: "reports-orders", label: "Orders" }] },
      { key: "settings", icon: <img src={SettingsImg} alt="Settings" className="w-5 h-5 object-contain" />, label: navLabel("Settings"), children: [{ key: "settings-general", label: "General" }, { key: "settings-account", label: "Account" }] },
    ],
  },
];

export default function Sidebar() {
  const [selectedKeys, setSelectedKeys] = useState(["dashboard"]);
  const [collapsed, setCollapsed] = useState(window.innerWidth < COLLAPSE_BREAKPOINT);

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < COLLAPSE_BREAKPOINT);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── COLLAPSED ──
  if (collapsed) {
    return (
      <div
        className="flex flex-col justify-between bg-white border-r border-gray-200 min-h-screen box-border py-4"
        style={{ width: 72, flexShrink: 0, transition: "width 0.2s ease" }}
      >
        <div>
          <div className="flex justify-center mb-5">
            <img src={Logo} alt="Logo" className="object-contain" style={{ width: 32, height: 32 }} />
          </div>

          <Menu
            mode="inline"
            inlineCollapsed={true}
            selectedKeys={selectedKeys}
            onSelect={({ key }) => setSelectedKeys([key])}
            items={collapsedItems}
            style={{ border: "none", background: "transparent" }}
          />
        </div>

        <div className="flex justify-center pb-2">
          <Tooltip title="ArghyaRaj Niloy — Manager" placement="right">
            <Avatar
              size={40}
              className="bg-[#E5E7EB] text-[#4B5563] flex items-center justify-center font-bold border-none cursor-pointer"
            >
              AN
            </Avatar>
          </Tooltip>
        </div>
      </div>
    );
  }

  // ── EXPANDED ──
  return (
    <div
      className="flex flex-col justify-between bg-white border-r border-gray-200 min-h-screen pt-4 pb-6 px-4 box-border"
      style={{ width: 280, flexShrink: 0, transition: "width 0.2s ease" }}
    >
      <div>
        <div className="flex items-center justify-between mb-5 px-1.5">
          <img src={Logo} alt="Logo" className="object-contain" style={{ width: 48.37, height: 32 }} />
          <img
            src={DockIcon}
            alt="Dock"
            style={{ width: 24, height: 24, opacity: 1, cursor: "pointer" }}
          />
        </div>

        <div className="mb-4">
          <Input
            prefix={<SearchOutlined className="text-gray-400" />}
            placeholder="Search"
            className="rounded-lg bg-gray-50 border-gray-200 text-sm"
          />
        </div>

        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          onSelect={({ key }) => setSelectedKeys([key])}
          items={menuItems}
          inlineIndent={16}
          className="border-none bg-transparent text-sm"
        />
      </div>

      {/* User Section - Updated to match Image Style */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-white">
        <Avatar
          size={48}
          className="bg-[#E5E7EB] text-[#4B5563] flex items-center justify-center font-bold text-sm border-none shrink-0"
        >
          AN
        </Avatar>
        <div className="flex flex-col">
          <h2 className="text-[12px] font-bold text-[#1F2937] leading-tight m-0">
            ArghyaRaj Niloy
          </h2>
          <p className="text-[12px] text-[#9CA3AF] font-normal m-0">
            Manager
          </p>
        </div>
      </div>
    </div>
  );
}