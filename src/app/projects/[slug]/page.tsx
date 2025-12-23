import { Metadata } from 'next';
import { projects } from '@/data/projects';
import { notFound } from 'next/navigation';
import ClientProjectDetail from './client-project-detail';

// Generate static params
export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }

    const title = project.seoMeta?.title || `${project.name} – Project | SAS.GRID.SYS`;
    const description = project.seoMeta?.description || project.description;
    const keywords = project.seoMeta?.keywords || [project.name, "project", "portfolio", "SasankaRW"];

    return {
        title,
        description,
        keywords,
        robots: {
            index: true,
            follow: true,
        },
        openGraph: {
            title,
            description,
            type: 'website',
            images: project.image ? [project.image] : [],
            url: `https://sasgrid.online/projects/${slug}`,
        },
        alternates: {
            canonical: `https://sasgrid.online/projects/${slug}`
        }
    };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return <ClientProjectDetail project={project} />;
}
