import { Metadata } from 'next';
import { projects } from '@/data/projects';
import { notFound } from 'next/navigation';
import ClientProjectDetail from './client-project-detail';
import ErrorBoundary from '@/components/ErrorBoundary';
import { DEFAULT_OG_IMAGE, getSiteUrl } from '@/lib/site';

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
    const image = project.image || DEFAULT_OG_IMAGE;

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
            url: `/projects/${slug}`,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
        alternates: {
            canonical: `/projects/${slug}`
        }
    };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    const siteUrl = getSiteUrl();
    const projectUrl = `${siteUrl}/projects/${slug}`;
    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": project.name,
        "description": project.description,
        "applicationCategory": "Application",
        "operatingSystem": "Any",
        "url": projectUrl,
        "image": project.image ? `${siteUrl}${project.image}` : undefined
    };

    const faqSchema = project.faqs ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": project.faqs.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
            }
        }))
    } : null;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
            <ErrorBoundary>
                <ClientProjectDetail project={project} />
            </ErrorBoundary>
        </>
    );
}
