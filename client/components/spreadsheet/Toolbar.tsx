import {
  ChevronsRight,
  Eye,
  ArrowUpDown,
  Filter,
  Expand,
  Download,
  Upload,
  Share,
  ArrowDown,
} from "lucide-react";

interface ToolbarProps {
  onHideFields: () => void;
  onSort: () => void;
  onFilter: () => void;
  onCellView: () => void;
  onImport: () => void;
  onExport: () => void;
  onShare: () => void;
  onNewAction: () => void;
}

export function Toolbar({
  onHideFields,
  onSort,
  onFilter,
  onCellView,
  onImport,
  onExport,
  onShare,
  onNewAction,
}: ToolbarProps) {
  return (
    <div className="flex items-center gap-2 border-b border-surface-tertiary bg-white px-2 py-1.5">
      {/* Tool bar button */}
      <div className="flex items-center gap-1 rounded bg-white px-2 py-2">
        <span className="text-sm text-content-primary">Tool bar</span>
        <ChevronsRight className="h-4 w-4 text-content-primary" />
      </div>

      {/* Separator */}
      <div className="h-6 w-px bg-surface-tertiary"></div>

      {/* Left controls */}
      <div className="flex flex-1 items-center gap-1">
        <button
          onClick={onHideFields}
          className="flex items-center gap-1 rounded-md bg-white px-2 py-2 text-sm text-content-primary hover:bg-gray-50"
        >
          <Eye className="h-5 w-5" />
          Hide fields
        </button>
        <button
          onClick={onSort}
          className="flex items-center gap-1 rounded-md bg-white px-2 py-2 text-sm text-content-primary hover:bg-gray-50"
        >
          <ArrowUpDown className="h-5 w-5" />
          Sort
        </button>
        <button
          onClick={onFilter}
          className="flex items-center gap-1 rounded-md bg-white px-2 py-2 text-sm text-content-primary hover:bg-gray-50"
        >
          <Filter className="h-5 w-5" />
          Filter
        </button>
        <button
          onClick={onCellView}
          className="flex items-center gap-1 rounded-md bg-white px-2 py-2 text-sm text-content-primary hover:bg-gray-50"
        >
          <Expand className="h-5 w-5" />
          Cell view
        </button>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={onImport}
            className="flex items-center gap-1 rounded-md border border-surface-tertiary bg-white px-2 py-2 text-sm text-content-secondary hover:bg-gray-50"
          >
            <Download className="h-5 w-5" />
            Import
          </button>
          <button
            onClick={onExport}
            className="flex items-center gap-1 rounded-md border border-surface-tertiary bg-white px-2 py-2 text-sm text-content-secondary hover:bg-gray-50"
          >
            <Upload className="h-5 w-5" />
            Export
          </button>
          <button
            onClick={onShare}
            className="flex items-center gap-1 rounded-md border border-surface-tertiary bg-white px-2 py-2 text-sm text-content-secondary hover:bg-gray-50"
          >
            <Share className="h-5 w-5" />
            Share
          </button>
        </div>

        {/* New Action button */}
        <button
          onClick={onNewAction}
          className="flex items-center gap-1 rounded-md bg-brand-600 px-6 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          <ArrowDown className="h-5 w-5" />
          New Action
        </button>
      </div>
    </div>
  );
}
