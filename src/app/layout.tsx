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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://crimechecknews.com"),
  title: {
    template: "%s | Crime Check News",
    default: "Crime Check News - Breaking Crime News & Safety Updates",
  },
  description: "Your trusted source for breaking crime news, investigations, safety alerts, and in-depth analysis. Stay informed with the latest updates from around the world.",
  keywords: ["crime news", "breaking news", "investigations", "safety alerts", "crime analysis", "law enforcement", "criminal justice"],
  authors: [{ name: "Crime Check News" }],
  creator: "Crime Check News",
  publisher: "Crime Check News",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://crimechecknews.com",
    siteName: "Crime Check News",
    title: "Crime Check News - Breaking Crime News & Safety Updates",
    description: "Your trusted source for breaking crime news, investigations, safety alerts, and in-depth analysis.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Crime Check News",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crime Check News - Breaking Crime News & Safety Updates",
    description: "Your trusted source for breaking crime news, investigations, safety alerts, and in-depth analysis.",
    images: ["/twitter-image.png"],
    creator: "@crimechecknews",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
  other: {
    "google-adsense-account": "ca-pub-8697384359408561",
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION && {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION,
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || "https://crimechecknews.com"} />
        <meta name="theme-color" content="#1a1a1a" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Crime Check News",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://crimechecknews.com",
              "logo": {
                "@type": "ImageObject",
                "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://crimechecknews.com"}/logo.png`
              },
              "sameAs": [
                "https://twitter.com/crimechecknews",
                "https://facebook.com/crimechecknews",
              ]
            })
          }}
        />
        
        {/* Structured Data - Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Crime Check News",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://crimechecknews.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL || "https://crimechecknews.com"}/search?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
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

