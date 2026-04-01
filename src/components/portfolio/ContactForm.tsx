"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, CheckCircle } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/validations";

const serviceOptions = [
  { value: "brand-identity", label: "Logo & Brand Identity" },
  { value: "social-media", label: "Social Media Design" },
  { value: "ui-ux", label: "UI/UX & Web Design" },
  { value: "print-illustration", label: "Print & Illustration" },
  { value: "other", label: "Something Else" },
];

const budgetOptions = [
  { value: "under-500", label: "Under $500" },
  { value: "500-1500", label: "$500 – $1,500" },
  { value: "1500-5000", label: "$1,500 – $5,000" },
  { value: "5000-plus", label: "$5,000+" },
  { value: "tbd", label: "To be discussed" },
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();

      setSubmitted(true);
      reset();
    } catch {
      toast.error("Failed to send message. Please try again or email directly.");
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4 py-16">
        <CheckCircle size={40} className="text-accent" strokeWidth={1.5} />
        <h2 className="font-display text-3xl text-ink">Message received.</h2>
        <p className="text-ink-muted leading-relaxed max-w-md">
          Thank you for reaching out. I'll get back to you within 24–48 hours to discuss your project.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="label hover:text-ink transition-colors mt-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Full Name *</label>
          <input
            {...register("name")}
            className="form-input"
            placeholder="Your name"
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="form-label">Email *</label>
          <input
            {...register("email")}
            type="email"
            className="form-input"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Company */}
      <div>
        <label className="form-label">Company / Organisation</label>
        <input
          {...register("company")}
          className="form-input"
          placeholder="Optional"
        />
      </div>

      {/* Service + Budget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="form-label">Service Needed *</label>
          <select {...register("service")} className="form-input">
            <option value="">Select a service</option>
            {serviceOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="text-xs text-red-500 mt-1">{errors.service.message}</p>
          )}
        </div>
        <div>
          <label className="form-label">Budget Range</label>
          <select {...register("budget")} className="form-input">
            <option value="">Select a range</option>
            {budgetOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {errors.budget && (
            <p className="text-xs text-red-500 mt-1">{errors.budget.message}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="form-label">Message *</label>
        <textarea
          {...register("message")}
          rows={6}
          className="form-input resize-none"
          placeholder="Tell me about your project, goals, and timeline…"
        />
        {errors.message && (
          <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center">
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending…
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
