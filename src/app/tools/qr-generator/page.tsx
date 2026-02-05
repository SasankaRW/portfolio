import { Metadata } from 'next';
import { tools } from '@/data/projects';
import ClientQrTool from './client-qr-tool';
import ErrorBoundary from '@/components/ErrorBoundary';
import { DEFAULT_OG_IMAGE } from '@/lib/site';

export async function generateMetadata(): Promise<Metadata> {
    const tool = tools.find((t) => t.slug === 'qr-generator');

    if (!tool) return { title: 'QR Generator' };

    const title = tool.seoMeta?.title || tool.name;
    const description = tool.seoMeta?.description || tool.description;
    const image = tool.image || DEFAULT_OG_IMAGE;

    return {
        title,
        description,
        robots: {
            index: true,
            follow: true,
        },
        openGraph: {
            title,
            description,
            type: 'website',
            url: '/tools/qr-generator',
            images: [image],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
        alternates: {
            canonical: '/tools/qr-generator'
        }
    };
}

export default function QRGeneratorPage() {
    const tool = tools.find((t) => t.slug === 'qr-generator');
    if (!tool) return null; // Should handle 404 properly but essentially won't happen if data is there
    return (
        <ErrorBoundary>
            <ClientQrTool tool={tool} />
        </ErrorBoundary>
    );
}
