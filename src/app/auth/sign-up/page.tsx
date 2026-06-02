import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";
import { authPageContent } from "@/data/siteData";

export default function SignUpPage() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-4 py-12">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_12%,rgba(79,70,229,0.28),transparent_26rem),radial-gradient(circle_at_82%_18%,rgba(124,58,237,0.20),transparent_24rem),linear-gradient(135deg,#050812_0%,#0b1020_52%,#111827_100%)]" />
      <div className="w-full">
        <AuthForm mode="sign-up" />
        <p className="mt-5 text-center text-sm text-slate-400">
          {authPageContent.signUp.switchText} <Link href={authPageContent.signUp.switchHref} className="font-black text-indigo-200 transition hover:text-white">{authPageContent.signUp.switchLabel}</Link>
        </p>
      </div>
    </main>
  );
}
