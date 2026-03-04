import React, { useState, useEffect } from "react";
import { Menu, Input, Avatar, Tooltip } from "antd";
import { AppstoreOutlined, SearchOutlined } from "@ant-design/icons";
import Logo from "./Logo.png";
import DockIcon from "./dock_to_right.png";

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

const COLLAPSE_BREAKPOINT = 1280;

// ── Nav Icon
const NavIcon = ({ src, alt }) => (
  <span className="inline-flex items-center justify-center w-[22px] h-[22px]">
    <img src={src} alt={alt} className="object-contain" style={{ width: 16, height: 14 }} />
  </span>
);

// ── Fixed-width nav label with new font
const navLabel = (text) => (
  <span
    className="inline-block"
    style={{
      width: 130,
      height: 22,
      lineHeight: "22px",
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 600,
      fontSize: 14,
      color: "#1F2937", // slightly darker text
      verticalAlign: "middle",
    }}
  >
    {text}
  </span>
);

// ── Group label
const GroupLabel = ({ text }) => (
  <span
    className="text-[11px] font-semibold text-gray-400 tracking-widest uppercase"
    style={{ width: 32, height: 20, display: "inline-block" }}
  >
    {text}
  </span>
);

// ── Collapsed items
const collapsedItems = [
  { key: "dashboard", icon: <Tooltip title="Dashboard" placement="right"><AppstoreOutlined style={{ fontSize: 16 }} /></Tooltip> },
  { key: "subscriptions", icon: <Tooltip title="Subscriptions" placement="right"><NavIcon src={SubscriptionsImg} alt="Subscriptions" /></Tooltip> },
  { key: "orders", icon: <Tooltip title="Orders" placement="right"><NavIcon src={OrdersImg} alt="Orders" /></Tooltip> },
  { key: "products", icon: <Tooltip title="Products" placement="right"><NavIcon src={ProductsImg} alt="Products" /></Tooltip> },
  { key: "bible-stories", icon: <Tooltip title="Bible Stories" placement="right"><NavIcon src={BibleStoriesImg} alt="Bible Stories" /></Tooltip> },
  { key: "vbsify", icon: <Tooltip title="VBSify Series" placement="right"><NavIcon src={VBSifySeriesImg} alt="VBSify Series" /></Tooltip> },
  { key: "handbooks", icon: <Tooltip title="Teacher Handbooks" placement="right"><NavIcon src={TeacherHandbooksImg} alt="Teacher Handbooks" /></Tooltip> },
  { key: "customers", icon: <Tooltip title="Customers" placement="right"><NavIcon src={CustomersImg} alt="Customers" /></Tooltip> },
  { key: "subscription-plans", icon: <Tooltip title="Subscription Plans" placement="right"><NavIcon src={SubscriptionPlansImg} alt="Subscription Plans" /></Tooltip> },
  { key: "promotions", icon: <Tooltip title="Promotions" placement="right"><NavIcon src={PromotionsImg} alt="Promotions" /></Tooltip> },
  { key: "reports", icon: <Tooltip title="Reports" placement="right"><NavIcon src={ReportsImg} alt="Reports" /></Tooltip> },
  { key: "settings", icon: <Tooltip title="Settings" placement="right"><NavIcon src={SettingsImg} alt="Settings" /></Tooltip> },
];

// ── MAIN group children
const mainChildren = [
  {
    key: "subscriptions",
    icon: <NavIcon src={SubscriptionsImg} alt="Subscriptions" />,
    label: navLabel("Subscriptions"),
    children: [{ key: "sub-active", label: "Active" }, { key: "sub-cancelled", label: "Cancelled" }],
  },
  {
    key: "orders",
    icon: <NavIcon src={OrdersImg} alt="Orders" />,
    label: navLabel("Orders"),
    children: [{ key: "orders-all", label: "All Orders" }, { key: "orders-pending", label: "Pending" }],
  },
  {
    key: "products",
    icon: <NavIcon src={ProductsImg} alt="Products" />,
    label: navLabel("Products"),
    children: [{ key: "products-all", label: "All Products" }, { key: "products-add", label: "Add Product" }],
  },
  {
    key: "bible-stories",
    icon: <NavIcon src={BibleStoriesImg} alt="Bible Stories" />,
    label: navLabel("Bible Stories"),
    children: [{ key: "bible-all", label: "All Stories" }],
  },
  {
    key: "vbsify",
    icon: <NavIcon src={VBSifySeriesImg} alt="VBSify Series" />,
    label: navLabel("VBSify Series"),
    children: [{ key: "vbs-all", label: "All Series" }],
  },
  {
    key: "handbooks",
    icon: <NavIcon src={TeacherHandbooksImg} alt="Teacher Handbooks" />,
    label: navLabel("Teacher Handbooks"),
    children: [{ key: "handbook-all", label: "All Handbooks" }],
  },
  {
    key: "customers",
    icon: <NavIcon src={CustomersImg} alt="Customers" />,
    label: navLabel("Customers"),
    children: [{ key: "customers-all", label: "All Customers" }],
  },
  {
    key: "subscription-plans",
    icon: <NavIcon src={SubscriptionPlansImg} alt="Subscription Plans" />,
    label: navLabel("Subscription Plans"),
    children: [{ key: "plans-all", label: "All Plans" }],
  },
  {
    key: "promotions",
    icon: <NavIcon src={PromotionsImg} alt="Promotions" />,
    label: navLabel("Promotions"),
    children: [{ key: "promo-all", label: "All Promotions" }],
  },
];

