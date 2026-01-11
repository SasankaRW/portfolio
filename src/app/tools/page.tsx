import type { Metadata } from 'next';
import ToolsClient from './client-tools';

export const metadata: Metadata = {
  title: 'Tools',
  alternates: {
    canonical: '/tools',
  },
};

export default function ToolsPage() {
  return <ToolsClient />;
}
