import React from "react";
import "antd/dist/reset.css";
import Sidebar from "./Sidebar";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <Sidebar />
      <Dashboard />
    </div>
  );
}
