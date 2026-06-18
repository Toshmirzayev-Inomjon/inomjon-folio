import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/playfair-display/800.css";
import "@fontsource/playfair-display/900.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { LanguageProvider } from "@/providers/language-provider";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://toshmirzayev-inomjon.online"),
  title: "Inomjon Toshmirzayev | Backend Developer",
  description:
    "Backend / Full-stack Developer building modern APIs and web platforms with Python, FastAPI, Django, and PostgreSQL.",
  authors: [{ name: "Inomjon Toshmirzayev", url: "https://toshmirzayev-inomjon.online" }],
  creator: "Inomjon Toshmirzayev",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Inomjon Toshmirzayev | Backend Developer",
    description: "Backend / Full-stack Developer from Uzbekistan.",
    url: "https://toshmirzayev-inomjon.online",
    siteName: "Inomjon Toshmirzayev",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Inomjon Toshmirzayev | Backend Developer",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        style={{
          fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
        }}
        className="antialiased"
      >
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
