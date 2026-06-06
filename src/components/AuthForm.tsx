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
    <form onSubmit={onSubmit} className="mx-auto grid w-full max-w-4xl overflow-hidden rounded-[30px] border border-white/10 bg-[#070b17]/[0.88] shadow-[0_34px_110px_rgba(0,0,0,0.38)] backdrop-blur-xl md:grid-cols-[0.9fr_1.1fr]">
      <div className="relative hidden min-h-[520px] overflow-hidden border-r border-white/10 bg-[linear-gradient(135deg,rgba(37,99,235,0.22),rgba(124,58,237,0.18)),#080d19] p-8 md:flex md:flex-col md:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(96,165,250,0.20),transparent_20rem),radial-gradient(circle_at_82%_70%,rgba(168,85,247,0.20),transparent_18rem)]" />
        <div className="relative">
          <span className="grid h-12 w-12 place-items-center rounded-2xl border border-indigo-300/30 bg-indigo-500/[0.18] text-sm font-black text-white">IT</span>
          <h2 className="mt-6 text-3xl font-black leading-tight text-white">Inomjon Toshmirzayev</h2>
          <p className="mt-3 font-bold text-indigo-100">Full-stack Dasturchi</p>
          <p className="mt-5 leading-7 text-slate-300">Xavfsiz aloqa va admin imkoniyatlari uchun akkaunt orqali kiring.</p>
        </div>
        <div className="relative rounded-2xl border border-white/10 bg-black/[0.26] p-5 font-mono text-sm leading-7 text-slate-300">
          <p><span className="text-indigo-300">auth</span>.status = <span className="text-white">"secure"</span></p>
          <p><span className="text-blue-300">role</span> = <span className="text-white">"portfolio user"</span></p>
          <p><span className="text-purple-300">panel</span> = <span className="text-white">"premium"</span></p>
        </div>
      </div>

      <div className="grid gap-5 p-6 sm:p-8">
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
      </div>
    </form>
  );
}
