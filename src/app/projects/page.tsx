import type { Metadata } from 'next';
import ProjectsClient from './client-projects';
import ErrorBoundary from '@/components/ErrorBoundary';
import { DEFAULT_OG_IMAGE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected software projects including web apps, tools, and systems engineering work.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Projects',
    description: 'Selected software projects including web apps, tools, and systems engineering work.',
    type: 'website',
    url: '/projects',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects',
    description: 'Selected software projects including web apps, tools, and systems engineering work.',
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function ProjectsPage() {
  return (
    <ErrorBoundary>
      <ProjectsClient />
    </ErrorBoundary>
  );
}
