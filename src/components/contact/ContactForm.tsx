"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";

type Status = "idle" | "sending" | "sent";

export function ContactForm() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSend = () => {
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setStatus("sending");
    // Simulate async send — replace with real logic if needed
    setTimeout(() => {
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1200);
  };

  const inputClass =
    "w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-white/20 focus:bg-white/[0.05]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
      className="rounded-2xl border border-white/[0.07] bg-[#111111] p-6"
    >
      <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
        {t.sendLabel}
      </p>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder={t.namePlaceholder}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
        <input
          type="email"
          placeholder={t.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
        <textarea
          rows={5}
          placeholder={t.messagePlaceholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        onClick={handleSend}
        disabled={status !== "idle"}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-black transition-all hover:bg-zinc-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "idle" && (
          <>
            <Send size={14} />
            {t.sendBtn}
          </>
        )}
        {status === "sending" && t.sending}
        {status === "sent" && t.sent}
      </button>
    </motion.div>
  );
}
