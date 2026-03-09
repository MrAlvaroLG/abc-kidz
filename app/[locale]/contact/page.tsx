import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import { ContactDetails, BusinessHours } from '@/components/contact/ContactInfo';
import ContactSocialResponse from '@/components/contact/ContactSocialResponse';
import ContactMap from '@/components/contact/ContactMap';
import { generateAlternates, generateCanonicalUrl } from '@/lib/seo-utils';
import { seoConfig } from '@/components/seo/seo.config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const validLocale = (locale === 'en' || locale === 'es') ? locale : 'en';
    const t = await getTranslations({ locale, namespace: 'contactPage.meta' });
    
    return {
        title: t('title'),
        description: t('description'),
        keywords: t('keywords'),
        
        // Canonical y hreflang tags dinámicos
        alternates: generateAlternates(validLocale, '/contact'),
        
        openGraph: {
            title: t('title'),
            description: t('description'),
            type: 'website',
            url: generateCanonicalUrl(validLocale, '/contact'),
            siteName: seoConfig.business.name,
            locale: validLocale === 'es' ? 'es_US' : 'en_US',
            alternateLocale: validLocale === 'es' ? ['en_US'] : ['es_US'],
        },
        twitter: {
            card: 'summary_large_image',
            title: t('title'),
            description: t('description'),
        }
    };
}

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <ContactHero />
            
            {/* Main Content Section */}
            <section className="relative py-16 md:py-24 bg-gray-50">
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-40 -left-40 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-40 -right-40 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Contact Form - Full Width */}
                    <div className="mb-12">
                        <ContactForm />
                    </div>

                    {/* Two Column Layout: Contact Details + Business Hours */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <ContactDetails />
                        <BusinessHours />
                    </div>

                    {/* Social Media & WhatsApp CTA */}
                    <div className="mb-16">
                        <ContactSocialResponse />
                    </div>

                    {/* Map Section */}
                    <ContactMap />
                </div>
            </section>

            <Footer />
        </main>
    );
}
