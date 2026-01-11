import type { Metadata } from 'next';
import ProjectsClient from './client-projects';

export const metadata: Metadata = {
  title: 'Projects',
  alternates: {
    canonical: '/projects',
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
