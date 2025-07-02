import {
  ChevronDown,
  Plus,
  Link,
  RefreshCw,
  ArrowUpDown,
  GripVertical,
} from "lucide-react";
import { SpreadsheetRow } from "@/lib/spreadsheet-types";
import { StatusBadge } from "./StatusBadge";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { useColumnResize } from "@/hooks/use-column-resize";
import { cn } from "@/lib/utils";

interface TableProps {
  data: SpreadsheetRow[];
  onSort?: (key: keyof SpreadsheetRow) => void;
  sortConfig?: {
    key: keyof SpreadsheetRow;
    direction: "asc" | "desc";
  } | null;
  hiddenColumns?: string[];
}

export function Table({
  data,
  onSort,
  sortConfig,
  hiddenColumns = [],
}: TableProps) {
  const formatCurrency = (value: number) => {
    return value.toLocaleString("en-IN");
  };

  const defaultColumnWidths = {
    rowNumber: 32,
    jobRequest: 256,
    submitted: 124,
    status: 124,
    submitter: 124,
    url: 124,
    assigned: 124,
    priority: 125,
    dueDate: 125,
    estValue: 124,
  };

  const { columnWidths, isResizing, handleMouseDown } =
    useColumnResize(defaultColumnWidths);

  const { selectedCell, isNavigationActive, activateNavigation } =
    useKeyboardNavigation(
      data.length + 1, // +1 for header
      8, // number of columns
      (row, col) => {
        console.log(`Selected cell: row ${row}, col ${col}`);
      },
    );

  const SortableHeader = ({
    children,
    sortKey,
    className = "",
    columnId,
  }: {
    children: React.ReactNode;
    sortKey?: keyof SpreadsheetRow;
    className?: string;
    columnId?: string;
  }) => (
    <div
      className={cn(
        "flex h-8 items-center gap-1 bg-surface-tertiary px-2 cursor-pointer hover:bg-gray-200 relative group",
        className,
      )}
      onClick={() => sortKey && onSort?.(sortKey)}
      style={{ width: columnId ? columnWidths[columnId] : undefined }}
    >
      {children}
      {sortKey && (
        <div className="flex items-center">
          <ArrowUpDown className="h-3 w-3 text-content-disabled" />
          {sortConfig?.key === sortKey && (
            <span className="ml-1 text-xs text-content-primary">
              {sortConfig.direction === "asc" ? "↑" : "↓"}
            </span>
          )}
        </div>
      )}
      {columnId && (
        <div
          className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-transparent hover:bg-brand-600 group-hover:opacity-100 opacity-0"
          onMouseDown={(e) => handleMouseDown(columnId, e)}
        >
          <GripVertical className="h-3 w-3 text-gray-400 absolute right-0 top-1/2 transform -translate-y-1/2" />
        </div>
      )}
    </div>
  );

  const DataCell = ({
    children,
    rowIndex,
    colIndex,
    columnId,
    className = "",
  }: {
    children: React.ReactNode;
    rowIndex: number;
    colIndex: number;
    columnId?: string;
    className?: string;
  }) => (
    <div
      className={cn(
        "flex h-8 items-center px-2 bg-white cursor-cell border-l border-transparent",
        isNavigationActive &&
          selectedCell.row === rowIndex &&
          selectedCell.col === colIndex &&
          "border-l-2 border-l-brand-600 bg-brand-50",
        className,
      )}
      style={{ width: columnId ? columnWidths[columnId] : undefined }}
      onClick={() => activateNavigation(rowIndex, colIndex)}
      tabIndex={0}
    >
      {children}
    </div>
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-content-negative";
      case "Medium":
        return "text-content-warning";
      case "Low":
        return "text-content-info";
      default:
        return "text-content-primary";
    }
  };

  return (
    <div className="flex h-full bg-surface-secondary">
      {/* Row numbers column */}
      <div className="flex w-8 flex-col gap-px">
        {/* Header cell */}
        <div className="h-8 bg-white"></div>

        {/* Title cell with # icon */}
        <div className="flex h-8 items-center bg-surface-tertiary px-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="h-4 w-4 text-content-disabled"
          >
            <path
              d="M7.32461 1.92627C7.37593 1.65494 7.19758 1.39338 6.92625 1.34205C6.65492 1.29073 6.39336 1.46908 6.34203 1.74041L5.66264 5.33202L2.49977 5.3335C2.22362 5.33362 1.99987 5.55759 2 5.83373C2.00013 6.10987 2.22409 6.33362 2.50023 6.3335L5.47347 6.33211L4.84297 9.66526L1.8331 9.66667C1.55696 9.6668 1.33321 9.89076 1.33333 10.1669C1.33346 10.443 1.55743 10.6668 1.83357 10.6667L4.65379 10.6653L4.00868 14.0757C3.95736 14.3471 4.13571 14.6086 4.40704 14.66C4.67837 14.7113 4.93993 14.5329 4.99126 14.2616L5.67161 10.6649L9.32091 10.6632L8.67539 14.0757C8.62406 14.3471 8.80241 14.6086 9.07374 14.66C9.34508 14.7113 9.60664 14.5329 9.65796 14.2616L10.3387 10.6627L13.5002 10.6612C13.7764 10.6611 14.0001 10.4371 14 10.161C13.9999 9.88484 13.7759 9.66109 13.4998 9.66121L10.5279 9.6626L11.1584 6.32945L14.1669 6.32804C14.443 6.32792 14.6668 6.10395 14.6667 5.82781C14.6665 5.55167 14.4426 5.32791 14.1664 5.32804L11.3476 5.32936L11.9913 1.92627C12.0426 1.65494 11.8643 1.39338 11.593 1.34205C11.3216 1.29073 11.0601 1.46908 11.0087 1.74041L10.3298 5.32984L6.68047 5.33154L7.32461 1.92627ZM6.49129 6.33163L10.1406 6.32993L9.51009 9.66308L5.86079 9.66478L6.49129 6.33163Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Row numbers */}
        {data.map((_, index) => (
          <div
            key={index}
            className="flex h-8 items-center justify-center bg-white text-xs text-content-tertiary"
          >
            {index + 1}
          </div>
        ))}
      </div>

      {/* Linked section header */}
      <div className="flex w-80 flex-col gap-px">
        <div className="flex h-8 items-center bg-gray-200 px-2">
          <div className="flex items-center gap-1 rounded bg-surface-tertiary px-1 py-1">
            <Link className="h-4 w-4 text-content-info" />
            <span className="text-xs text-content-secondary">
              Q3 Financial Overview
            </span>
          </div>
          <RefreshCw className="ml-2 h-4 w-4 text-orange-500" />
        </div>

        {/* Job Request Column */}
        <div className="flex flex-1 flex-col gap-px">
          {/* Header */}
          <div className="flex h-8 items-center gap-1 bg-surface-tertiary px-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="h-4 w-4 text-content-disabled"
            >
              <path
                d="M6.83333 2.33333H9.16667C9.44281 2.33333 9.66667 2.55719 9.66667 2.83333V3.99999H6.33333V2.83333C6.33333 2.55719 6.55719 2.33333 6.83333 2.33333ZM5.33333 2.83333V3.99999H4.16667C2.97005 3.99999 2 4.97004 2 6.16666V7.16666C2 7.81099 2.52233 8.33333 3.16667 8.33333H6.66667V8C6.66667 7.63181 6.96514 7.33333 7.33333 7.33333H8.66667C9.03486 7.33333 9.33333 7.6318 9.33333 8V8.33333H12.8333C13.4777 8.33333 14 7.81099 14 7.16666V6.16666C14 4.97004 13.03 3.99999 11.8333 3.99999H10.6667V2.83333C10.6667 2.0049 9.99509 1.33333 9.16667 1.33333H6.83333C6.00491 1.33333 5.33333 2.0049 5.33333 2.83333ZM14 8.99272C13.6632 9.20833 13.2629 9.33333 12.8333 9.33333H9.33333C9.33333 9.70152 9.03486 10 8.66667 10H7.33333C6.96514 10 6.66667 9.70152 6.66667 9.33333H3.16667C2.73712 9.33333 2.33677 9.20833 2 8.99272V11.1667C2 12.3633 2.97005 13.3333 4.16667 13.3333H11.8333C13.03 13.3333 14 12.3633 14 11.1667V8.99272Z"
                fill="currentColor"
              />
            </svg>
            <span className="flex-1 text-xs font-semibold text-content-tertiary">
              Job Request
            </span>
            <ChevronDown className="h-3 w-3 text-content-disabled" />
          </div>

          {/* Data cells */}
          {data.map((row, index) => (
            <div
              key={row.id}
              className={cn(
                "flex h-8 items-center px-2 bg-white",
                index === 7 &&
                  "border border-green-600 shadow-lg shadow-green-200",
              )}
            >
              <span className="truncate text-xs text-content-primary">
                {row.jobRequest}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Other columns */}
      <div className="flex flex-1 gap-px">
        {/* Submitted Column */}
        <div className="flex w-32 flex-col gap-px">
          <div className="h-8 bg-white"></div>
          <div className="flex h-8 items-center gap-1 bg-surface-tertiary px-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="h-4 w-4 text-content-disabled"
            >
              <path
                d="M14 5.66667V11.8333C14 13.03 13.03 14 11.8333 14H4.16667C2.97005 14 2 13.03 2 11.8333V5.66667H14ZM4.83333 10C4.3731 10 4 10.3731 4 10.8333C4 11.2936 4.3731 11.6667 4.83333 11.6667C5.29357 11.6667 5.66667 11.2936 5.66667 10.8333C5.66667 10.3731 5.29357 10 4.83333 10ZM8 10C7.53976 10 7.16667 10.3731 7.16667 10.8333C7.16667 11.2936 7.53976 11.6667 8 11.6667C8.46024 11.6667 8.83333 11.2936 8.83333 10.8333C8.83333 10.3731 8.46024 10 8 10ZM4.83333 7C4.3731 7 4 7.3731 4 7.83333C4 8.29357 4.3731 8.66667 4.83333 8.66667C5.29357 8.66667 5.66667 8.29357 5.66667 7.83333C5.66667 7.3731 5.29357 7 4.83333 7ZM8 7C7.53976 7 7.16667 7.3731 7.16667 7.83333C7.16667 8.29357 7.53976 8.66667 8 8.66667C8.46024 8.66667 8.83333 8.29357 8.83333 7.83333C8.83333 7.3731 8.46024 7 8 7ZM11.1667 7C10.7064 7 10.3333 7.3731 10.3333 7.83333C10.3333 8.29357 10.7064 8.66667 11.1667 8.66667C11.6269 8.66667 12 8.29357 12 7.83333C12 7.3731 11.6269 7 11.1667 7ZM11.8333 2C13.03 2 14 2.97005 14 4.16667V4.66667H2V4.16667C2 2.97005 2.97005 2 4.16667 2H11.8333Z"
                fill="currentColor"
              />
            </svg>
            <span className="flex-1 text-xs font-semibold text-content-tertiary">
              Submitted
            </span>
            <ChevronDown className="h-3 w-3 text-content-disabled" />
          </div>
          {data.map((row) => (
            <div key={row.id} className="flex h-8 items-center px-2 bg-white">
              <span className="text-xs text-content-primary text-right w-full">
                {row.submitted}
              </span>
            </div>
          ))}
        </div>

        {/* Status Column */}
        <div className="flex w-32 flex-col gap-px">
          <div className="h-8 bg-white"></div>
          <div className="flex h-8 items-center gap-1 bg-surface-tertiary px-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="h-4 w-4 text-content-disabled"
            >
              <path
                d="M8.00001 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8C1.33334 4.3181 4.31811 1.33333 8.00001 1.33333ZM4.97979 6.64644C4.78453 6.8417 4.78453 7.15829 4.97979 7.35355L7.64646 10.0202C7.84172 10.2155 8.1583 10.2155 8.35356 10.0202L11.0202 7.35355C11.2155 7.15829 11.2155 6.8417 11.0202 6.64644C10.825 6.45118 10.5084 6.45118 10.3131 6.64644L8.00001 8.95955L5.6869 6.64644C5.49163 6.45118 5.17505 6.45118 4.97979 6.64644Z"
                fill="currentColor"
              />
            </svg>
            <span className="flex-1 text-xs font-semibold text-content-tertiary">
              Status
            </span>
            <ChevronDown className="h-3 w-3 text-content-disabled" />
          </div>
          {data.map((row) => (
            <div
              key={row.id}
              className="flex h-8 items-center justify-center px-2 bg-white"
            >
              <StatusBadge status={row.status} />
            </div>
          ))}
        </div>

        {/* Submitter Column */}
        <div className="flex w-32 flex-col gap-px">
          <div className="h-8 bg-white"></div>
          <div className="flex h-8 items-center gap-1 bg-surface-tertiary px-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="h-4 w-4 text-content-disabled"
            >
              <path
                d="M11.8361 9.33327C12.6641 9.33327 13.3353 10.0045 13.3353 10.8325V11.4448C13.3353 11.8271 13.2159 12.1998 12.9936 12.5108C11.963 13.9529 10.2802 14.6674 7.99998 14.6674C5.71933 14.6674 4.03736 13.9526 3.00925 12.5097C2.78794 12.1991 2.66901 11.8272 2.66901 11.4458V10.8325C2.66901 10.0045 3.34024 9.33327 4.16826 9.33327H11.8361ZM7.99998 1.33641C9.84093 1.33641 11.3333 2.82879 11.3333 4.66974C11.3333 6.51069 9.84093 8.00308 7.99998 8.00308C6.15903 8.00308 4.66665 6.51069 4.66665 4.66974C4.66665 2.82879 6.15903 1.33641 7.99998 1.33641Z"
                fill="currentColor"
              />
            </svg>
            <span className="flex-1 text-xs font-semibold text-content-tertiary">
              Submitter
            </span>
            <ChevronDown className="h-3 w-3 text-content-disabled" />
          </div>
          {data.map((row) => (
            <div key={row.id} className="flex h-8 items-center px-2 bg-white">
              <span className="truncate text-xs text-content-primary">
                {row.submitter}
              </span>
            </div>
          ))}
        </div>

        {/* URL Column */}
        <div className="flex w-32 flex-col gap-px">
          <div className="h-8 bg-white"></div>
          <div className="flex h-8 items-center gap-1 bg-surface-tertiary px-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="h-4 w-4 text-content-disabled"
            >
              <path
                d="M5.93615 11.0006H10.0638C9.65051 13.1815 8.82291 14.666 7.99998 14.666C7.20198 14.666 6.39959 13.2701 5.97485 11.1969L5.93615 11.0006H10.0638H5.93615ZM2.04385 11.0007L4.91427 11.0005C5.15745 12.3887 5.56964 13.5697 6.10906 14.3962C4.40051 13.8916 2.97807 12.7217 2.14141 11.1866L2.04385 11.0007ZM11.0857 11.0005L13.9561 11.0007C13.1352 12.6271 11.6678 13.8714 9.89157 14.3959C10.3946 13.6242 10.7871 12.5442 11.0348 11.2753L11.0857 11.0005L13.9561 11.0007L11.0857 11.0005ZM11.2876 6.66723L14.5343 6.66682C14.6218 7.0977 14.6677 7.54366 14.6677 8.00035C14.6677 8.69723 14.5608 9.36914 14.3625 10.0006H11.2274C11.2976 9.36221 11.3343 8.69149 11.3343 8.00035C11.3343 7.69747 11.3273 7.39851 11.3134 7.10447L11.2876 6.66723L14.5343 6.66682L11.2876 6.66723ZM1.46565 6.66682L4.71233 6.66723C4.6815 7.10053 4.66561 7.54603 4.66561 8.00035C4.66561 8.55326 4.68915 9.0931 4.73451 9.61379L4.77259 10.0006H1.6375C1.43919 9.36914 1.33228 8.69723 1.33228 8.00035C1.33228 7.54366 1.37819 7.0977 1.46565 6.66682ZM5.71697 6.66685H10.283C10.3165 7.09727 10.3343 7.54317 10.3343 8.00035C10.3343 8.55878 10.3077 9.10037 10.2584 9.6175L10.2173 10.0006H5.78261C5.70725 9.37011 5.66561 8.69839 5.66561 8.00035C5.66561 7.65746 5.67566 7.32093 5.69481 6.9925L5.71697 6.66685H10.283H5.71697ZM9.96282 1.71806L9.8909 1.60458C11.9031 2.19856 13.5191 3.7163 14.2479 5.66679L11.1873 5.66699C10.977 4.05571 10.5497 2.67192 9.96282 1.71806L9.8909 1.60458L9.96282 1.71806ZM6.02782 1.62912L6.10901 1.6046C5.52184 2.50428 5.08543 3.82402 4.85366 5.37376L4.81262 5.66699L1.75203 5.66679C2.471 3.74262 4.0534 2.23959 6.02782 1.62912L6.10901 1.6046L6.02782 1.62912ZM7.99998 1.33466C8.87917 1.33466 9.7637 3.02916 10.1426 5.45695L10.1739 5.66682H5.8261C6.1857 3.12737 7.09566 1.33466 7.99998 1.33466Z"
                fill="currentColor"
              />
            </svg>
            <span className="flex-1 text-xs font-semibold text-content-tertiary">
              URL
            </span>
            <ChevronDown className="h-3 w-3 text-content-disabled" />
          </div>
          {data.map((row) => (
            <div key={row.id} className="flex h-8 items-center px-2 bg-white">
              <span className="truncate text-xs text-content-primary underline">
                {row.url}
              </span>
            </div>
          ))}
        </div>

        {/* Assigned Column */}
        <div className="flex w-32 flex-col gap-px">
          <div className="flex h-8 items-center justify-center bg-brand-100 px-4">
            <div className="flex items-center gap-1 rounded px-1 py-0.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="h-4 w-4"
              >
                <path
                  d="M8.00001 2C8.27616 2 8.50001 2.22386 8.50001 2.5V6.33333H10.1636C11.1762 6.33333 11.997 7.15414 11.997 8.16667V12.2944L13.1467 11.1462C13.3421 10.9511 13.6587 10.9513 13.8538 11.1467C14.0489 11.3421 14.0487 11.6587 13.8533 11.8538L11.8503 13.8541C11.655 14.0492 11.3386 14.0491 11.1434 13.8539L9.14308 11.8536C8.94782 11.6583 8.94782 11.3417 9.14308 11.1464C9.33834 10.9512 9.65492 10.9512 9.85018 11.1464L10.997 12.2932V8.16667C10.997 7.70643 10.6239 7.33333 10.1636 7.33333H5.83328C5.37304 7.33333 4.99995 7.70643 4.99995 8.16667V12.2932L6.14673 11.1464C6.34199 10.9512 6.65858 10.9512 6.85384 11.1464C7.0491 11.3417 7.0491 11.6583 6.85384 11.8536L4.8535 13.8539C4.65824 14.0492 4.34166 14.0492 4.1464 13.8539L2.14602 11.8536C1.95076 11.6583 1.95076 11.3417 2.14602 11.1465C2.34128 10.9512 2.65786 10.9512 2.85312 11.1464L3.99995 12.2932V8.16667C3.99995 7.15414 4.82076 6.33333 5.83328 6.33333H7.50001V2.5C7.50001 2.22386 7.72387 2 8.00001 2Z"
                  fill="white"
                />
              </svg>
              <span className="text-sm text-content-secondary">ABC</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="h-4 w-4 text-content-disabled"
              >
                <path
                  d="M5.16671 8C5.16671 8.64433 4.64437 9.16667 4.00004 9.16667C3.35571 9.16667 2.83337 8.64433 2.83337 8C2.83337 7.35567 3.35571 6.83334 4.00004 6.83334C4.64437 6.83334 5.16671 7.35567 5.16671 8ZM9.16671 8C9.16671 8.64433 8.64437 9.16667 8.00004 9.16667C7.35571 9.16667 6.83337 8.64433 6.83337 8C6.83337 7.35567 7.35571 6.83334 8.00004 6.83334C8.64437 6.83334 9.16671 7.35567 9.16671 8ZM12 9.16667C12.6444 9.16667 13.1667 8.64433 13.1667 8C13.1667 7.35567 12.6444 6.83334 12 6.83334C11.3557 6.83334 10.8334 7.35567 10.8334 8C10.8334 8.64433 11.3557 9.16667 12 9.16667Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          <div className="flex h-8 items-center gap-1 bg-surface-tertiary px-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="h-4 w-4 text-content-tertiary"
            >
              <path
                d="M5.00002 5.00017V1.16667C5.00002 0.890529 5.22388 0.666672 5.50002 0.666672C5.77616 0.666672 6.00002 0.890529 6.00002 1.16667V5.00017C6.00002 5.18426 6.14926 5.3335 6.33335 5.3335C6.51745 5.3335 6.66669 5.18426 6.66669 5.00017V1.66667C6.66669 1.39053 6.89054 1.16667 7.16669 1.16667C7.44283 1.16667 7.66669 1.39053 7.66669 1.66667V5.50001C7.66669 5.51415 7.6661 5.52815 7.66495 5.542C7.95311 5.43312 8.31394 5.3308 8.66669 5.3308C8.99991 5.3308 9.28491 5.41403 9.49617 5.52043C9.60046 5.57296 9.69747 5.63652 9.77672 5.7086C9.81567 5.74403 9.86063 5.79083 9.89973 5.84899C9.93045 5.8947 10 6.00874 10 6.16667C10 6.33907 9.91121 6.4993 9.76502 6.59067L8.49412 7.38498L7.3889 8.64564L6.47071 9.91038C6.1258 10.3855 5.57422 10.6666 4.98713 10.6666H4.22811C3.60746 10.6666 3.01235 10.3514 2.69151 9.79257C2.49008 9.44174 2.24072 8.98076 2.04023 8.52452C1.84951 8.09048 1.66669 7.58261 1.66669 7.16664V2.50001C1.66669 2.22386 1.89054 2.00001 2.16669 2.00001C2.44283 2.00001 2.66669 2.22386 2.66669 2.50001V5.33196C2.66669 5.51605 2.81593 5.66529 3.00002 5.66529C3.18412 5.66529 3.33335 5.51605 3.33335 5.33196V1.66667C3.33335 1.39053 3.55721 1.16667 3.83335 1.16667C4.1095 1.16667 4.33335 1.39053 4.33335 1.66667V5.00017C4.33335 5.18426 4.48259 5.3335 4.66669 5.3335C4.85078 5.3335 5.00002 5.18426 5.00002 5.00017ZM9.99996 14.6667C7.86575 14.6667 6.06615 13.234 5.51044 11.278C6.10765 11.1501 6.6442 10.8061 7.01014 10.3021L7.91033 9.06211L8.93064 7.8983L10.1183 7.15602C10.4594 6.94282 10.6666 6.56894 10.6666 6.16669C10.6666 5.81248 10.5114 5.56406 10.453 5.47709C10.4203 5.42851 10.3864 5.38501 10.3532 5.34652C12.7655 5.52706 14.6666 7.54152 14.6666 10C14.6666 12.5773 12.5773 14.6667 9.99996 14.6667ZM12 9.33335C12 8.96516 11.7015 8.66669 11.3333 8.66669C10.9651 8.66669 10.6666 8.96516 10.6666 9.33335C10.6666 9.70154 10.9651 10 11.3333 10C11.7015 10 12 9.70154 12 9.33335ZM8.0915 11.1415C7.89248 11.3329 7.88633 11.6494 8.07776 11.8484C8.56232 12.3522 9.24478 12.6667 9.99983 12.6667C10.7549 12.6667 11.4374 12.3522 11.9219 11.8484C12.1133 11.6494 12.1072 11.3329 11.9082 11.1415C11.7092 10.95 11.3926 10.9562 11.2012 11.1552C10.8974 11.4711 10.4719 11.6667 9.99983 11.6667C9.52781 11.6667 9.10231 11.4711 8.79847 11.1552C8.60704 10.9562 8.29051 10.95 8.0915 11.1415ZM9.3333 9.33335C9.3333 8.96516 9.03482 8.66669 8.66663 8.66669C8.29844 8.66669 7.99996 8.96516 7.99996 9.33335C7.99996 9.70154 8.29844 10 8.66663 10C9.03482 10 9.3333 9.70154 9.3333 9.33335Z"
                fill="currentColor"
              />
            </svg>
            <span className="flex-1 text-xs font-semibold text-content-tertiary">
              Assigned
            </span>
          </div>
          {data.map((row) => (
            <div key={row.id} className="flex h-8 items-center px-2 bg-white">
              <span className="truncate text-xs text-content-primary">
                {row.assigned}
              </span>
            </div>
          ))}
        </div>

        {/* Function Results Columns */}
        <div className="flex w-64 gap-px">
          {/* Priority + Due Date columns */}
          <div className="flex flex-1 flex-col gap-px">
            <div className="flex h-8 items-center justify-center bg-brand-100 px-4">
              <div className="flex items-center gap-1 rounded px-1 py-0.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="h-4 w-4"
                >
                  <path
                    d="M8.00001 2C8.27616 2 8.50001 2.22386 8.50001 2.5V6.33333H10.1636C11.1762 6.33333 11.997 7.15414 11.997 8.16667V12.2944L13.1467 11.1462C13.3421 10.9511 13.6587 10.9513 13.8538 11.1467C14.0489 11.3421 14.0487 11.6587 13.8533 11.8538L11.8503 13.8541C11.655 14.0492 11.3386 14.0491 11.1434 13.8539L9.14308 11.8536C8.94782 11.6583 8.94782 11.3417 9.14308 11.1464C9.33834 10.9512 9.65492 10.9512 9.85018 11.1464L10.997 12.2932V8.16667C10.997 7.70643 10.6239 7.33333 10.1636 7.33333H5.83328C5.37304 7.33333 4.99995 7.70643 4.99995 8.16667V12.2932L6.14673 11.1464C6.34199 10.9512 6.65858 10.9512 6.85384 11.1464C7.0491 11.3417 7.0491 11.6583 6.85384 11.8536L4.8535 13.8539C4.65824 14.0492 4.34166 14.0492 4.1464 13.8539L2.14602 11.8536C1.95076 11.6583 1.95076 11.3417 2.14602 11.1465C2.34128 10.9512 2.65786 10.9512 2.85312 11.1464L3.99995 12.2932V8.16667C3.99995 7.15414 4.82076 6.33333 5.83328 6.33333H7.50001V2.5C7.50001 2.22386 7.72387 2 8.00001 2Z"
                    fill="white"
                  />
                </svg>
                <span className="text-sm text-purple-700">
                  Answer a question
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="h-4 w-4 text-content-disabled"
                >
                  <path
                    d="M5.16671 8C5.16671 8.64433 4.64437 9.16667 4.00004 9.16667C3.35571 9.16667 2.83337 8.64433 2.83337 8C2.83337 7.35567 3.35571 6.83334 4.00004 6.83334C4.64437 6.83334 5.16671 7.35567 5.16671 8ZM9.16671 8C9.16671 8.64433 8.64437 9.16667 8.00004 9.16667C7.35571 9.16667 6.83337 8.64433 6.83337 8C6.83337 7.35567 7.35571 6.83334 8.00004 6.83334C8.64437 6.83334 9.16671 7.35567 9.16671 8ZM12 9.16667C12.6444 9.16667 13.1667 8.64433 13.1667 8C13.1667 7.35567 12.6444 6.83334 12 6.83334C11.3557 6.83334 10.8334 7.35567 10.8334 8C10.8334 8.64433 11.3557 9.16667 12 9.16667Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>

            {/* Priority and Due Date sub-columns */}
            <div className="flex gap-px">
              <div className="flex flex-1 flex-col gap-px">
                <div className="flex h-8 items-center gap-1 bg-surface-tertiary px-2">
                  <span className="flex-1 text-xs font-semibold text-purple-700">
                    Priority
                  </span>
                </div>
                {data.map((row) => (
                  <div
                    key={row.id}
                    className="flex h-8 items-center justify-center px-2 bg-white"
                  >
                    <span
                      className={cn(
                        "text-xs font-semibold text-center",
                        getPriorityColor(row.priority),
                      )}
                    >
                      {row.priority}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-1 flex-col gap-px">
                <div className="flex h-8 items-center gap-1 bg-surface-tertiary px-2">
                  <span className="flex-1 text-xs font-semibold text-purple-700">
                    Due Date
                  </span>
                </div>
                {data.map((row) => (
                  <div
                    key={row.id}
                    className="flex h-8 items-center px-2 bg-white"
                  >
                    <span className="text-xs text-content-primary text-right w-full">
                      {row.dueDate}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Extract Column */}
        <div className="flex w-32 flex-col gap-px">
          <div className="flex h-8 items-center justify-center bg-brand-100 px-4">
            <div className="flex items-center gap-1 rounded px-1 py-0.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="h-4 w-4"
              >
                <path
                  d="M7.99995 2C8.2761 2 8.49995 2.22386 8.49995 2.5V6.33333H10.1636C11.1761 6.33333 11.9969 7.15414 11.9969 8.16667V12.2944L13.1466 11.1462C13.342 10.9511 13.6586 10.9513 13.8537 11.1467C14.0489 11.3421 14.0487 11.6587 13.8533 11.8538L11.8502 13.8541C11.6549 14.0492 11.3385 14.0491 11.1434 13.8539L9.14302 11.8536C8.94775 11.6583 8.94775 11.3417 9.14302 11.1464C9.33828 10.9512 9.65486 10.9512 9.85012 11.1464L10.9969 12.2932V8.16667C10.9969 7.70643 10.6238 7.33333 10.1636 7.33333H5.83322C5.37298 7.33333 4.99989 7.70643 4.99989 8.16667V12.2932L6.14667 11.1464C6.34193 10.9512 6.65852 10.9512 6.85378 11.1464C7.04904 11.3417 7.04904 11.6583 6.85378 11.8536L4.85344 13.8539C4.65818 14.0492 4.3416 14.0492 4.14634 13.8539L2.14596 11.8536C1.9507 11.6583 1.95069 11.3417 2.14595 11.1465C2.34122 10.9512 2.6578 10.9512 2.85306 11.1464L3.99989 12.2932V8.16667C3.99989 7.15414 4.8207 6.33333 5.83322 6.33333H7.49995V2.5C7.49995 2.22386 7.72381 2 7.99995 2Z"
                  fill="white"
                />
              </svg>
              <span className="text-sm text-amber-700">Extract</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="h-4 w-4 text-content-disabled"
              >
                <path
                  d="M5.16671 8C5.16671 8.64433 4.64437 9.16667 4.00004 9.16667C3.35571 9.16667 2.83337 8.64433 2.83337 8C2.83337 7.35567 3.35571 6.83334 4.00004 6.83334C4.64437 6.83334 5.16671 7.35567 5.16671 8ZM9.16671 8C9.16671 8.64433 8.64437 9.16667 8.00004 9.16667C7.35571 9.16667 6.83337 8.64433 6.83337 8C6.83337 7.35567 7.35571 6.83334 8.00004 6.83334C8.64437 6.83334 9.16671 7.35567 9.16671 8ZM12 9.16667C12.6444 9.16667 13.1667 8.64433 13.1667 8C13.1667 7.35567 12.6444 6.83334 12 6.83334C11.3557 6.83334 10.8334 7.35567 10.8334 8C10.8334 8.64433 11.3557 9.16667 12 9.16667Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          <div className="flex h-8 items-center gap-1 bg-surface-tertiary px-2">
            <span className="flex-1 text-xs font-semibold text-amber-700">
              Est. Value
            </span>
          </div>
          {data.map((row) => (
            <div
              key={row.id}
              className="flex h-8 items-center justify-between px-2 bg-white"
            >
              <span className="text-xs text-content-primary">
                {formatCurrency(row.estValue)}
              </span>
              <span className="text-xs text-content-disabled">₹</span>
            </div>
          ))}
        </div>

        {/* Add Column */}
        <div className="flex w-32 flex-col gap-px border border-dashed border-gray-400">
          <div className="flex h-8 items-center justify-center bg-surface-tertiary">
            <Plus className="h-5 w-5 text-content-primary" />
          </div>
          {data.map((_, index) => (
            <div key={index} className="h-8 bg-white"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
