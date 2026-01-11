import type { Metadata } from 'next';
import HomeClient from './client-home';

export const metadata: Metadata = {
  title: 'SAS.GRID.SYS',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return <HomeClient />;
}
