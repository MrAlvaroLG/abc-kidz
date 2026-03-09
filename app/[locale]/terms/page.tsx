import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TermsHero from '@/components/terms/TermsHero';
import TermsContent from '@/components/terms/TermsContent';
import { generateAlternates, generateCanonicalUrl } from '@/lib/seo-utils';
import { seoConfig } from '@/components/seo/seo.config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const validLocale = (locale === 'en' || locale === 'es') ? locale : 'en';
    const t = await getTranslations({ locale, namespace: 'termsPage.meta' });
    
    return {
        title: t('title'),
        description: t('description'),
        keywords: t('keywords'),
        
        // Canonical y hreflang tags dinámicos
        alternates: generateAlternates(validLocale, '/terms'),
        
        openGraph: {
            title: t('title'),
            description: t('description'),
            type: 'website',
            url: generateCanonicalUrl(validLocale, '/terms'),
            siteName: seoConfig.business.name,
            locale: validLocale === 'es' ? 'es_US' : 'en_US',
        },
    };
}

export default function TermsPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <TermsHero />
            <TermsContent />
            <Footer />
        </main>
    );
}
