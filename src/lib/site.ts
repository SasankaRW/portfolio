export const DEFAULT_SITE_URL = 'https://sasgrid.online';
export const DEFAULT_OG_IMAGE = '/images/ui/prototype.png';

function normalizeSiteUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return DEFAULT_SITE_URL;

  // Ensure it has a scheme so URL parsing works.
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const url = new URL(withScheme);

  // Remove trailing slash for stable joining.
  return `${url.protocol}//${url.host}`;
}

/**
 * Returns the canonical site origin, e.g. "https://sasgrid.online".
 * Configure via NEXT_PUBLIC_SITE_URL (recommended) or SITE_URL.
 */
export function getSiteUrl(): string {
  return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || DEFAULT_SITE_URL);
}

export function getSiteHost(): string {
  return new URL(getSiteUrl()).host;
}


