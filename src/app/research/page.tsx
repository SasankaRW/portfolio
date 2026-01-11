import type { Metadata } from 'next';
import ResearchClient from './client-research';

export const metadata: Metadata = {
  title: 'Research',
  alternates: {
    canonical: '/research',
  },
};

export default function ResearchPage() {
  return <ResearchClient />;
}
