import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

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

const siteUrl = "https://aminecheffak-dev.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Amine Cheffak | Full Stack Developer & Software Engineer",
    template: "%s | Amine Cheffak",
  },

  description:
    "Amine Cheffak, développeur Full Stack à Safi, Maroc. Spécialisé en développement web, applications évolutives, automatisation et intelligence artificielle avec Ollama.",

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
    "Automation",
    "Automatisation",
    "Ollama",
    "Local AI",
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
      "Découvrez le portfolio d'Amine Cheffak, développeur Full Stack passionné par le développement web, l'automatisation et l'intelligence artificielle.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Amine Cheffak | Full Stack Developer",
    description:
      "Développeur Full Stack spécialisé en développement web, automatisation et intelligence artificielle.",
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
  themeColor: "#0B0D10",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className={`min-h-full flex flex-col ${orbitron.variable} ${rajdhani.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
