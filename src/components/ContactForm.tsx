"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import type { Translation } from "@/lib/translations";

export function ContactForm({ onAuthRequired, t }: { onAuthRequired?: () => void; t: Translation }) {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const session = await fetch("/api/auth/me").then((res) => res.json()).catch(() => ({ user: null }));
    if (!session.user || !session.user.emailVerified) {
      setStatus(session.user ? t.verifyRequired : t.authRequired);
      onAuthRequired?.();
      return;
    }
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form))
    });
    const data = await res.json();
    setStatus(res.ok ? t.sent : data.message ?? t.sendFailed);
    setLoading(false);
    if (res.ok) event.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input className="field" name="name" placeholder={t.name} required />
        <input className="field" name="email" type="email" placeholder={t.email} required />
      </div>
      <input className="field" name="subject" placeholder={t.subject} required />
      <textarea className="field min-h-36 resize-y" name="body" placeholder={t.message} required />
      <div className="flex flex-wrap items-center gap-3">
        <button className="btn-primary" disabled={loading}>
          <Send size={17} />
          {loading ? t.sending : t.send}
        </button>
        {status && <p className="text-sm font-medium text-[#c8d3bf]">{status}</p>}
      </div>
    </form>
  );
}
