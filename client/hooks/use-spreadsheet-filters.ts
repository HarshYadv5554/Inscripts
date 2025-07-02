import { useState, useMemo } from "react";
import { SpreadsheetRow } from "@/lib/spreadsheet-types";

export function useSpreadsheetFilters(data: SpreadsheetRow[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof SpreadsheetRow;
    direction: "asc" | "desc";
  } | null>(null);
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Apply search filter
    if (searchQuery) {
      result = result.filter((row) =>
        Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
    }

    // Apply status filter
    if (statusFilter.length > 0) {
      result = result.filter((row) => statusFilter.includes(row.status));
    }

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [data, searchQuery, sortConfig, statusFilter]);

  const handleSort = (key: keyof SpreadsheetRow) => {
    setSortConfig((current) => {
      if (!current || current.key !== key) {
        return { key, direction: "asc" };
      }
      if (current.direction === "asc") {
        return { key, direction: "desc" };
      }
      return null;
    });
  };

  const toggleColumn = (columnId: string) => {
    setHiddenColumns((current) =>
      current.includes(columnId)
        ? current.filter((id) => id !== columnId)
        : [...current, columnId],
    );
  };

  const toggleStatusFilter = (status: string) => {
    setStatusFilter((current) =>
      current.includes(status)
        ? current.filter((s) => s !== status)
        : [...current, status],
    );
  };

  return {
    searchQuery,
    setSearchQuery,
    sortConfig,
    handleSort,
    hiddenColumns,
    toggleColumn,
    statusFilter,
    toggleStatusFilter,
    filteredAndSortedData,
  };
}
