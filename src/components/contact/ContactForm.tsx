"use client";

import { useState } from "react";
import { motion, type Transition } from "framer-motion";
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
    setTimeout(() => {
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1200);
  };

  const inputClass =
    "w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-colors focus:border-zinc-400 focus:bg-white dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-white/20 dark:focus:bg-white/[0.05]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 } as Transition}
      className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-sm dark:border-white/[0.07] dark:bg-[#111111] dark:shadow-none"
    >
      <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500">
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
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-zinc-100"
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
