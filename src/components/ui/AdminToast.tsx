"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";

interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

// Simple global toast store (lightweight alternative to sonner for admin)
let listeners: Array<(toasts: ToastMessage[]) => void> = [];
let toastQueue: ToastMessage[] = [];

function notify(type: ToastType, message: string) {
  const id = Math.random().toString(36).slice(2);
  toastQueue = [...toastQueue, { id, type, message }];
  listeners.forEach((l) => l([...toastQueue]));
  setTimeout(() => {
    toastQueue = toastQueue.filter((t) => t.id !== id);
    listeners.forEach((l) => l([...toastQueue]));
  }, 4000);
}

export const adminToast = {
  success: (msg: string) => notify("success", msg),
  error: (msg: string) => notify("error", msg),
  info: (msg: string) => notify("info", msg),
};

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: AlertCircle,
};

const colors = {
  success: "border-green-200 bg-green-50 text-green-800",
  error: "border-red-200 bg-red-50 text-red-800",
  info: "border-paper-border bg-paper text-ink",
};

export function AdminToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    listeners.push(setToasts);
    return () => {
      listeners = listeners.filter((l) => l !== setToasts);
    };
  }, []);

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-2 pointer-events-none">
      {toasts.map(({ id, type, message }) => {
        const Icon = icons[type];
        return (
          <div
            key={id}
            className={cn(
              "flex items-center gap-3 px-4 py-3 border text-sm font-body shadow-lg pointer-events-auto animate-fade-up",
              colors[type]
            )}
          >
            <Icon size={16} className="shrink-0" />
            <span>{message}</span>
          </div>
        );
      })}
    </div>
  );
}
