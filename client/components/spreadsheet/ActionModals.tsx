import { useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import { SpreadsheetRow } from "@/lib/spreadsheet-types";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
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

export function NewActionModal({
  isOpen,
  onClose,
  onCreateAction,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreateAction: (action: Partial<SpreadsheetRow>) => void;
}) {
  const [formData, setFormData] = useState({
    jobRequest: "",
    submitter: "",
    url: "",
    assigned: "",
    priority: "Medium" as const,
    dueDate: "",
    estValue: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAction: Partial<SpreadsheetRow> = {
      ...formData,
      id: Date.now(),
      submitted: new Date().toLocaleDateString("en-GB"),
      status: "Need to start",
      estValue: parseInt(formData.estValue) || 0,
    };
    onCreateAction(newAction);
    setFormData({
      jobRequest: "",
      submitter: "",
      url: "",
      assigned: "",
      priority: "Medium",
      dueDate: "",
      estValue: "",
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Action">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-content-primary">
            Job Request *
          </label>
          <input
            type="text"
            required
            value={formData.jobRequest}
            onChange={(e) =>
              setFormData({ ...formData, jobRequest: e.target.value })
            }
            placeholder="Describe the task or request"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-content-primary">
              Submitter *
            </label>
            <input
              type="text"
              required
              value={formData.submitter}
              onChange={(e) =>
                setFormData({ ...formData, submitter: e.target.value })
              }
              placeholder="Your name"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-content-primary">
              Assigned To
            </label>
            <input
              type="text"
              value={formData.assigned}
              onChange={(e) =>
                setFormData({ ...formData, assigned: e.target.value })
              }
              placeholder="Assign to team member"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-content-primary">
            URL/Reference
          </label>
          <input
            type="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            placeholder="https://example.com"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-content-primary">
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  priority: e.target.value as typeof formData.priority,
                })
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-content-primary">
              Due Date
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-content-primary">
              Est. Value (₹)
            </label>
            <input
              type="number"
              value={formData.estValue}
              onChange={(e) =>
                setFormData({ ...formData, estValue: e.target.value })
              }
              placeholder="0"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-content-secondary hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            Create Action
          </button>
        </div>
      </form>
    </Modal>
  );
}

export function SortModal({
  isOpen,
  onClose,
  onApplySort,
}: {
  isOpen: boolean;
  onClose: () => void;
  onApplySort: (
    sortRules: Array<{ key: keyof SpreadsheetRow; direction: "asc" | "desc" }>,
  ) => void;
}) {
  const [sortRules, setSortRules] = useState<
    Array<{ key: keyof SpreadsheetRow; direction: "asc" | "desc" }>
  >([{ key: "submitted", direction: "desc" }]);

  const columns = [
    { key: "jobRequest", label: "Job Request" },
    { key: "submitted", label: "Submitted" },
    { key: "status", label: "Status" },
    { key: "submitter", label: "Submitter" },
    { key: "assigned", label: "Assigned" },
    { key: "priority", label: "Priority" },
    { key: "dueDate", label: "Due Date" },
    { key: "estValue", label: "Est. Value" },
  ] as const;

  const addSortRule = () => {
    setSortRules([...sortRules, { key: "jobRequest", direction: "asc" }]);
  };

  const removeSortRule = (index: number) => {
    setSortRules(sortRules.filter((_, i) => i !== index));
  };

  const updateSortRule = (index: number, field: string, value: string) => {
    const updated = [...sortRules];
    if (field === "key") {
      updated[index].key = value as keyof SpreadsheetRow;
    } else {
      updated[index].direction = value as "asc" | "desc";
    }
    setSortRules(updated);
  };

  const handleApply = () => {
    onApplySort(sortRules);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Advanced Sort">
      <div className="space-y-4">
        <p className="text-sm text-content-tertiary">
          Add multiple sort criteria. Data will be sorted by the first rule,
          then by the second, and so on.
        </p>

        <div className="space-y-3">
          {sortRules.map((rule, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="flex-1">
                <select
                  value={rule.key}
                  onChange={(e) => updateSortRule(index, "key", e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
                >
                  {columns.map((col) => (
                    <option key={col.key} value={col.key}>
                      {col.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-32">
                <select
                  value={rule.direction}
                  onChange={(e) =>
                    updateSortRule(index, "direction", e.target.value)
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
                >
                  <option value="asc">A → Z</option>
                  <option value="desc">Z → A</option>
                </select>
              </div>
              {sortRules.length > 1 && (
                <button
                  onClick={() => removeSortRule(index)}
                  className="rounded-md p-2 text-red-600 hover:bg-red-50"
                >
                  <Minus className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={addSortRule}
          className="flex items-center gap-2 rounded-md border border-dashed border-gray-300 px-3 py-2 text-sm text-content-secondary hover:bg-gray-50"
        >
          <Plus className="h-4 w-4" />
          Add another sort level
        </button>

        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-content-secondary hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            Apply Sort
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function AddTabModal({
  isOpen,
  onClose,
  onAddTab,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddTab: (tabName: string) => void;
}) {
  const [tabName, setTabName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tabName.trim()) {
      onAddTab(tabName.trim());
      setTabName("");
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New View">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-content-primary">
            View Name
          </label>
          <input
            type="text"
            required
            value={tabName}
            onChange={(e) => setTabName(e.target.value)}
            placeholder="Enter view name (e.g., 'In Review', 'Completed')"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <p className="text-xs text-content-tertiary">
            This will create a new view tab that you can use to organize and
            filter your data.
          </p>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-content-secondary hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            Add View
          </button>
        </div>
      </form>
    </Modal>
  );
}
