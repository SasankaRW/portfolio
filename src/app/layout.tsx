import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ScanlineOverlay from "@/components/ScanlineOverlay";
import { SoundProvider } from "@/context/SoundContext";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "SAS.GRID.SYS",
  description: "Sasanka Wakkumbura's personal portfolio showcasing work experience, projects, research, and design work.",
  keywords: ["portfolio", "developer", "software engineer", "Sasanka Wakkumbura", "web development"],
  openGraph: {
    title: "SAS.GRID.SYS",
    description: "Sasanka Wakkumbura's personal portfolio showcasing work experience, projects, research, and design work.",
    url: "https://sasgrid.online",
    siteName: "SAS.GRID.SYS",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAS.GRID.SYS",
    description: "Sasanka Wakkumbura's personal portfolio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <SoundProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only fixed top-0 left-0 z-[1002] p-4 bg-[var(--bg-section)] text-[var(--accent-primary)] border border-[var(--accent-primary)] outline-none"
            >
              Skip to content
            </a>
            <Navigation />
            <main id="main-content" className="main-content">
              {children}
            </main>
            <ScanlineOverlay enabled={true} />
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
