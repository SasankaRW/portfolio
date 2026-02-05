import type { Metadata } from "next";
import { IBM_Plex_Mono, Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ScanlineOverlay from "@/components/ScanlineOverlay";
import ScrollToTop from "@/components/ScrollToTop";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
  display: "swap",
});
import { SoundProvider } from "@/context/SoundContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { DEFAULT_OG_IMAGE, getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "SAS.GRID.SYS",
    template: "%s | SAS.GRID.SYS"
  },
  description: "Sasanka Wakkumbura's personal portfolio showcasing work experience, projects, research, and design work.",
  keywords: ["portfolio", "developer", "software engineer", "Sasanka Wakkumbura", "web development"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "SAS.GRID.SYS",
    description: "Sasanka Wakkumbura's personal portfolio showcasing work experience, projects, research, and design work.",
    url: getSiteUrl(),
    siteName: "SAS.GRID.SYS",
    locale: "en_US",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAS.GRID.SYS",
    description: "Sasanka Wakkumbura's personal portfolio.",
    images: [DEFAULT_OG_IMAGE],
  },
};

const siteUrl = getSiteUrl();
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": siteUrl,
      "name": "Sasanka Wakkumbura Portfolio",
      "description": "Personal portfolio of Sasanka Wakkumbura",
      "publisher": {
        "@id": `${siteUrl}/#person`
      }
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      "name": "Sasanka Wakkumbura",
      "url": siteUrl,
      "sameAs": [
        "https://github.com/SasankaRW",
        "https://www.linkedin.com/in/sasanka-wakkumbura"
      ],
      "jobTitle": "Software Engineer",
      "worksFor": {
        "@type": "Organization",
        "name": "Freelance"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ibmPlexMono.variable} ${vt323.variable} ${pressStart2P.variable}`}>
      <body className="antialiased">
        <ThemeProvider>
          <SoundProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only fixed top-0 left-0 z-[1002] p-4 bg-[var(--bg-section)] text-[var(--accent-primary)] border border-[var(--accent-primary)] outline-none"
            >
              Skip to content
            </a>
            <Navigation />
            <ScrollToTop />
            <main id="main-content" className="main-content">
              {children}
            </main>
            <ScanlineOverlay enabled={true} />
          </SoundProvider>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
