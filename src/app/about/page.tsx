import type { Metadata } from 'next';
import AboutClient from './client-about';
import ErrorBoundary from '@/components/ErrorBoundary';
import { DEFAULT_OG_IMAGE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description: 'Background, skills, and highlights from Sasanka Wakkumbura\'s software engineering journey.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About',
    description: 'Background, skills, and highlights from Sasanka Wakkumbura\'s software engineering journey.',
    type: 'website',
    url: '/about',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About',
    description: 'Background, skills, and highlights from Sasanka Wakkumbura\'s software engineering journey.',
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function AboutPage() {
  return (
    <ErrorBoundary>
      <AboutClient />
    </ErrorBoundary>
  );
}
