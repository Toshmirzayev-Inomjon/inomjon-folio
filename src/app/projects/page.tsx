"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { useLanguage } from "@/providers/language-provider";
import { projects } from "@/lib/portfolio-data";

export default function ProjectsPage() {
  const { t, lang } = useLanguage();

  return (
    <main className="min-h-screen px-4 pt-28 pb-16">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500"
          >
            {t.portfolioLabel}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.07 }}
            className="mt-4 font-serif text-4xl font-bold text-white sm:text-5xl"
          >
            {t.selectedWork}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="mt-4 max-w-xl text-sm leading-7 text-zinc-400"
          >
            {t.projectsDesc}
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} lang={lang} index={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
