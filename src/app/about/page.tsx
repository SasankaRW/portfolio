import type { Metadata } from 'next';
import AboutClient from './client-about';

export const metadata: Metadata = {
  title: 'About',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
