import React, { useState, useEffect } from "react";
import { Menu, Input, Avatar, Tooltip } from "antd";
import {
  AppstoreOutlined, CreditCardOutlined, ShoppingOutlined,
  InboxOutlined, BookOutlined, StarOutlined, ReadOutlined,
  UserOutlined, ContainerOutlined, TagOutlined,
  BarChartOutlined, SettingOutlined, SearchOutlined,
} from "@ant-design/icons";
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

const menuItems = [
  {
    key: "main-group", type: "group", label: groupLabel("Main"),
    children: [
      { key: "dashboard", icon: <AppstoreOutlined />, label: navLabel("Dashboard") },
      { key: "subscriptions", icon: <CreditCardOutlined />, label: navLabel("Subscriptions"), children: [{ key: "sub-active", label: "Active" }, { key: "sub-cancelled", label: "Cancelled" }] },
      { key: "orders", icon: <ShoppingOutlined />, label: navLabel("Orders"), children: [{ key: "orders-all", label: "All Orders" }, { key: "orders-pending", label: "Pending" }] },
      { key: "products", icon: <InboxOutlined />, label: navLabel("Products"), children: [{ key: "products-all", label: "All Products" }, { key: "products-add", label: "Add Product" }] },
      { key: "bible-stories", icon: <BookOutlined />, label: navLabel("Bible Stories"), children: [{ key: "bible-all", label: "All Stories" }] },
      { key: "vbsify", icon: <StarOutlined />, label: navLabel("VBSify Series"), children: [{ key: "vbs-all", label: "All Series" }] },
      { key: "handbooks", icon: <ReadOutlined />, label: navLabel("Teacher Handbooks"), children: [{ key: "handbook-all", label: "All Handbooks" }] },
      { key: "customers", icon: <UserOutlined />, label: navLabel("Customers"), children: [{ key: "customers-all", label: "All Customers" }] },
      { key: "subscription-plans", icon: <ContainerOutlined />, label: navLabel("Subscription Plans"), children: [{ key: "plans-all", label: "All Plans" }] },
      { key: "promotions", icon: <TagOutlined />, label: navLabel("Promotions"), children: [{ key: "promo-all", label: "All Promotions" }] },
    ],
  },
  {
    key: "essentials-group", type: "group", label: groupLabel("Essentials"),
    children: [
      { key: "reports", icon: <BarChartOutlined />, label: navLabel("Reports"), children: [{ key: "reports-sales", label: "Sales" }, { key: "reports-orders", label: "Orders" }] },
      { key: "settings", icon: <SettingOutlined />, label: navLabel("Settings"), children: [{ key: "settings-general", label: "General" }, { key: "settings-account", label: "Account" }] },
    ],
  },
];

// Collapsed menu — only icons with tooltip
const collapsedItems = [
  { key: "dashboard", icon: <Tooltip title="Dashboard" placement="right"><AppstoreOutlined className="text-base" /></Tooltip> },
  { key: "subscriptions", icon: <Tooltip title="Subscriptions" placement="right"><CreditCardOutlined className="text-base" /></Tooltip> },
  { key: "orders", icon: <Tooltip title="Orders" placement="right"><ShoppingOutlined className="text-base" /></Tooltip> },
  { key: "products", icon: <Tooltip title="Products" placement="right"><InboxOutlined className="text-base" /></Tooltip> },
  { key: "bible-stories", icon: <Tooltip title="Bible Stories" placement="right"><BookOutlined className="text-base" /></Tooltip> },
  { key: "vbsify", icon: <Tooltip title="VBSify Series" placement="right"><StarOutlined className="text-base" /></Tooltip> },
  { key: "handbooks", icon: <Tooltip title="Teacher Handbooks" placement="right"><ReadOutlined className="text-base" /></Tooltip> },
  { key: "customers", icon: <Tooltip title="Customers" placement="right"><UserOutlined className="text-base" /></Tooltip> },
  { key: "subscription-plans", icon: <Tooltip title="Subscription Plans" placement="right"><ContainerOutlined className="text-base" /></Tooltip> },
  { key: "promotions", icon: <Tooltip title="Promotions" placement="right"><TagOutlined className="text-base" /></Tooltip> },
  { key: "reports", icon: <Tooltip title="Reports" placement="right"><BarChartOutlined className="text-base" /></Tooltip> },
  { key: "settings", icon: <Tooltip title="Settings" placement="right"><SettingOutlined className="text-base" /></Tooltip> },
];

export default function Sidebar() {
  const [selectedKeys, setSelectedKeys] = useState(["dashboard"]);
  const [collapsed, setCollapsed] = useState(window.innerWidth < COLLAPSE_BREAKPOINT);

  // Auto collapse/expand on window resize
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < COLLAPSE_BREAKPOINT);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── COLLAPSED (icon-only, width 72px) ──
  if (collapsed) {
    return (
      <div
        className="flex flex-col justify-between bg-white border-r border-gray-200 min-h-screen box-border py-4"
        style={{ width: 72, flexShrink: 0, transition: "width 0.2s ease" }}
      >
        <div>
          {/* Logo icon only */}
          <div className="flex justify-center mb-5">
            <img src={Logo} alt="Logo" className="object-contain" style={{ width: 32, height: 32 }} />
          </div>

          {/* Icon-only menu */}
          <Menu
            mode="inline"
            inlineCollapsed={true}
            selectedKeys={selectedKeys}
            onSelect={({ key }) => setSelectedKeys([key])}
            items={collapsedItems}
            style={{ border: "none", background: "transparent" }}
          />
        </div>

        {/* User avatar only */}
        <div className="flex justify-center pb-2">
          <Tooltip title="Arghyafra/Nilay — Manager" placement="right">
            <Avatar size={32} style={{ backgroundColor: "#4F46E5", fontWeight: 700, fontSize: 11, cursor: "pointer" }}>
              AN
            </Avatar>
          </Tooltip>
        </div>
      </div>
    );
  }

  // ── EXPANDED (full, width 280px) ──
  return (
    <div
      className="flex flex-col justify-between bg-white border-r border-gray-200 min-h-screen pt-4 pb-6 px-4 box-border"
      style={{ width: 280, flexShrink: 0, transition: "width 0.2s ease" }}
    >
      <div>
        {/* Logo */}
        <div className="flex items-center justify-between mb-5 px-1.5">
          <img src={Logo} alt="Logo" className="object-contain" style={{ width: 48.37, height: 32 }} />
          <img
            src={DockIcon}
            alt="Dock"
            style={{ width: 24, height: 24, opacity: 1, transform: "rotate(0deg)", cursor: "pointer" }}
          />
        </div>

        {/* Search */}
        <div className="mb-4">
          <Input
            prefix={<SearchOutlined className="text-gray-400" />}
            placeholder="Search"
            className="rounded-lg bg-gray-50 border-gray-200 text-sm"
          />
        </div>

        {/* Full Menu */}
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          onSelect={({ key }) => setSelectedKeys([key])}
          items={menuItems}
          inlineIndent={16}
          className="border-none bg-transparent text-sm"
        />
      </div>

      {/* User */}
      <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50">
        <Avatar size={32} className="shrink-0 font-bold text-xs" style={{ backgroundColor: "#4F46E5" }}>AN</Avatar>
        <div>
          <p className="m-0 text-sm font-semibold text-gray-900 leading-tight">Arghyafra/Nilay</p>
          <p className="m-0 text-xs text-gray-400">Manager</p>
        </div>
      </div>
    </div>
  );
}