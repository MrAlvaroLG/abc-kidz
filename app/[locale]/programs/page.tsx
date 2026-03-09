import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProgramsHero from '@/components/programs/ProgramsHero';
import ProgramsGrid from '@/components/programs/ProgramsGrid';
import ProgramsBenefits from '@/components/programs/ProgramsBenefits';
import ProgramsCTA from '@/components/programs/ProgramsCTA';
import { generateAlternates, generateCanonicalUrl } from '@/lib/seo-utils';
import { seoConfig } from '@/components/seo/seo.config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const validLocale = (locale === 'en' || locale === 'es') ? locale : 'en';
    const t = await getTranslations({ locale, namespace: 'programsPage.meta' });
    
    return {
        title: t('title'),
        description: t('description'),
        keywords: t('keywords'),
        
        // Canonical y hreflang tags dinámicos
        alternates: generateAlternates(validLocale, '/programs'),
        
        openGraph: {
            title: t('title'),
            description: t('description'),
            type: 'website',
            url: generateCanonicalUrl(validLocale, '/programs'),
            siteName: seoConfig.business.name,
            locale: validLocale === 'es' ? 'es_US' : 'en_US',
        },
    };
}

export default function ProgramsPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <ProgramsHero />
            <ProgramsGrid />
            <ProgramsBenefits />
            <ProgramsCTA />
            <Footer />
        </main>
    );
}
