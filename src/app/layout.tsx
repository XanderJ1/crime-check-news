import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { Merriweather, Lora, Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Metadata } from "next";

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
});

const lora = Lora({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Crime Check News",
  other: {
    "google-adsense-account": "ca-pub-8697384359408561",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${merriweather.variable} ${lora.variable} ${inter.variable}`}>
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8697384359408561"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}

