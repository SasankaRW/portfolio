import type { Metadata } from 'next';
import ToolsClient from './client-tools';
import ErrorBoundary from '@/components/ErrorBoundary';
import { DEFAULT_OG_IMAGE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Tools',
  description: 'Free utilities and productivity tools built by Sasanka Wakkumbura.',
  alternates: {
    canonical: '/tools',
  },
  openGraph: {
    title: 'Tools',
    description: 'Free utilities and productivity tools built by Sasanka Wakkumbura.',
    type: 'website',
    url: '/tools',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tools',
    description: 'Free utilities and productivity tools built by Sasanka Wakkumbura.',
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function ToolsPage() {
  return (
    <ErrorBoundary>
      <ToolsClient />
    </ErrorBoundary>
  );
}
