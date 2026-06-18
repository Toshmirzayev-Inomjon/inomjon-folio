"use client";

import { motion } from "framer-motion";
import { ContactInfoCards } from "@/components/contact/ContactInfoCards";
import { ContactForm } from "@/components/contact/ContactForm";
import { useLanguage } from "@/providers/language-provider";

export default function ContactPage() {
  const { t } = useLanguage();

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
            {t.getInTouch}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.07 }}
            className="mt-4 max-w-2xl font-serif text-3xl font-bold leading-tight text-zinc-900 dark:text-white sm:text-4xl"
          >
            {t.contactHeadline}
          </motion.h1>
        </div>

        {/* Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          <ContactInfoCards />
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
