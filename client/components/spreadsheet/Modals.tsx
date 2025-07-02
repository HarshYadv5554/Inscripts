import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-content-primary">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function HideFieldsModal({
  isOpen,
  onClose,
  columns,
  hiddenColumns,
  onToggleColumn,
}: {
  isOpen: boolean;
  onClose: () => void;
  columns: Array<{ id: string; label: string }>;
  hiddenColumns: string[];
  onToggleColumn: (columnId: string) => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Hide Fields">
      <div className="space-y-3">
        <p className="text-sm text-content-tertiary">
          Select which columns to hide from the table:
        </p>
        <div className="space-y-2">
          {columns.map((column) => (
            <label
              key={column.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={!hiddenColumns.includes(column.id)}
                onChange={() => onToggleColumn(column.id)}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-content-primary">
                {column.label}
              </span>
            </label>
          ))}
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={onClose}
            className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            Apply
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function FilterModal({
  isOpen,
  onClose,
  statusFilter,
  onToggleStatusFilter,
}: {
  isOpen: boolean;
  onClose: () => void;
  statusFilter: string[];
  onToggleStatusFilter: (status: string) => void;
}) {
  const statuses = ["In-process", "Need to start", "Complete", "Blocked"];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filter Data">
      <div className="space-y-3">
        <p className="text-sm text-content-tertiary">Filter by status:</p>
        <div className="space-y-2">
          {statuses.map((status) => (
            <label
              key={status}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={statusFilter.includes(status)}
                onChange={() => onToggleStatusFilter(status)}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-content-primary">{status}</span>
            </label>
          ))}
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={onClose}
            className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            Apply
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function ShareModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Spreadsheet">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-content-primary">
            Share with email:
          </label>
          <input
            type="email"
            placeholder="Enter email address"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-content-primary">
            Permission:
          </label>
          <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none">
            <option>View only</option>
            <option>Can edit</option>
            <option>Can comment</option>
          </select>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-content-secondary hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              alert("Share link sent!");
              onClose();
            }}
            className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            Share
          </button>
        </div>
      </div>
    </Modal>
  );
}
