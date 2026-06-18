"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

export function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
      className="flex justify-center lg:justify-end"
    >
      <div className="w-full max-w-[320px] overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111111] shadow-2xl">
        {/* Profile image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
          <Image
            src="/uploads/profile-inomjon.webp"
            alt="Inomjon Toshmirzayev"
            fill
            className="object-cover object-top"
            priority
            sizes="320px"
          />
          {/* Gradient overlay bottom */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#111111] to-transparent" />
        </div>

        {/* Info */}
        <div className="px-5 pb-5 pt-1">
          <p className="font-serif text-xl font-semibold text-white">Inomjon Toshmirzayev</p>
          <p className="mt-0.5 text-xs font-medium text-zinc-500">Backend Developer</p>

          <div className="mt-4 flex items-center gap-1.5 text-xs text-zinc-500">
            <MapPin size={12} className="text-zinc-600" />
            Qashqadaryo, Uzbekistan
          </div>

          {/* Status pill */}
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/15 bg-emerald-500/5 px-3 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-emerald-400">Open to projects</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
