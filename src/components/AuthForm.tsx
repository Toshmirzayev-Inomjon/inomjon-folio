"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { authPageContent } from "@/data/siteData";

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const content = mode === "sign-in" ? authPageContent.signIn : authPageContent.signUp;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const res = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form))
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok && mode === "sign-in") {
      router.push(data.user?.role === "ADMIN" ? "/inomjon0751" : "/");
    }
    setMessage(data.message ?? content.success);
  }

  return (
    <form onSubmit={onSubmit} className="glass mx-auto grid w-full max-w-md gap-5 rounded-[28px] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.34)] sm:p-7">
      <div>
        <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl border border-indigo-400/30 bg-indigo-500/15 text-indigo-100">
          <ShieldCheck size={22} />
        </div>
        <h1 className="text-3xl font-black text-white">{content.title}</h1>
        <p className="mt-2 text-sm leading-6 text-slate-300">{content.description}</p>
      </div>
      <label className="relative">
        <Mail className="absolute left-4 top-3.5 text-slate-500" size={18} />
        <input className="field pl-11" name="email" type="email" placeholder={authPageContent.fields.email} required />
      </label>
      <label className="relative">
        <LockKeyhole className="absolute left-4 top-3.5 text-slate-500" size={18} />
        <input className="field pl-11" name="password" type="password" placeholder={authPageContent.fields.password} required minLength={8} />
      </label>
      <button className="btn-primary w-full" disabled={loading}>
        {loading ? authPageContent.actions.pleaseWait : mode === "sign-in" ? content.title : authPageContent.actions.createAccount}
        {!loading && <ArrowRight size={17} />}
      </button>
      {message && <p className="rounded-2xl border border-indigo-300/20 bg-indigo-500/10 px-4 py-3 text-sm font-bold text-indigo-100">{message}</p>}
    </form>
  );
}
