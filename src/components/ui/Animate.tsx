"use client";

import { useRef, useEffect, useState, type ReactNode, type CSSProperties, type ElementType } from "react";
import { cn } from "@/lib/utils";

interface AnimateProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
  threshold?: number;
  style?: CSSProperties;
  as?: ElementType;
}

export function Animate({
  children,
  className,
  delay = 0,
  duration = 700,
  y = 28,
  once = true,
  threshold = 0.1,
  style,
  as: Tag = "div",
}: AnimateProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -48px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  const animStyle: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0px)" : `translateY(${y}px)`,
    transition: `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    ...style,
  };

  const Component = Tag as ElementType;
  return (
    <Component ref={ref} className={className} style={animStyle}>
      {children}
    </Component>
  );
}

export function AnimateGroup({
  children,
  className,
  stagger = 80,
  delay = 0,
  style,
}: {
  children: ReactNode[];
  className?: string;
  stagger?: number;
  delay?: number;
  style?: CSSProperties;
}) {
  return (
    <div className={className} style={style}>
      {children.map((child, i) => (
        <Animate key={i} delay={delay + i * stagger}>
          {child}
        </Animate>
      ))}
    </div>
  );
}
