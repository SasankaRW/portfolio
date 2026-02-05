import type { Metadata } from 'next';
import ResearchClient from './client-research';
import ErrorBoundary from '@/components/ErrorBoundary';
import { DEFAULT_OG_IMAGE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Research',
  description: 'Research summaries, papers, and technical analyses.',
  alternates: {
    canonical: '/research',
  },
  openGraph: {
    title: 'Research',
    description: 'Research summaries, papers, and technical analyses.',
    type: 'website',
    url: '/research',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Research',
    description: 'Research summaries, papers, and technical analyses.',
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function ResearchPage() {
  return (
    <ErrorBoundary>
      <ResearchClient />
    </ErrorBoundary>
  );
}
