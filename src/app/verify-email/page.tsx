import Link from "next/link";
import { verifyEmailContent } from "@/data/siteData";

export default async function VerifyEmailPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const status = (await searchParams).status;
  const message =
    status === "success"
      ? verifyEmailContent.success
      : status
        ? verifyEmailContent.invalid
        : verifyEmailContent.pending;

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-4">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_12%,rgba(79,70,229,0.28),transparent_26rem),radial-gradient(circle_at_82%_18%,rgba(124,58,237,0.20),transparent_24rem),linear-gradient(135deg,#050812_0%,#0b1020_52%,#111827_100%)]" />
      <div className="glass max-w-lg rounded-[28px] p-8 text-center">
        <h1 className="text-3xl font-black text-white">{verifyEmailContent.title}</h1>
        <p className="mt-4 leading-7 text-slate-300">{message}</p>
        <Link href="/" className="btn-primary mt-6">{verifyEmailContent.portfolioLink}</Link>
      </div>
    </main>
  );
}
