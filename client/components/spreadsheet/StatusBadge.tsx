import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "In-process" | "Need to start" | "Complete" | "Blocked";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variants = {
    "In-process": "bg-yellow-100 text-yellow-800",
    "Need to start": "bg-platinum-200 text-platinum-600",
    Complete: "bg-green-100 text-green-700",
    Blocked: "bg-red-100 text-red-700",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 rounded-full px-2 py-1 text-xs font-medium",
        variants[status],
      )}
    >
      {status}
    </div>
  );
}
