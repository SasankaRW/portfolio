import type { Metadata } from 'next';
import HomeClient from './client-home';
import ErrorBoundary from '@/components/ErrorBoundary';
import { DEFAULT_OG_IMAGE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'SAS.GRID.SYS',
  description: 'Retro-styled portfolio of Sasanka Wakkumbura featuring projects, experience, tools, research, and design work.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SAS.GRID.SYS',
    description: 'Retro-styled portfolio of Sasanka Wakkumbura featuring projects, experience, tools, research, and design work.',
    type: 'website',
    url: '/',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAS.GRID.SYS',
    description: 'Retro-styled portfolio of Sasanka Wakkumbura featuring projects, experience, tools, research, and design work.',
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function HomePage() {
  return (
    <ErrorBoundary>
      <HomeClient />
    </ErrorBoundary>
  );
}
