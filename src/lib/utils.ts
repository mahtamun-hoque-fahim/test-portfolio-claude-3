import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import slugifyLib from "slugify";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string) {
  return slugifyLib(text, {
    lower: true,
    strict: true,
    trim: true,
  });
}

export function formatDate(date: Date | string | null, pattern = "MMM yyyy") {
  if (!date) return "";
  return format(new Date(date), pattern);
}

export function formatDateFull(date: Date | string | null) {
  if (!date) return "";
  return format(new Date(date), "d MMMM yyyy");
}

export function truncate(str: string, maxLength: number) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + "…";
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
