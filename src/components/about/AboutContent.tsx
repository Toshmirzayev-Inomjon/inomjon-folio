"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { motion, type Transition } from "framer-motion";
import { useLanguage } from "@/providers/language-provider";
import { techStack } from "@/lib/portfolio-data";

const fadeTransition = (delay = 0): Transition => ({
  duration: 0.55,
  ease: "easeOut",
  delay,
});

export function AboutContent() {
  const { t } = useLanguage();

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
      {/* Left: text */}
      <div>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fadeTransition(0)}
          className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500"
        >
          {t.aboutLabel}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fadeTransition(0.07)}
          className="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl"
        >
          Inomjon Toshmirzayev
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fadeTransition(0.14)}
          className="mt-6 text-sm leading-7 text-zinc-400"
        >
          {t.aboutDesc}
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fadeTransition(0.2)}
          className="mt-8 grid grid-cols-2 gap-4"
        >
          {[
            { value: "3+", label: t.yearsExp },
            { value: "10+", label: t.projectsDone },
          ].map(({ value, label }) => (
            <div key={label} className="rounded-2xl border border-white/[0.07] bg-[#111111] p-5">
              <p className="font-serif text-4xl font-bold text-white">{value}</p>
              <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={fadeTransition(0.27)}
          className="mt-8"
        >
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
            {t.techStackLabel}
          </p>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/[0.1] bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right: profile image card */}
      <motion.div
        initial={{ opacity: 0, x: 32 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 } as Transition}
        className="flex justify-center"
      >
        <div className="w-full max-w-[300px] overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111111] shadow-2xl">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900">
            <Image
              src="/uploads/profile-inomjon.webp"
              alt="Inomjon Toshmirzayev"
              fill
              className="object-cover object-top"
              sizes="300px"
            />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#111111] to-transparent" />
          </div>
          <div className="px-5 pb-5 pt-1">
            <p className="font-serif text-lg font-semibold text-white">Inomjon Toshmirzayev</p>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500">
              <MapPin size={11} />
              Qashqadaryo, Uzbekistan
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
