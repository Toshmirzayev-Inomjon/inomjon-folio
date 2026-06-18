"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/providers/language-provider";
import type { Lang } from "@/lib/i18n";

const LANG_VALUES: Lang[] = ["en", "uz", "ru"];

export function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const navLinks = [
    { href: "/", label: t.home },
    { href: "/about", label: t.about },
    { href: "/projects", label: t.projects },
    { href: "/contact", label: t.contact },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="flex items-center gap-1 rounded-full border border-black/10 bg-white/90 px-4 py-2 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-[#111111]/90 dark:shadow-xl">
        {/* Logo */}
        <Link
          href="/"
          className="mr-4 whitespace-nowrap font-serif text-base font-semibold tracking-tight text-zinc-900 dark:text-white/90"
        >
          Toshmirzayev
        </Link>

        {/* Nav links */}
        <div className="hidden items-center gap-0.5 md:flex">
          {navLinks.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-zinc-900/10 text-zinc-900 dark:bg-white/10 dark:text-white"
                    : "text-zinc-500 hover:bg-zinc-900/5 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Controls */}
        <div className="ml-4 flex items-center gap-1">
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-900/8 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          )}

          {/* Language dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-8 min-w-[2.5rem] items-center justify-center rounded-full px-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 transition-colors hover:bg-zinc-900/8 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {lang.toUpperCase()}
            </button>
            {open && (
              <div className="absolute right-0 top-10 min-w-[80px] overflow-hidden rounded-xl border border-black/10 bg-white shadow-xl dark:border-white/10 dark:bg-[#1a1a1a]">
                {LANG_VALUES.map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setOpen(false); }}
                    className={`block w-full px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider transition-colors ${
                      lang === l
                        ? "bg-zinc-900/10 text-zinc-900 dark:bg-white/10 dark:text-white"
                        : "text-zinc-500 hover:bg-zinc-900/5 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
