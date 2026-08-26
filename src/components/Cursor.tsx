import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    // A large lerping blob following the pointer is exactly the kind of motion
    // this preference exists to opt out of; CSS hides it, so skip the work too.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let hover = false;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    let frame = 0;
    const loop = () => {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        gsap.to(cursor, { x: cursorPos.x, y: cursorPos.y, duration: 0.1 });
      }
      frame = requestAnimationFrame(loop);
    };

    // Delegated rather than bound per element: the previous version queried
    // [data-cursor] once on mount, so anything mounted later (lazy sections,
    // re-rendered lists) never got the treatment, and none of the per-element
    // listeners were ever removed.
    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor]"
      );
      if (!target) return;

      if (target.dataset.cursor === "icons") {
        const rect = target.getBoundingClientRect();
        cursor.classList.add("cursor-icons");
        gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.1 });
        cursor.style.setProperty("--cursorH", `${rect.height}px`);
        hover = true;
      }
      if (target.dataset.cursor === "disable") {
        cursor.classList.add("cursor-disable");
      }
    };

    const onOut = (e: MouseEvent) => {
      if (!(e.target as HTMLElement | null)?.closest("[data-cursor]")) return;
      cursor.classList.remove("cursor-disable", "cursor-icons");
      hover = false;
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      gsap.killTweensOf(cursor);
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
