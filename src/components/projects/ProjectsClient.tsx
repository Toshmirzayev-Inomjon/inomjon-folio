"use client";

import { motion, type Transition } from "framer-motion";
import { useLanguage } from "@/providers/language-provider";
import { ApiProjectCard } from "@/components/projects/ApiProjectCard";
import type { ProjectView } from "@/lib/data";

type Props = {
  projects: ProjectView[];
};

const ft = (delay = 0): Transition => ({ duration: 0.5, ease: "easeOut", delay });

export function ProjectsClient({ projects }: Props) {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen px-4 pt-28 pb-16">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={ft(0)}
            className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500"
          >
            {t.portfolioLabel}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={ft(0.07)}
            className="mt-4 font-serif text-4xl font-bold text-zinc-900 dark:text-white sm:text-5xl"
          >
            {t.selectedWork}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={ft(0.14)}
            className="mt-4 max-w-xl text-sm leading-7 text-zinc-500 dark:text-zinc-400"
          >
            {t.projectsDesc}
          </motion.p>
        </div>

        {/* Grid */}
        {projects.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={ft(0.2)}
            className="text-sm text-zinc-400"
          >
            No projects yet.
          </motion.p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ApiProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
