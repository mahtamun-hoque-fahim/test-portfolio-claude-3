"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on pointer-fine devices (not touch)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot snaps instantly
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    // Ring follows with lag
    function animate() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring!.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      rafId = requestAnimationFrame(animate);
    }

    const onEnterInteractive = () => {
      ring?.classList.add("scale-[2.5]", "opacity-40");
      dot?.classList.add("scale-0");
    };
    const onLeaveInteractive = () => {
      ring?.classList.remove("scale-[2.5]", "opacity-40");
      dot?.classList.remove("scale-0");
    };
    const onEnterImage = () => {
      ring?.classList.add("scale-[3.5]", "mix-blend-difference", "bg-ink", "border-transparent");
    };
    const onLeaveImage = () => {
      ring?.classList.remove("scale-[3.5]", "mix-blend-difference", "bg-ink", "border-transparent");
    };

    document.addEventListener("mousemove", onMove, { passive: true });

    // Interactive elements
    const interactiveEls = () => document.querySelectorAll("a, button, [role='button'], input, select, textarea");
    const imageEls = () => document.querySelectorAll(".group, .img-overlay");

    const addListeners = () => {
      interactiveEls().forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
      imageEls().forEach((el) => {
        el.addEventListener("mouseenter", onEnterImage);
        el.addEventListener("mouseleave", onLeaveImage);
      });
    };

    addListeners();
    rafId = requestAnimationFrame(animate);

    // Show cursor
    dot.style.opacity = "1";
    ring.style.opacity = "1";

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-ink rounded-full pointer-events-none z-[9999] opacity-0 transition-transform duration-75"
        aria-hidden
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-ink rounded-full pointer-events-none z-[9998] opacity-0 transition-[transform,opacity,background-color,border-color] duration-300 ease-out-expo"
        aria-hidden
      />
    </>
  );
}
