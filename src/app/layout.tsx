import type { Metadata } from "next";
import { siteIdentity } from "@/data/siteData";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteIdentity.siteUrl),
  title: siteIdentity.metadataTitle,
  description: siteIdentity.metadataDescription,
  applicationName: siteIdentity.brandName,
  authors: [{ name: siteIdentity.ownerName, url: siteIdentity.siteUrl }],
  creator: siteIdentity.ownerName,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: siteIdentity.metadataTitle,
    description: siteIdentity.metadataDescription,
    url: "/",
    siteName: siteIdentity.brandName,
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: siteIdentity.metadataTitle,
    description: siteIdentity.metadataDescription
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
