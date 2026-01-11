import type { Metadata } from 'next';
import DesignsClient from './client-designs';

export const metadata: Metadata = {
  title: 'Designs',
  alternates: {
    canonical: '/designs',
  },
};

export default function DesignsPage() {
  return <DesignsClient />;
}
