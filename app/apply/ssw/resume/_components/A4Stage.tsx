"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

export default function A4Stage({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const updateScale = () => {
      const width = wrapper.clientWidth;
      if (width > 0) setScale(Math.min(1, width / A4_WIDTH_PX));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative mx-auto w-full overflow-hidden rounded-sm bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.3)]"
      style={{ maxWidth: A4_WIDTH_PX, aspectRatio: `${A4_WIDTH_PX} / ${A4_HEIGHT_PX}` }}
    >
      <div
        style={{
          width: A4_WIDTH_PX,
          height: A4_HEIGHT_PX,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
