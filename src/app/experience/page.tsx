import type { Metadata } from 'next';
import ExperienceClient from './client-experience';

export const metadata: Metadata = {
  title: 'Experience',
  alternates: {
    canonical: '/experience',
  },
};

export default function ExperiencePage() {
  return <ExperienceClient />;
}
