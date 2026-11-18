import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const code = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-code",
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

  authors: [{ name: "Amine Cheffak", url: siteUrl }],

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
  themeColor: "#09070F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${display.variable} ${body.variable} ${code.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}