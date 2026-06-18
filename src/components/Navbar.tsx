"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/providers/language-provider";
import type { Lang } from "@/lib/i18n";

const langs: Lang[] = ["EN" as Lang, "UZ" as Lang, "RU" as Lang];
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
      <nav className="flex items-center gap-1 rounded-full border border-white/10 bg-[#111111]/90 px-4 py-2 shadow-xl backdrop-blur-md dark:bg-[#111111]/90">
        {/* Logo */}
        <Link
          href="/"
          className="mr-4 font-serif text-base font-semibold tracking-tight text-white/90 whitespace-nowrap"
        >
          Toshmirzayev
        </Link>

        {/* Nav links — hidden on small screens */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Controls */}
        <div className="ml-4 flex items-center gap-1">
          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          )}

          {/* Language dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-8 min-w-[2.5rem] items-center justify-center rounded-full px-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              {lang.toUpperCase()}
            </button>
            {open && (
              <div className="absolute right-0 top-10 min-w-[80px] overflow-hidden rounded-xl border border-white/10 bg-[#1a1a1a] shadow-2xl">
                {LANG_VALUES.map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setOpen(false); }}
                    className={`block w-full px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider transition-colors ${
                      lang === l ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"
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
