import React from "react";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

export default function TopBar() {
  return (
    <div className="flex items-center justify-between w-full mb-2" style={{ height: 64 }}>
      <div className="flex items-center" style={{ height: 38, gap: 4 }}>
        <h1 className="text-3xl font-bold text-gray-900 m-0 leading-none">Dashboard</h1>
      </div>
      <Button
        icon={<DownloadOutlined />}
        className="rounded-lg border-gray-200 text-gray-700 font-medium text-sm"
        style={{ height: 36 }}
      >
        Download Report
      </Button>
    </div>
  );
}
