"use client";

import { motion, type Transition } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ProjectView } from "@/lib/data";

// Deterministic styles by index — cycles through 6 colour schemes
const CARD_STYLES = [
  {
    gradient: "from-blue-600/25 to-indigo-700/25",
    tagColor: "border-blue-500/30 text-blue-500 dark:text-blue-400",
  },
  {
    gradient: "from-emerald-600/25 to-teal-700/25",
    tagColor: "border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
  },
  {
    gradient: "from-violet-600/25 to-purple-700/25",
    tagColor: "border-violet-500/30 text-violet-600 dark:text-violet-400",
  },
  {
    gradient: "from-amber-600/25 to-orange-700/25",
    tagColor: "border-amber-500/30 text-amber-600 dark:text-amber-400",
  },
  {
    gradient: "from-rose-600/25 to-pink-700/25",
    tagColor: "border-rose-500/30 text-rose-600 dark:text-rose-400",
  },
  {
    gradient: "from-cyan-600/25 to-sky-700/25",
    tagColor: "border-cyan-500/30 text-cyan-600 dark:text-cyan-400",
  },
] as const;

type Props = {
  project: ProjectView;
  index: number;
};

export function ApiProjectCard({ project, index }: Props) {
  const style = CARD_STYLES[index % CARD_STYLES.length];
  const watermark = project.title.charAt(0).toUpperCase();
  const category = project.tags[0]?.name ?? "PROJECT";
  const stackVisible = project.tech_stack.slice(0, 2);
  const overflow = project.tech_stack.length - 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 * index } as Transition}
      className="group flex flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-sm transition-all hover:shadow-md dark:border-white/[0.07] dark:bg-[#111111] dark:shadow-none dark:hover:border-white/[0.12] dark:hover:shadow-2xl"
    >
      {/* Gradient banner */}
      <div
        className={`relative flex h-32 items-center justify-center overflow-hidden bg-gradient-to-br ${style.gradient}`}
      >
        <span className="absolute right-4 top-1/2 -translate-y-1/2 select-none font-serif text-[7rem] font-black leading-none text-black/5 dark:text-white/5">
          {watermark}
        </span>
        {project.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white/70 backdrop-blur-sm">
            Featured
          </span>
        )}
        <span
          className={`relative z-10 rounded-full border bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-sm ${style.tagColor}`}
        >
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg font-bold leading-tight text-zinc-900 dark:text-white">
            {project.title}
          </h3>
          {project.live_link && (
            <a
              href={project.live_link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-0.5 shrink-0 text-zinc-300 transition-all group-hover:text-zinc-700 group-hover:scale-110 dark:text-zinc-600 dark:group-hover:text-white"
            >
              <ArrowUpRight size={16} />
            </a>
          )}
          {!project.live_link && (
            <ArrowUpRight
              size={16}
              className="mt-0.5 shrink-0 text-zinc-200 dark:text-zinc-700"
            />
          )}
        </div>

        <p className="mt-2.5 flex-1 text-xs leading-6 text-zinc-500">{project.description}</p>

        {/* Tech pills */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {stackVisible.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[10px] font-medium text-zinc-500 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-400"
            >
              {tech}
            </span>
          ))}
          {overflow > 0 && (
            <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[10px] font-medium text-zinc-400 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-500">
              +{overflow}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
