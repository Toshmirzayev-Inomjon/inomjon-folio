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
    <main className="grid min-h-screen place-items-center px-4">
      <div className="glass max-w-lg rounded-[28px] p-8 text-center">
        <h1 className="text-3xl font-black">{verifyEmailContent.title}</h1>
        <p className="mt-4 leading-7 text-slate-600">{message}</p>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 font-bold text-white">{verifyEmailContent.portfolioLink}</Link>
      </div>
    </main>
  );
}
