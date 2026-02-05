import type { Metadata } from 'next';
import ExperienceClient from './client-experience';
import ErrorBoundary from '@/components/ErrorBoundary';
import { DEFAULT_OG_IMAGE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Work history, roles, and responsibilities across software engineering and product delivery.',
  alternates: {
    canonical: '/experience',
  },
  openGraph: {
    title: 'Experience',
    description: 'Work history, roles, and responsibilities across software engineering and product delivery.',
    type: 'website',
    url: '/experience',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Experience',
    description: 'Work history, roles, and responsibilities across software engineering and product delivery.',
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function ExperiencePage() {
  return (
    <ErrorBoundary>
      <ExperienceClient />
    </ErrorBoundary>
  );
}
