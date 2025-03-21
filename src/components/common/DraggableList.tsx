import { useRef, useState, useEffect, ReactNode } from "react";

interface DraggableListProps {
  items: string[];
  className?: string;
  itemClassName?: string;
  renderItem?: (item: string, index: number) => ReactNode;
}

const DraggableList = ({
  items,
  className = "",
  itemClassName = "",
  renderItem,
}: DraggableListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        const hasHorizontalOverflow =
          containerRef.current.scrollWidth > containerRef.current.clientWidth;
        setHasOverflow(hasHorizontalOverflow);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    const timer = setTimeout(checkOverflow, 500);
    return () => {
      window.removeEventListener("resize", checkOverflow);
      clearTimeout(timer);
    };
  }, [items]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !hasOverflow) return;

    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    // * Move the scroll
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMouseMove(e);
    const onMouseUp = () => handleMouseUp();

    if (isDragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, startX, scrollLeft]);

  const defaultContainerClass = "invisible-scroll flex items-center gap-2 overflow-x-auto rounded-lg p-1";
  const defaultItemClass = "flex-shrink-0 whitespace-nowrap rounded-sm bg-project-secondary px-2 py-0.5 text-sm font-semibold shadow-sm dark:text-black/90";

  return (
    <div
      ref={containerRef}
      className={`${defaultContainerClass} ${className} ${hasOverflow ? "cursor-grab" : ""} ${isDragging ? "cursor-grabbing" : ""}`}
      onMouseDown={handleMouseDown}
      onDragStart={(e) => e.preventDefault()}
    >
      {items.map((item, index) =>
        renderItem ? (
          renderItem(item, index)
        ) : (
          <span key={index} className={`${defaultItemClass} ${itemClassName}`}>
            {item}
          </span>
        ),
      )}
    </div>
  );
};

export default DraggableList;
