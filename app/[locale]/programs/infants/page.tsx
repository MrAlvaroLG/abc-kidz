import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProgramsCTA from '@/components/programs/ProgramsCTA';
import ProgramNavigation from '@/components/programs/ProgramNavigation';
import { CheckCircleIcon, HeartIcon, SparklesIcon, HandRaisedIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';
import { generateAlternates, generateCanonicalUrl } from '@/lib/seo-utils';
import { seoConfig } from '@/components/seo/seo.config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const validLocale = (locale === 'en' || locale === 'es') ? locale : 'en';
    const t = await getTranslations({ locale, namespace: 'infantsPage' });
    
    return {
        title: t('meta.title'),
        description: t('meta.description'),
        keywords: t('meta.keywords'),
        
        // Canonical y hreflang tags dinámicos
        alternates: generateAlternates(validLocale, '/programs/infants'),
        
        openGraph: {
            title: t('meta.title'),
            description: t('meta.description'),
            type: 'website',
            url: generateCanonicalUrl(validLocale, '/programs/infants'),
            siteName: seoConfig.business.name,
            locale: validLocale === 'es' ? 'es_US' : 'en_US',
        },
    };
}

export default async function InfantsPage() {
    const t = await getTranslations('infantsPage');

    const features = [
        {
            icon: HeartIcon,
            title: t('features.individualizedCare.title'),
            description: t('features.individualizedCare.description')
        },
        {
            icon: SparklesIcon,
            title: t('features.sensoryExploration.title'),
            description: t('features.sensoryExploration.description')
        },
        {
            icon: HandRaisedIcon,
            title: t('features.gentleInteractions.title'),
            description: t('features.gentleInteractions.description')
        },
        {
            icon: ShieldCheckIcon,
            title: t('features.secureEnvironment.title'),
            description: t('features.secureEnvironment.description')
        }
    ];

    return (
        <main className="min-h-screen">
            <Navbar />
            
            {/* Hero Section */}
            <section className="relative py-32 md:py-40 bg-linear-to-br from-pink-500 to-purple-600 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl" />
                </div>
                
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Age Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 mb-8 shadow-xl">
                            <HeartIcon className="w-5 h-5 text-white" />
                            <span className="text-white text-sm font-bold uppercase tracking-wider">{t('hero.ageBadge')}</span>
                        </div>
                        
                        {/* Main Title */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                            {t('hero.title')}
                        </h1>
                        
                        {/* Tagline */}
                        <p className="text-2xl md:text-3xl text-white/90 font-light mb-8">
                            {t('hero.tagline')}
                        </p>
                        
                        {/* Hero Description */}
                        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                            {t('hero.description')}
                        </p>
                    </div>
                </div>

                {/* Wave Divider */}
                <div className="absolute -bottom-px left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-auto block">
                        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
                    </svg>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-20 md:py-32 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Two Column Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                            {/* Image Column */}
                            <div className="relative">
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/programs/infants/Infant3.jpg"
                                        alt="Infant care at ABC Kids"
                                        width={600}
                                        height={500}
                                        className="w-full h-auto object-cover"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-linear-to-t from-pink-600/20 to-transparent" />
                                </div>
                                {/* Decorative Elements */}
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-linear-to-br from-pink-400 to-purple-500 rounded-2xl -z-10" />
                                <div className="absolute -top-6 -left-6 w-24 h-24 bg-linear-to-br from-purple-400 to-pink-500 rounded-full -z-10 opacity-60" />
                            </div>

                            {/* Content Column */}
                            <div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-8 leading-tight">
                                    {t('content.mainTitle')}
                                </h2>
                                
                                <div className="space-y-6">
                                    <p className="text-lg text-navy-900/70 leading-relaxed">
                                        {t('content.paragraph1')}
                                    </p>
                                    <p className="text-lg text-navy-900/70 leading-relaxed">
                                        {t('content.paragraph2')}
                                    </p>
                                </div>

                                {/* Highlights */}
                                <div className="mt-8 space-y-4">
                                    {[t('highlights.item1'), t('highlights.item2'), t('highlights.item3')].map((item, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-linear-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                                <CheckCircleIcon className="w-5 h-5 text-white" />
                                            </div>
                                            <span className="text-navy-900 font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                            {features.map((feature, index) => (
                                <div 
                                    key={index}
                                    className="group relative bg-linear-to-br from-pink-50 to-purple-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-pink-100"
                                >
                                    {/* Icon */}
                                    <div className="w-16 h-16 bg-linear-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </div>
                                    
                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-navy-900 mb-3">
                                        {feature.title}
                                    </h3>
                                    
                                    {/* Description */}
                                    <p className="text-navy-900/70 leading-relaxed">
                                        {feature.description}
                                    </p>

                                    {/* Decorative corner */}
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-pink-200 to-purple-200 rounded-bl-3xl rounded-tr-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            ))}
                        </div>

                        {/* Second Image Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            {/* Content Column */}
                            <div className="order-2 lg:order-1">
                                <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-8 leading-tight">
                                    {t('content.secondaryTitle')}
                                </h2>
                                
                                <div className="space-y-6">
                                    <p className="text-lg text-navy-900/70 leading-relaxed">
                                        {t('content.paragraph3')}
                                    </p>
                                    <p className="text-lg text-navy-900/70 leading-relaxed">
                                        {t('content.paragraph4')}
                                    </p>
                                </div>

                                {/* Trust Badge */}
                                <div className="mt-10 inline-flex items-center gap-4 bg-linear-to-r from-pink-100 to-purple-100 px-6 py-4 rounded-2xl border border-pink-200">
                                    <div className="w-12 h-12 bg-linear-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                                        <ShieldCheckIcon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-navy-900">{t('trust.title')}</p>
                                        <p className="text-sm text-navy-900/60">{t('trust.subtitle')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Image Column */}
                            <div className="relative order-1 lg:order-2">
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/programs/infants/Infant2.jpg"
                                        alt="Nurturing infant development"
                                        width={600}
                                        height={500}
                                        className="w-full h-auto object-cover"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-linear-to-t from-purple-600/20 to-transparent" />
                                </div>
                                {/* Decorative Elements */}
                                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-linear-to-br from-purple-400 to-pink-500 rounded-2xl -z-10" />
                                <div className="absolute -top-6 -right-6 w-24 h-24 bg-linear-to-br from-pink-400 to-purple-500 rounded-full -z-10 opacity-60" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Navigation */}
            <ProgramNavigation current="infants" />

            {/* CTA Section */}
            <ProgramsCTA />

            <Footer />
        </main>
    );
}
