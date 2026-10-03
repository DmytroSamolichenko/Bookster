"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

export function Pager({
  index,
  onIndex,
  children,
}: {
  index: number;
  onIndex: (index: number) => void;
  children: ReactNode[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const indexRef = useRef(index);
  const [height, setHeight] = useState(0);
  const [offset, setOffset] = useState(0);
  const [animate, setAnimate] = useState(true);
  const start = useRef({ y: 0, t: 0, id: -1, moved: false, interactive: false });
  indexRef.current = index;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setHeight(el.clientHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let locked = false;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 12) return;
      event.preventDefault();
      if (locked) return;
      locked = true;
      const current = indexRef.current;
      const next = event.deltaY > 0 ? Math.min(children.length - 1, current + 1) : Math.max(0, current - 1);
      if (next !== current) onIndex(next);
      window.setTimeout(() => {
        locked = false;
      }, 620);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [children.length, onIndex]);

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    const interactive = event.target instanceof Element && !!event.target.closest("button, a, input, textarea");
    start.current = {
      y: event.clientY,
      t: performance.now(),
      id: event.pointerId,
      moved: false,
      interactive,
    };
    if (interactive) return;
    setAnimate(false);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (start.current.id !== event.pointerId || start.current.interactive) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const scale = bounds.height / Math.max(1, event.currentTarget.offsetHeight);
    let delta = (event.clientY - start.current.y) / (scale || 1);
    if (Math.abs(delta) > 8) start.current.moved = true;
    const atEdge = (index === 0 && delta > 0) || (index === children.length - 1 && delta < 0);
    if (atEdge) delta *= 0.3;
    setOffset(delta);
  }

  function end(event: React.PointerEvent<HTMLDivElement>) {
    if (start.current.id !== event.pointerId) return;
    const delta = event.clientY - start.current.y;
    const velocity = delta / Math.max(1, performance.now() - start.current.t);
    let next = index;
    if (!start.current.interactive && (delta < -52 || velocity < -0.5)) next = Math.min(children.length - 1, index + 1);
    else if (!start.current.interactive && (delta > 52 || velocity > 0.5)) next = Math.max(0, index - 1);
    setOffset(0);
    setAnimate(true);
    start.current.id = -1;
    if (next !== index) onIndex(next);
  }

  return (
    <div
      ref={ref}
      className="pager"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={end}
      onPointerCancel={end}
      onClickCapture={(event) => {
        if (start.current.moved) {
          event.preventDefault();
          event.stopPropagation();
          start.current.moved = false;
        }
      }}
    >
      <div
        className="pager-track"
        style={{
          transform: `translate3d(0, ${-index * height + offset}px, 0)`,
          transition: animate ? "transform 560ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
        }}
      >
        {children.map((child, slide) => (
          <div key={slide} className="pager-slide" style={{ height: height || "100%" }}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