// ── Essentials group children
const essentialsChildren = [
  {
    key: "reports",
    icon: <NavIcon src={ReportsImg} alt="Reports" />,
    label: navLabel("Reports"),
    children: [{ key: "reports-sales", label: "Sales" }, { key: "reports-orders", label: "Orders" }],
  },
  {
    key: "settings",
    icon: <NavIcon src={SettingsImg} alt="Settings" />,
    label: navLabel("Settings"),
    children: [{ key: "settings-general", label: "General" }, { key: "settings-account", label: "Account" }],
  },
];

const groupedMenuItems = [
  {
    key: "main-group",
    type: "group",
    label: <GroupLabel text="Main" />,
    children: mainChildren,
  },
  {
    key: "essentials-group",
    type: "group",
    label: <GroupLabel text="Essentials" />,
    children: essentialsChildren,
  },
];

export default function Sidebar() {
  const [selectedKeys, setSelectedKeys] = useState(["dashboard"]);
  const [collapsed, setCollapsed] = useState(window.innerWidth < COLLAPSE_BREAKPOINT);

  useEffect(() => {
    const handleResize = () => setCollapsed(window.innerWidth < COLLAPSE_BREAKPOINT);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelect = ({ key }) => setSelectedKeys([key]);

  // ── COLLAPSED VIEW
  if (collapsed) {
    return (
      <div
        className="flex flex-col justify-between bg-white border-r border-gray-200 min-h-screen py-4 box-border"
        style={{ width: 72, flexShrink: 0, transition: "width 0.2s ease" }}
      >
        <div>
          <div className="flex justify-center mb-5">
            <img src={Logo} alt="Logo" className="object-contain w-8 h-8" />
          </div>
          <Menu
            mode="inline"
            inlineCollapsed={true}
            selectedKeys={selectedKeys}
            onSelect={handleSelect}
            items={collapsedItems}
            style={{ border: "none", background: "transparent" }}
          />
        </div>
        <div className="flex justify-center pb-2">
          <Tooltip title="ArghyaRaj Niloy — Manager" placement="right">
            <Avatar
              size={40}
              className="!bg-[#E5E7EB] !text-[#4B5563] font-bold cursor-pointer !border-none"
            >
              AN
            </Avatar>
          </Tooltip>
        </div>
      </div>
    );
  }

  // ── EXPANDED VIEW
  return (
    <div
      className="flex flex-col justify-between bg-white border-r border-gray-200 min-h-screen box-border"
      style={{
        width: 280,
        flexShrink: 0,
        paddingTop: 16,
        paddingRight: 16,
        paddingBottom: 24,
        paddingLeft: 16,
        transition: "width 0.2s ease",
      }}
    >
      {/* TOP SECTION */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-5" style={{ gap: 8 }}>
          <img
            src={Logo}
            alt="Logo"
            className="object-contain"
            style={{ width: 48.37, height: 32, paddingLeft: 6, paddingRight: 6 }}
          />
          <img
            src={DockIcon}
            alt="Dock"
            className="cursor-pointer"
            style={{ width: 24, height: 24 }}
          />
        </div>

        {/* Search */}
        <div className="mb-1">
          <Input
            prefix={<SearchOutlined className="text-gray-400" />}
            placeholder="Search"
            style={{
              width: 248,
              height: 40,
              borderRadius: 8,
              borderWidth: 1,
              borderStyle: "dashed",
              paddingLeft: 12,
              paddingRight: 12,
              background: "#F9FAFB",
              fontSize: 14,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              lineHeight: "22px",
            }}
          />
        </div>

        {/* Dashboard */}
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          onSelect={handleSelect}
          inlineIndent={12} // aligned with search icon
          style={{
            border: "none",
            background: "transparent",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: 14,
            lineHeight: "22px",
            color: "#1F2937",
            verticalAlign: "middle",
          }}
          items={[
            {
              key: "dashboard",
              icon: <AppstoreOutlined style={{ fontSize: 16 }} />,
              label: navLabel("Dashboard"),
            },
          ]}
        />

        {/* Grouped menu */}
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          onSelect={handleSelect}
          items={groupedMenuItems}
          inlineIndent={16}
          style={{
            border: "none",
            background: "transparent",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: 14,
            lineHeight: "22px",
            color: "#1F2937",
            verticalAlign: "middle",
          }}
        />
      </div>

      {/* USER SECTION */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-white">
        <Avatar
          size={48}
          className="!bg-[#E5E7EB] !text-[#4B5563] font-bold text-xs !border-none shrink-0"
        >
          AN
        </Avatar>
        <div className="flex flex-col">
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: 12,
              lineHeight: "22px",
              color: "#1F2937",
            }}
          >
            ArghyaRaj Niloy
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: 12,
              lineHeight: "22px",
              color: "#9CA3AF",
            }}
          >
            Manager
          </span>
        </div>
      </div>
    </div>
  );
}