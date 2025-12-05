import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ScanlineOverlay from "@/components/ScanlineOverlay";

export const metadata: Metadata = {
  title: "PORTFOLIO.SYS | Retro Developer Portfolio",
  description: "A 90s retro-themed personal portfolio showcasing work experience, projects, research, and design work.",
  keywords: ["portfolio", "developer", "software engineer", "retro", "90s", "web development"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main className="main-content">
          {children}
        </main>
        <ScanlineOverlay enabled={true} />
      </body>
    </html>
  );
}
