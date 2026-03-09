import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AboutHero from '@/components/about/AboutHero';
import AboutMission from '@/components/about/AboutMission';
import AboutVision from '@/components/about/AboutVision';
import AboutPhilosophy from '@/components/about/AboutPhilosophy';
import AboutValues from '@/components/about/AboutValues';
import AboutTeam from '@/components/about/AboutTeam';
import ProgramsCTA from '@/components/programs/ProgramsCTA';
import { generateAlternates, generateCanonicalUrl } from '@/lib/seo-utils';
import { seoConfig } from '@/components/seo/seo.config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const validLocale = (locale === 'en' || locale === 'es') ? locale : 'en';
    const t = await getTranslations({ locale, namespace: 'aboutPage.meta' });
    
    return {
        title: t('title'),
        description: t('description'),
        keywords: t('keywords'),
        
        // Canonical y hreflang tags dinámicos
        alternates: generateAlternates(validLocale, '/about'),
        
        // Open Graph con URL canónica
        openGraph: {
            title: t('title'),
            description: t('description'),
            type: 'website',
            url: generateCanonicalUrl(validLocale, '/about'),
            siteName: seoConfig.business.name,
            locale: validLocale === 'es' ? 'es_US' : 'en_US',
            alternateLocale: validLocale === 'es' ? ['en_US'] : ['es_US'],
        },
    };
}

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <AboutHero />
            <AboutMission />
            <AboutVision />
            <AboutPhilosophy />
            <AboutValues />
            <AboutTeam />
            <ProgramsCTA />
            <Footer />
        </main>
    );
}
