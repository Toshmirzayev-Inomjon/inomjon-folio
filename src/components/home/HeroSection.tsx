"use client";

import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail, Send } from "lucide-react";
import { motion, type Transition } from "framer-motion";
import { useLanguage } from "@/providers/language-provider";
import { socialLinks } from "@/lib/portfolio-data";

const ft = (delay = 0): Transition => ({ duration: 0.55, ease: "easeOut", delay });

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col justify-center">
      {/* Available badge */}
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={ft(0)} className="mb-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:bg-emerald-500/5 dark:text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {t.available}
        </span>
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={ft(0.08)}
        className="font-serif text-6xl font-bold leading-[1.05] tracking-tight text-zinc-900 dark:text-white sm:text-7xl lg:text-8xl"
      >
        {t.heroTitle1}
        <br />
        <span className="text-zinc-400 dark:text-zinc-500">{t.heroTitle2}</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={ft(0.16)}
        className="mt-5 text-base font-medium uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500"
      >
        {t.heroSubtitle}
      </motion.p>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={ft(0.22)}
        className="mt-5 max-w-md text-sm leading-7 text-zinc-500 dark:text-zinc-400"
      >
        {t.heroDesc}
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={ft(0.3)}
        className="mt-8 flex flex-wrap gap-3"
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-zinc-700 active:scale-95 dark:bg-white dark:text-black dark:hover:bg-zinc-100"
        >
          {t.viewProjects}
          <ArrowRight size={15} />
        </Link>
        <Link
          href="/about"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-6 py-2.5 text-sm font-semibold text-zinc-700 transition-all hover:border-zinc-400 hover:bg-zinc-100 active:scale-95 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
        >
          {t.learnMore}
        </Link>
      </motion.div>

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={ft(0.38)}
        className="mt-8 flex items-center gap-3"
      >
        {[
          { href: socialLinks.github, icon: Github, label: "GitHub" },
          { href: socialLinks.linkedin, icon: Linkedin, label: "LinkedIn" },
          { href: socialLinks.telegram, icon: Send, label: "Telegram" },
          { href: socialLinks.email, icon: Mail, label: "Email" },
        ].map(({ href, icon: Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-400 transition-all hover:border-zinc-400 hover:text-zinc-900 hover:scale-110 dark:border-white/10 dark:text-zinc-500 dark:hover:border-white/20 dark:hover:text-white"
          >
            <Icon size={15} />
          </a>
        ))}
      </motion.div>
    </div>
  );
}
