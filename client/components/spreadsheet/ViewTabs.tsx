import { Plus } from "lucide-react";
import { ViewTab } from "@/lib/spreadsheet-types";
import { cn } from "@/lib/utils";

interface ViewTabsProps {
  tabs: ViewTab[];
  onTabChange?: (tabId: string) => void;
}

export function ViewTabs({ tabs, onTabChange }: ViewTabsProps) {
  return (
    <div className="flex items-center gap-6 border-t border-surface-tertiary bg-white px-8 py-1">
      <div className="flex items-start">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-base font-medium transition-colors",
              tab.isActive
                ? "border-t-2 border-brand-600 bg-brand-50 text-brand-700"
                : "text-content-tertiary hover:text-content-primary",
            )}
          >
            {tab.label}
            {tab.count && (
              <span className="rounded bg-content-tertiary px-1.5 py-0.5 text-xs text-white">
                {tab.count}
              </span>
            )}
          </button>
        ))}

        {/* Add tab button */}
        <button
          onClick={() => onAddTab?.()}
          className="flex items-center justify-center px-1 py-2 hover:bg-gray-50 rounded"
        >
          <div className="flex items-center rounded bg-white p-1 hover:bg-gray-100 transition-colors">
            <Plus className="h-5 w-5 text-content-tertiary" />
          </div>
        </button>
      </div>
    </div>
  );
}
