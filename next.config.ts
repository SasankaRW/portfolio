import type { NextConfig } from "next";

function normalizeSiteUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "https://sasgrid.online";
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const url = new URL(withScheme);
  return `${url.protocol}//${url.host}`;
}

const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://sasgrid.online");
const canonicalHost = new URL(siteUrl).host;
const wwwHost = canonicalHost.startsWith("www.") ? canonicalHost : `www.${canonicalHost}`;

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Enforce non-www canonical host.
      {
        source: "/:path*",
        has: [{ type: "host", value: wwwHost }],
        destination: `${siteUrl}/:path*`,
        permanent: true,
      },
      // Normalize trailing slashes ("/about/" -> "/about"). Root "/" is unaffected.
      {
        source: "/:path+/",
        destination: "/:path+",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
