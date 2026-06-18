"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/portfolio-data";
import type { Lang } from "@/lib/i18n";

type Props = {
  project: Project;
  lang: Lang;
  index: number;
};

export function ProjectCard({ project, lang, index }: Props) {
  const stackVisible = project.stack.slice(0, 2);
  const overflow = project.stack.length - 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 * index }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111111] transition-all hover:border-white/[0.12] hover:shadow-2xl"
    >
      {/* Gradient header with watermark */}
      <div className={`relative flex h-32 items-center justify-center bg-gradient-to-br ${project.gradient} overflow-hidden`}>
        {/* Watermark */}
        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-serif text-[7rem] font-black leading-none text-white/5 select-none">
          {project.watermark}
        </span>
        {/* Category tag */}
        <span
          className={`relative z-10 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] ${project.tagColor}`}
        >
          {project.category[lang]}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg font-bold text-white leading-tight">{project.title}</h3>
          <ArrowUpRight
            size={16}
            className="mt-0.5 shrink-0 text-zinc-600 transition-all group-hover:text-white group-hover:scale-110"
          />
        </div>

        <p className="mt-2.5 text-xs leading-6 text-zinc-500 flex-1">{project.description[lang]}</p>

        {/* Tech pills */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {stackVisible.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium text-zinc-400"
            >
              {tech}
            </span>
          ))}
          {overflow > 0 && (
            <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium text-zinc-500">
              +{overflow}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
