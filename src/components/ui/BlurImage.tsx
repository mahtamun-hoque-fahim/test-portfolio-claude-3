"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface BlurImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  wrapperClassName?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

export function BlurImage({
  src,
  alt,
  width,
  height,
  fill,
  className,
  wrapperClassName,
  priority = false,
  sizes,
  quality = 85,
}: BlurImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)}>
      {/* Skeleton shimmer shown until image loads */}
      <div
        className={cn(
          "absolute inset-0 skeleton transition-opacity duration-500",
          loaded ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        aria-hidden
      />

      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        sizes={sizes}
        quality={quality}
        onLoad={() => setLoaded(true)}
        className={cn(
          "transition-opacity duration-700 ease-in-out",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
      />
    </div>
  );
}
