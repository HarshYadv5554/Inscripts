import { useState, useCallback, useRef } from "react";

interface ColumnWidths {
  [columnId: string]: number;
}

export function useColumnResize(defaultWidths: ColumnWidths) {
  const [columnWidths, setColumnWidths] = useState<ColumnWidths>(defaultWidths);
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const startPosRef = useRef<number>(0);
  const startWidthRef = useRef<number>(0);

  const handleMouseDown = useCallback(
    (columnId: string, event: React.MouseEvent) => {
      event.preventDefault();
      setIsResizing(columnId);
      startPosRef.current = event.clientX;
      startWidthRef.current = columnWidths[columnId] || 0;

      const handleMouseMove = (e: MouseEvent) => {
        if (isResizing) {
          const deltaX = e.clientX - startPosRef.current;
          const newWidth = Math.max(80, startWidthRef.current + deltaX);
          setColumnWidths((prev) => ({
            ...prev,
            [columnId]: newWidth,
          }));
        }
      };

      const handleMouseUp = () => {
        setIsResizing(null);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [columnWidths, isResizing],
  );

  const resetColumnWidth = useCallback(
    (columnId: string) => {
      setColumnWidths((prev) => ({
        ...prev,
        [columnId]: defaultWidths[columnId],
      }));
    },
    [defaultWidths],
  );

  return {
    columnWidths,
    isResizing,
    handleMouseDown,
    resetColumnWidth,
  };
}
