"use client";

import { useState, type FormEvent } from "react";
import { company } from "@/lib/data";

/**
 * Contact form with no backend: on submit it opens the visitor's mail
 * client with a pre-filled email to the company address.
 */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Website inquiry from ${name || "a visitor"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
  };

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-accent/60";

  return (
    <form onSubmit={handleSubmit} className="card-border rounded-2xl p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-300">Your name</span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            className={inputCls}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-300">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@company.com"
            className={inputCls}
          />
        </label>
      </div>
      <label className="mt-5 block">
        <span className="mb-1.5 block text-sm font-medium text-slate-300">
          What do you want to automate or build?
        </span>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your project, timeline and goals…"
          className={`${inputCls} resize-y`}
        />
      </label>
      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-accent to-viol px-6 py-3.5 text-sm font-semibold text-ink transition-all hover:brightness-110 sm:w-auto"
      >
        Send via email
      </button>
      <p className="mt-3 text-xs text-slate-500">
        This opens your email app with the message addressed to {company.email}. No data is stored
        on this website.
      </p>
    </form>
  );
}
