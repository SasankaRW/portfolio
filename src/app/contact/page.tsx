import type { Metadata } from 'next';
import ContactClient from './client-contact';
import ErrorBoundary from '@/components/ErrorBoundary';
import { DEFAULT_OG_IMAGE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch for collaboration, freelance work, or project inquiries.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact',
    description: 'Get in touch for collaboration, freelance work, or project inquiries.',
    type: 'website',
    url: '/contact',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact',
    description: 'Get in touch for collaboration, freelance work, or project inquiries.',
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function ContactPage() {
  return (
    <ErrorBoundary>
      <ContactClient />
    </ErrorBoundary>
  );
}
