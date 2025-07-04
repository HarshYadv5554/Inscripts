import { useState } from "react";
import { Header } from "@/components/spreadsheet/Header";
import { Toolbar } from "@/components/spreadsheet/Toolbar";
import { Table } from "@/components/spreadsheet/Table";
import { ViewTabs } from "@/components/spreadsheet/ViewTabs";
import {
  HideFieldsModal,
  FilterModal,
  ShareModal,
} from "@/components/spreadsheet/Modals";
import {
  NewActionModal,
  SortModal,
  AddTabModal,
} from "@/components/spreadsheet/ActionModals";
import { mockData, viewTabs } from "@/lib/spreadsheet-data";
import { useSpreadsheetFilters } from "@/hooks/use-spreadsheet-filters";
import { SpreadsheetRow, ViewTab } from "@/lib/spreadsheet-types";

export default function Index() {
  const [activeTab, setActiveTab] = useState("all");
  const [showHideFields, setShowHideFields] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showNewAction, setShowNewAction] = useState(false);
  const [showAdvancedSort, setShowAdvancedSort] = useState(false);
  const [showAddTab, setShowAddTab] = useState(false);
  const [data, setData] = useState(mockData);
  const [tabs, setTabs] = useState(viewTabs);

  const {
    searchQuery,
    setSearchQuery,
    sortConfig,
    handleSort,
    multiSortConfig,
    applyMultiSort,
    hiddenColumns,
    toggleColumn,
    statusFilter,
    toggleStatusFilter,
    filteredAndSortedData,
  } = useSpreadsheetFilters(data);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleCreateAction = (newAction: Partial<SpreadsheetRow>) => {
    setData([...data, newAction as SpreadsheetRow]);
  };

  const handleAddTab = (tabName: string) => {
    const newTab: ViewTab = {
      id: tabName.toLowerCase().replace(/\s+/g, "-"),
      label: tabName,
      isActive: false,
    };
    setTabs([...tabs, newTab]);
  };

  const updatedTabs = tabs.map((tab) => ({
    ...tab,
    isActive: tab.id === activeTab,
  }));

  const columns = [
    { id: "jobRequest", label: "Job Request" },
    { id: "submitted", label: "Submitted" },
    { id: "status", label: "Status" },
    { id: "submitter", label: "Submitter" },
    { id: "url", label: "URL" },
    { id: "assigned", label: "Assigned" },
    { id: "priority", label: "Priority" },
    { id: "dueDate", label: "Due Date" },
    { id: "estValue", label: "Est. Value" },
  ];

  const handleFileOperation = (type: "import" | "export") => {
    if (type === "import") {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".csv,.xlsx,.xls";
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          alert(`Importing file: ${file.name}`);
          // Here you would implement actual file import logic
        }
      };
      input.click();
    } else {
      // Export functionality
      const csvContent = [
        columns.map((col) => col.label).join(","),
        ...filteredAndSortedData.map((row) =>
          columns.map((col) => row[col.id as keyof typeof row]).join(","),
        ),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "spreadsheet-data.csv";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col bg-platinum-50 font-sans">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <Toolbar
        onHideFields={() => setShowHideFields(true)}
        onSort={() => setShowAdvancedSort(true)}
        onFilter={() => setShowFilter(true)}
        onCellView={() => alert("Cell view options coming soon!")}
        onImport={() => handleFileOperation("import")}
        onExport={() => handleFileOperation("export")}
        onShare={() => setShowShare(true)}
        onNewAction={() => setShowNewAction(true)}
      />
      <div className="flex-1 overflow-hidden">
        <Table
          data={filteredAndSortedData}
          onSort={handleSort}
          sortConfig={sortConfig}
          hiddenColumns={hiddenColumns}
        />
      </div>
      <ViewTabs
        tabs={updatedTabs}
        onTabChange={handleTabChange}
        onAddTab={() => setShowAddTab(true)}
      />

      {/* Modals */}
      <HideFieldsModal
        isOpen={showHideFields}
        onClose={() => setShowHideFields(false)}
        columns={columns}
        hiddenColumns={hiddenColumns}
        onToggleColumn={toggleColumn}
      />

      <FilterModal
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        statusFilter={statusFilter}
        onToggleStatusFilter={toggleStatusFilter}
      />

      <ShareModal isOpen={showShare} onClose={() => setShowShare(false)} />

      <NewActionModal
        isOpen={showNewAction}
        onClose={() => setShowNewAction(false)}
        onCreateAction={handleCreateAction}
      />

      <SortModal
        isOpen={showAdvancedSort}
        onClose={() => setShowAdvancedSort(false)}
        onApplySort={applyMultiSort}
      />

      <AddTabModal
        isOpen={showAddTab}
        onClose={() => setShowAddTab(false)}
        onAddTab={handleAddTab}
      />
    </div>
  );
}
