"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { motion, type Transition } from "framer-motion";

export function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 } as Transition}
      className="flex justify-center lg:justify-end"
    >
      <div className="w-full max-w-[320px] overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-md dark:border-white/[0.07] dark:bg-[#111111] dark:shadow-2xl">
        {/* Profile image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          <Image
            src="/uploads/profile-inomjon.webp"
            alt="Inomjon Toshmirzayev"
            fill
            className="object-cover object-top"
            priority
            sizes="320px"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent dark:from-[#111111]" />
        </div>

        {/* Info */}
        <div className="px-5 pb-5 pt-1">
          <p className="font-serif text-xl font-semibold text-zinc-900 dark:text-white">
            Inomjon Toshmirzayev
          </p>
          <p className="mt-0.5 text-xs font-medium text-zinc-400 dark:text-zinc-500">
            Backend Developer
          </p>

          <div className="mt-4 flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
            <MapPin size={12} />
            Qashqadaryo, Uzbekistan
          </div>

          {/* Status pill */}
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-50 px-3 py-2 dark:bg-emerald-500/5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
              Open to projects
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
