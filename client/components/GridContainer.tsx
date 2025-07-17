import React, { memo, useLayoutEffect, useRef } from "react";

interface GridContainerProps {
  children: React.ReactNode;
  columns?: number;
  className?: string;
  equalizeHeights?: boolean;
}

const GridContainer = memo(
  ({
    children,
    columns = 2,
    className = "",
    equalizeHeights = false,
  }: GridContainerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      if (!equalizeHeights) return;

      const container = containerRef.current;
      if (!container) return;

      const equalizeCardHeights = () => {
        const cards = Array.from(container.children) as HTMLElement[];
        if (cards.length === 0) return;

        cards.forEach((card) => {
          card.style.height = "auto";
        });

        const maxHeight = Math.max(...cards.map((card) => card.offsetHeight));

        cards.forEach((card) => {
          card.style.height = `${maxHeight}px`;
        });
      };

      equalizeCardHeights();
      window.addEventListener("resize", equalizeCardHeights);

      return () => window.removeEventListener("resize", equalizeCardHeights);
    }, [equalizeHeights]);

    const gridCols = {
      1: "grid-cols-1",
      2: "grid-cols-1 lg:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    }[columns];

    return (
      <div ref={containerRef} className={`grid ${gridCols} gap-8 ${className}`}>
        {children}
      </div>
    );
  },
);

GridContainer.displayName = "GridContainer";

export { GridContainer };
