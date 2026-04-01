"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface LightboxImage {
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

interface LightboxProps {
  images: LightboxImage[];
  initialIndex?: number;
  onClose: () => void;
}

export function Lightbox({ images, initialIndex = 0, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [zoomed, setZoomed] = useState(false);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
    setZoomed(false);
  }, [images.length]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
    setZoomed(false);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  // Touch swipe
  useEffect(() => {
    let startX = 0;
    const onTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const onTouchEnd = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 60) diff > 0 ? next() : prev();
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [prev, next]);

  const current = images[index];

  return (
    <div
      className="fixed inset-0 z-[200] bg-ink/95 flex flex-col"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 shrink-0">
        <span className="font-mono text-xs text-paper/40 tracking-widest uppercase">
          {index + 1} / {images.length}
        </span>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setZoomed((z) => !z)}
            className="text-paper/60 hover:text-paper transition-colors"
            title="Toggle zoom"
          >
            <ZoomIn size={18} />
          </button>
          <button
            onClick={onClose}
            className="text-paper/60 hover:text-paper transition-colors"
            title="Close (Esc)"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Image area */}
      <div className="flex-1 flex items-center justify-center relative px-16 overflow-hidden">
        {/* Prev */}
        {images.length > 1 && (
          <button
            onClick={prev}
            className="absolute left-4 z-10 p-2 text-paper/60 hover:text-paper transition-colors"
            title="Previous (←)"
          >
            <ChevronLeft size={28} />
          </button>
        )}

        {/* Image */}
        <div
          className={cn(
            "relative max-h-full transition-transform duration-500 ease-out-expo cursor-zoom-in",
            zoomed ? "scale-150 cursor-zoom-out" : "scale-100"
          )}
          onClick={() => setZoomed((z) => !z)}
        >
          <img
            src={current.url}
            alt={current.alt}
            className="max-h-[75vh] max-w-full w-auto object-contain select-none"
            draggable={false}
          />
        </div>

        {/* Next */}
        {images.length > 1 && (
          <button
            onClick={next}
            className="absolute right-4 z-10 p-2 text-paper/60 hover:text-paper transition-colors"
            title="Next (→)"
          >
            <ChevronRight size={28} />
          </button>
        )}
      </div>

      {/* Caption + thumbnails */}
      <div className="shrink-0 px-6 pb-6">
        {current.caption && (
          <p className="text-center text-sm text-paper/50 font-mono mb-4">
            {current.caption}
          </p>
        )}
        {images.length > 1 && (
          <div className="flex justify-center gap-2 flex-wrap">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => { setIndex(i); setZoomed(false); }}
                className={cn(
                  "w-12 h-12 overflow-hidden border-2 transition-all duration-200",
                  i === index ? "border-accent" : "border-transparent opacity-50 hover:opacity-80"
                )}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Trigger component ─────────────────────────────────────────
interface GalleryProps {
  images: LightboxImage[];
  className?: string;
}

export function Gallery({ images, className }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!images.length) return null;

  return (
    <>
      <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-px bg-paper-border", className)}>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="group relative overflow-hidden bg-paper-warm aspect-video text-left"
            title="Click to enlarge"
          >
            <img
              src={img.url}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn
                size={24}
                className="text-paper opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            {img.caption && (
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-ink/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-xs text-paper font-mono">{img.caption}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
