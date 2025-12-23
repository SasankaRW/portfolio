import { Metadata } from 'next';
import { tools } from '@/data/projects';
import ClientQrTool from './client-qr-tool';

export async function generateMetadata(): Promise<Metadata> {
    const tool = tools.find((t) => t.slug === 'qr-generator');

    if (!tool) return { title: 'QR Generator' };

    const title = tool.seoMeta?.title || tool.name;
    const description = tool.seoMeta?.description || tool.description;

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
            url: 'https://sasgrid.online/tools/qr-generator',
        },
        alternates: {
            canonical: 'https://sasgrid.online/tools/qr-generator'
        }
    };
}

export default function QRGeneratorPage() {
    const tool = tools.find((t) => t.slug === 'qr-generator');
    if (!tool) return null; // Should handle 404 properly but essentially won't happen if data is there
    return <ClientQrTool tool={tool} />;
}
