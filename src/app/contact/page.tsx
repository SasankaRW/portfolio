import type { Metadata } from 'next';
import ContactClient from './client-contact';

export const metadata: Metadata = {
  title: 'Contact',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
