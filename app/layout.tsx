import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zingo Translate | Fortune Zviregei",
  description: "Translate text between languages instantly",
  authors: [{ name: "Fortune Zviregei", url: "https://fortunezviregei.com" }],
  creator: "Fortune Zviregei",
  applicationName: "Zingo Translate",
  keywords: [
    "fortune zviregei",
    "translation",
    "instant",
    "zingo",
    "fortune zviregei",
    "language translation",
    "text translation",
    "language translation tool",
    "text translation tool",
  ],
  openGraph: {
    title: "Zingo Translate",
    description: "Translate text between languages instantly",
    url: "https://zingo.translate.fortunezviregei.com",
    siteName: "Zingo Translate",
  },
  twitter: {
    title: "Zingo Translate | Fortune Zviregei",
    description: "Translate text between languages instantly",
    card: "summary_large_image",
  },
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
    other: {
      me: [`fortunechainz@gmail.com`, `${process.env.NEXT_PUBLIC_SITE_URL}`],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
