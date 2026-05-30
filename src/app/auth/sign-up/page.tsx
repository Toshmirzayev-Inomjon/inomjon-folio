import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";
import { authPageContent } from "@/data/siteData";

export default function SignUpPage() {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-12">
      <div className="w-full">
        <AuthForm mode="sign-up" />
        <p className="mt-5 text-center text-sm text-slate-600">
          {authPageContent.signUp.switchText} <Link href={authPageContent.signUp.switchHref} className="font-bold text-blue-700">{authPageContent.signUp.switchLabel}</Link>
        </p>
      </div>
    </main>
  );
}
