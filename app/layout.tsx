import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

import { THEME_INIT_SCRIPT } from "@/Ui/ThemeProvider/theme-script";
import { ThemeProvider } from "@/Ui/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

const siteUrl = "https://aminecheffak.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Amine Cheffak | Full Stack Developer & Software Engineer",
    template: "%s | Amine Cheffak",
  },

  description:
    "Amine Cheffak, ingénieur logiciel et développeur Full Stack à Safi, Maroc. Spécialisé en développement web, applications évolutives et automatisation.",

  applicationName: "Amine Cheffak Portfolio",

  keywords: [
    "Amine Cheffak",
    "Amine Cheffak Developer",
    "Développeur Full Stack",
    "Software Engineer",
    "Développeur Web Maroc",
    "Développeur Web Safi",
    "React.js",
    "Next.js",
    "Node.js",
    "NestJS",
    "Spring Boot",
    "Laravel",
    "TypeScript",
    "Automatisation",
  ],

  authors: [
    {
      name: "Amine Cheffak",
      url: siteUrl,
    },
  ],

  creator: "Amine Cheffak",
  publisher: "Amine Cheffak",

  verification: {
    google: "LIJ0s5qJf6tH5y4FCwHQ1FDBXsFS4pkH_CBAZAmrbHg",
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Amine Cheffak Portfolio",
    title: "Amine Cheffak | Full Stack Developer & Software Engineer",
    description:
      "Découvrez le portfolio d'Amine Cheffak, ingénieur logiciel Full Stack passionné par le développement web et l'automatisation.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Amine Cheffak | Full Stack Developer",
    description:
      "Ingénieur logiciel Full Stack spécialisé en développement web et automatisation.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#09070F" },
  ],
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className={`min-h-full flex flex-col ${orbitron.variable} ${rajdhani.variable}`}
      >
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}