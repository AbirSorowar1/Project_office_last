import React, { useState } from "react";
import { Menu, Input, Avatar, Drawer, Button } from "antd";
import {
  AppstoreOutlined,        // we'll keep this one as there is no replacement
  SearchOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import Logo from "./Logo.png";

// ────────────────────────────────────────────────
//  Custom image imports (adjust paths if needed in your real project)
// ────────────────────────────────────────────────
import imgDashboard from "./icon/Dashboard.png";           // assuming you have one — if not keep AppstoreOutlined
import imgSubscriptions from "./icon/Subscriptions.png";
import imgOrders from "./icon/Orders.png";
import imgProducts from "./icon/Products.png";
import imgBibleStories from "./icon/Bible Stories.png";
import imgVBSify from "./icon/VBSify Series.png";
import imgTeacherHandbooks from "./icon/Teacher Handbooks.png";
import imgCustomers from "./icon/Customers.png";
import imgSubscriptionPlans from "./icon/Subscription Plans.png";
import imgPromotions from "./icon/Promotions.png";
import imgReports from "./icon/Reports.png";
import imgSettings from "./icon/settings.png";

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
      {
        key: "dashboard",
        icon: <AppstoreOutlined className="text-base" />,   // ← kept original (no image provided)
        label: navLabel("Dashboard")
      },
      {
        key: "subscriptions",
        icon: <img src={imgSubscriptions} alt="" className="w-5 h-5 object-contain" />,
        label: navLabel("Subscriptions"),
        children: [{ key: "sub-active", label: "Active" }, { key: "sub-cancelled", label: "Cancelled" }]
      },
      {
        key: "orders",
        icon: <img src={imgOrders} alt="" className="w-5 h-5 object-contain" />,
        label: navLabel("Orders"),
        children: [{ key: "orders-all", label: "All Orders" }, { key: "orders-pending", label: "Pending" }]
      },
      {
        key: "products",
        icon: <img src={imgProducts} alt="" className="w-5 h-5 object-contain" />,
        label: navLabel("Products"),
        children: [{ key: "products-all", label: "All Products" }, { key: "products-add", label: "Add Product" }]
      },
      {
        key: "bible-stories",
        icon: <img src={imgBibleStories} alt="" className="w-5 h-5 object-contain" />,
        label: navLabel("Bible Stories"),
        children: [{ key: "bible-all", label: "All Stories" }]
      },
      {
        key: "vbsify",
        icon: <img src={imgVBSify} alt="" className="w-5 h-5 object-contain" />,
        label: navLabel("VBSify Series"),
        children: [{ key: "vbs-all", label: "All Series" }]
      },
      {
        key: "handbooks",
        icon: <img src={imgTeacherHandbooks} alt="" className="w-5 h-5 object-contain" />,
        label: navLabel("Teacher Handbooks"),
        children: [{ key: "handbook-all", label: "All Handbooks" }]
      },
      {
        key: "customers",
        icon: <img src={imgCustomers} alt="" className="w-5 h-5 object-contain" />,
        label: navLabel("Customers"),
        children: [{ key: "customers-all", label: "All Customers" }]
      },
      {
        key: "subscription-plans",
        icon: <img src={imgSubscriptionPlans} alt="" className="w-5 h-5 object-contain" />,
        label: navLabel("Subscription Plans"),
        children: [{ key: "plans-all", label: "All Plans" }]
      },
      {
        key: "promotions",
        icon: <img src={imgPromotions} alt="" className="w-5 h-5 object-contain" />,
        label: navLabel("Promotions"),
        children: [{ key: "promo-all", label: "All Promotions" }]
      },
    ],
  },
  {
    key: "essentials-group", type: "group", label: groupLabel("Essentials"),
    children: [
      {
        key: "reports",
        icon: <img src={imgReports} alt="" className="w-5 h-5 object-contain" />,
        label: navLabel("Reports"),
        children: [{ key: "reports-sales", label: "Sales" }, { key: "reports-orders", label: "Orders" }]
      },
      {
        key: "settings",
        icon: <img src={imgSettings} alt="" className="w-5 h-5 object-contain" />,
        label: navLabel("Settings"),
        children: [{ key: "settings-general", label: "General" }, { key: "settings-account", label: "Account" }]
      },
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