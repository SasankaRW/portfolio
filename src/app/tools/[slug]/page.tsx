import { Metadata } from 'next';
import { tools } from '@/data/projects';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import RetroWindow from '@/components/RetroWindow';
import RetroButton from '@/components/RetroButton';
import ClientToolDetail from './client-tool-detail';
import ErrorBoundary from '@/components/ErrorBoundary';
import { DEFAULT_OG_IMAGE } from '@/lib/site';

// Generate static params for all tools to enable static export if needed
export async function generateStaticParams() {
    return tools.map((tool) => ({
        slug: tool.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const tool = tools.find((t) => t.slug === slug);

    if (!tool) {
        return {
            title: 'Tool Not Found',
        };
    }

    const title = tool.seoMeta?.title || `${tool.name} – Free Tool | SAS.GRID.SYS`;
    const description = tool.seoMeta?.description || tool.description;
    const keywords = tool.seoMeta?.keywords || [tool.name, "tool", "online utility", "SasankaRW"];
    const image = tool.image || DEFAULT_OG_IMAGE;

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
            images: [image],
            url: `/tools/${slug}`,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
        alternates: {
            canonical: `/tools/${slug}`
        }
    };
}

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const tool = tools.find((t) => t.slug === slug);

    if (!tool) {
        notFound();
    }

    return (
        <ErrorBoundary>
            <ClientToolDetail tool={tool} />
        </ErrorBoundary>
    );
}
