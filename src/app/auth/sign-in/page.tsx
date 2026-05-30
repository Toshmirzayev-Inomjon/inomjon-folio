import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";
import { authPageContent } from "@/data/siteData";

export default function SignInPage() {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-12">
      <div className="w-full">
        <AuthForm mode="sign-in" />
        <p className="mt-5 text-center text-sm text-slate-600">
          {authPageContent.signIn.switchText} <Link href={authPageContent.signIn.switchHref} className="font-bold text-blue-700">{authPageContent.signIn.switchLabel}</Link>
        </p>
      </div>
    </main>
  );
}
