"use client";

interface MarqueeStripProps {
  items: string[];
  speed?: number;
  className?: string;
  separator?: string;
}

export function MarqueeStrip({
  items,
  speed = 30,
  className = "",
  separator = "·",
}: MarqueeStripProps) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items, ...items];
  const duration = `${items.length * speed}s`;

  return (
    <div
      className={`overflow-hidden whitespace-nowrap select-none ${className}`}
      aria-hidden
    >
      <div
        className="inline-flex gap-8"
        style={{
          animation: `marquee ${duration} linear infinite`,
          willChange: "transform",
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-8">
            <span className="font-display text-4xl md:text-5xl font-light text-ink/20 tracking-wide">
              {item}
            </span>
            <span className="font-mono text-xs text-accent">{separator}</span>
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
