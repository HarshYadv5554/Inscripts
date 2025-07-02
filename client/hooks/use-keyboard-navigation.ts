import { useState, useEffect, useCallback } from "react";

interface Position {
  row: number;
  col: number;
}

export function useKeyboardNavigation(
  rowCount: number,
  colCount: number,
  onCellSelect?: (row: number, col: number) => void,
) {
  const [selectedCell, setSelectedCell] = useState<Position>({
    row: 0,
    col: 0,
  });
  const [isNavigationActive, setIsNavigationActive] = useState(false);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isNavigationActive) return;

      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          setSelectedCell((prev) => ({
            ...prev,
            row: Math.max(0, prev.row - 1),
          }));
          break;
        case "ArrowDown":
          event.preventDefault();
          setSelectedCell((prev) => ({
            ...prev,
            row: Math.min(rowCount - 1, prev.row + 1),
          }));
          break;
        case "ArrowLeft":
          event.preventDefault();
          setSelectedCell((prev) => ({
            ...prev,
            col: Math.max(0, prev.col - 1),
          }));
          break;
        case "ArrowRight":
          event.preventDefault();
          setSelectedCell((prev) => ({
            ...prev,
            col: Math.min(colCount - 1, prev.col + 1),
          }));
          break;
        case "Escape":
          setIsNavigationActive(false);
          break;
      }
    },
    [isNavigationActive, rowCount, colCount],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (onCellSelect && isNavigationActive) {
      onCellSelect(selectedCell.row, selectedCell.col);
    }
  }, [selectedCell, onCellSelect, isNavigationActive]);

  const activateNavigation = (row: number = 0, col: number = 0) => {
    setSelectedCell({ row, col });
    setIsNavigationActive(true);
  };

  const deactivateNavigation = () => {
    setIsNavigationActive(false);
  };

  return {
    selectedCell,
    isNavigationActive,
    activateNavigation,
    deactivateNavigation,
  };
}
