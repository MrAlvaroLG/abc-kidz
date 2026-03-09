import { getTranslations } from 'next-intl/server';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";
import ProgramsCTA from "@/components/programs/ProgramsCTA";
import { client } from '@/sanity/lib/client';
import { postsQuery } from '@/sanity/lib/queries';
import { generateAlternates, generateCanonicalUrl } from '@/lib/seo-utils';
import { seoConfig } from '@/components/seo/seo.config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const validLocale = (locale === 'en' || locale === 'es') ? locale : 'en';
    const t = await getTranslations({ locale, namespace: 'blogPage.meta' });

    return {
        title: t('title'),
        description: t('description'),
        keywords: t('keywords'),
        
        // Canonical y hreflang tags dinámicos
        alternates: generateAlternates(validLocale, '/blog'),
        
        openGraph: {
            title: t('title'),
            description: t('description'),
            type: 'website',
            url: generateCanonicalUrl(validLocale, '/blog'),
            siteName: seoConfig.business.name,
            locale: validLocale === 'es' ? 'es_US' : 'en_US',
        },
    };
}

async function getPosts(language: string) {
    return await client.fetch(postsQuery, { language });
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const posts = await getPosts(locale);

    return (
        <main className="min-h-screen">
            <Navbar />
            <BlogHero />
            <BlogGrid posts={posts} />
            <ProgramsCTA />
            <Footer />
        </main>
    );
}
