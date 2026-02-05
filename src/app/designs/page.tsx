import type { Metadata } from 'next';
import DesignsClient from './client-designs';
import ErrorBoundary from '@/components/ErrorBoundary';
import { DEFAULT_OG_IMAGE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Designs',
  description: 'Design work, UI explorations, and visual concepts.',
  alternates: {
    canonical: '/designs',
  },
  openGraph: {
    title: 'Designs',
    description: 'Design work, UI explorations, and visual concepts.',
    type: 'website',
    url: '/designs',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Designs',
    description: 'Design work, UI explorations, and visual concepts.',
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function DesignsPage() {
  return (
    <ErrorBoundary>
      <DesignsClient />
    </ErrorBoundary>
  );
}
