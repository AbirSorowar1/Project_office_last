import React, { useState } from "react";
import { Menu, Input, Avatar, Drawer, Button } from "antd";
import {
  AppstoreOutlined, CreditCardOutlined, ShoppingOutlined,
  InboxOutlined, BookOutlined, StarOutlined, ReadOutlined,
  UserOutlined, ContainerOutlined, TagOutlined,
  BarChartOutlined, SettingOutlined, SearchOutlined, MenuOutlined,
} from "@ant-design/icons";
import Logo from "./Logo.png";

const navLabel = (text) => (
  <span className="inline-block overflow-hidden whitespace-nowrap text-ellipsis" style={{ width: 130, height: 22, lineHeight: "22px" }}>
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
      { key: "dashboard",          icon: <AppstoreOutlined className="text-base" />,   label: navLabel("Dashboard") },
      { key: "subscriptions",      icon: <CreditCardOutlined className="text-base" />,  label: navLabel("Subscriptions"),     children: [{ key: "sub-active", label: "Active" }, { key: "sub-cancelled", label: "Cancelled" }] },
      { key: "orders",             icon: <ShoppingOutlined className="text-base" />,    label: navLabel("Orders"),            children: [{ key: "orders-all", label: "All Orders" }, { key: "orders-pending", label: "Pending" }] },
      { key: "products",           icon: <InboxOutlined className="text-base" />,       label: navLabel("Products"),          children: [{ key: "products-all", label: "All Products" }, { key: "products-add", label: "Add Product" }] },
      { key: "bible-stories",      icon: <BookOutlined className="text-base" />,        label: navLabel("Bible Stories"),     children: [{ key: "bible-all", label: "All Stories" }] },
      { key: "vbsify",             icon: <StarOutlined className="text-base" />,        label: navLabel("VBSify Series"),     children: [{ key: "vbs-all", label: "All Series" }] },
      { key: "handbooks",          icon: <ReadOutlined className="text-base" />,        label: navLabel("Teacher Handbooks"), children: [{ key: "handbook-all", label: "All Handbooks" }] },
      { key: "customers",          icon: <UserOutlined className="text-base" />,        label: navLabel("Customers"),         children: [{ key: "customers-all", label: "All Customers" }] },
      { key: "subscription-plans", icon: <ContainerOutlined className="text-base" />,   label: navLabel("Subscription Plans"),children: [{ key: "plans-all", label: "All Plans" }] },
      { key: "promotions",         icon: <TagOutlined className="text-base" />,         label: navLabel("Promotions"),        children: [{ key: "promo-all", label: "All Promotions" }] },
    ],
  },
  {
    key: "essentials-group", type: "group", label: groupLabel("Essentials"),
    children: [
      { key: "reports",  icon: <BarChartOutlined className="text-base" />,  label: navLabel("Reports"),  children: [{ key: "reports-sales", label: "Sales" }, { key: "reports-orders", label: "Orders" }] },
      { key: "settings", icon: <SettingOutlined className="text-base" />,   label: navLabel("Settings"), children: [{ key: "settings-general", label: "General" }, { key: "settings-account", label: "Account" }] },
    ],
  },
];

function SidebarInner({ selectedKeys, setSelectedKeys }) {
  return (
    <div className="flex flex-col justify-between bg-white border-r border-gray-200 h-full pt-4 pb-6 px-4 box-border" style={{ width: 280, flexShrink: 0 }}>
      <div>
        {/* Logo */}
        <div className="flex items-center mb-5 px-1.5" style={{ gap: 8 }}>
          <img src={Logo} alt="Logo" className="object-contain" style={{ width: 48.37, height: 32 }} />
        </div>

        {/* Search */}
        <div className="mb-4">
          <Input
            prefix={<SearchOutlined className="text-gray-400" />}
            placeholder="Search"
            className="rounded-lg bg-gray-50 border-gray-200 text-sm"
          />
        </div>

        {/* Menu */}
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

export default function Sidebar() {
  const [selectedKeys, setSelectedKeys] = useState(["dashboard"]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger */}
      <Button
        icon={<MenuOutlined />}
        onClick={() => setDrawerOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 rounded-lg shadow-md"
      />

      {/* Mobile Drawer */}
      <Drawer
        placement="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={280}
        styles={{ body: { padding: 0 } }}
        className="lg:hidden"
      >
        <SidebarInner
          selectedKeys={selectedKeys}
          setSelectedKeys={(k) => { setSelectedKeys(k); setDrawerOpen(false); }}
        />
      </Drawer>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex min-h-screen">
        <SidebarInner selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} />
      </div>
    </>
  );
}
