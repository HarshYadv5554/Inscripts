import { useState } from "react";
import { Header } from "@/components/spreadsheet/Header";
import { Toolbar } from "@/components/spreadsheet/Toolbar";
import { Table } from "@/components/spreadsheet/Table";
import { ViewTabs } from "@/components/spreadsheet/ViewTabs";
import { mockData, viewTabs } from "@/lib/spreadsheet-data";

export default function Index() {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Here you would filter the data based on the selected tab
    // For now, we'll just update the active state
  };

  const updatedTabs = viewTabs.map((tab) => ({
    ...tab,
    isActive: tab.id === activeTab,
  }));

  return (
    <div className="flex h-screen w-full flex-col bg-platinum-50 font-sans">
      <Header />
      <Toolbar />
      <div className="flex-1 overflow-hidden">
        <Table data={mockData} />
      </div>
      <ViewTabs tabs={updatedTabs} onTabChange={handleTabChange} />
    </div>
  );
}
