
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProgramsCTA from '@/components/programs/ProgramsCTA';
import ProgramNavigation from '@/components/programs/ProgramNavigation';
import { CheckCircleIcon, LanguageIcon, CalculatorIcon, BookOpenIcon, AcademicCapIcon } from '@heroicons/react/24/solid';
import { generateAlternates, generateCanonicalUrl } from '@/lib/seo-utils';
import { seoConfig } from '@/components/seo/seo.config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const validLocale = (locale === 'en' || locale === 'es') ? locale : 'en';
    const t = await getTranslations({ locale, namespace: 'vpkPage' });
    
    return {
        title: t('meta.title'),
        description: t('meta.description'),
        keywords: t('meta.keywords'),
        
        // Canonical y hreflang tags dinámicos
        alternates: generateAlternates(validLocale, '/programs/vpk'),
        
        openGraph: {
            title: t('meta.title'),
            description: t('meta.description'),
            type: 'website',
            url: generateCanonicalUrl(validLocale, '/programs/vpk'),
            siteName: seoConfig.business.name,
            locale: validLocale === 'es' ? 'es_US' : 'en_US',
        },
    };
}

export default async function VPKPage() {
    const t = await getTranslations('vpkPage');

    const features = [
        {
            icon: LanguageIcon,
            title: t('features.language.title'),
            description: t('features.language.description')
        },
        {
            icon: CalculatorIcon,
            title: t('features.math.title'),
            description: t('features.math.description')
        },
        {
            icon: BookOpenIcon,
            title: t('features.literacy.title'),
            description: t('features.literacy.description')
        },
        {
            icon: AcademicCapIcon,
            title: t('features.confidence.title'),
            description: t('features.confidence.description')
        }
    ];

    return (
        <main className="min-h-screen">
            <Navbar />
            
            {/* Hero Section */}
            <section className="relative py-32 md:py-40 bg-linear-to-br from-green-500 to-teal-600 overflow-hidden">
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
                            <AcademicCapIcon className="w-5 h-5 text-white" />
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

                        {/* State-Funded Badge */}
                        <div className="mt-8 inline-flex items-center gap-2 bg-white/30 backdrop-blur-sm px-5 py-2 rounded-full border border-white/40">
                            <CheckCircleIcon className="w-5 h-5 text-white" />
                            <span className="text-white text-sm font-semibold">{t('hero.stateFunded')}</span>
                        </div>
                    </div>
                </div>

                {/* Wave Divider */}
                <div className="absolute -bottom-px left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-auto block">
                        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
                    </svg>
                </div>
            </section>

            {/* News Feature Banner */}
            <section className="relative py-12 bg-linear-to-br from-green-50 via-white to-teal-50 border-y border-green-100/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto">
                        {/* Featured Badge */}
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-green-500 to-teal-600 rounded-full shadow-lg">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                                </svg>
                                <span className="text-white text-sm font-bold uppercase tracking-wider">{t('newsFeature.badge')}</span>
                            </div>
                        </div>

                        {/* Main Feature Card */}
                        <a 
                            href="https://baynews9.com/fl/tampa/news/2025/07/15/summer-boost-program"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                        >
                            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-green-100 hover:border-green-300 hover:-translate-y-1">
                                {/* Gradient Accent Bar */}
                                <div className="h-2 bg-linear-to-r from-green-500 via-teal-500 to-green-600" />
                                
                                <div className="p-6 sm:p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-center">
                                        {/* News Source Badge */}
                                        <div className="flex justify-center md:justify-start">
                                            <div className="relative">
                                                <div className="bg-linear-to-br from-green-600 to-green-900 text-white px-6 py-4 rounded-2xl shadow-lg font-bold text-xl min-w-[140px] text-center">
                                                    BAY NEWS 9
                                                </div>
                                                {/* Verified Badge */}
                                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="text-center md:text-left">
                                            <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                                                {t('newsFeature.headline')}
                                            </h3>
                                            <p className="text-navy-900/70 mb-4 leading-relaxed">
                                                {t('newsFeature.description')}
                                            </p>
                                            
                                            {/* Quote */}
                                            <div className="bg-linear-to-r from-green-50 to-teal-50 border-l-4 border-green-500 p-4 rounded-lg mb-4">
                                                <p className="text-navy-900/80 italic text-sm sm:text-base">
                                                    "{t('newsFeature.quote')}"
                                                </p>
                                                <p className="text-navy-900/60 text-xs sm:text-sm mt-2 font-semibold">
                                                    {t('newsFeature.attribution')}
                                                </p>
                                            </div>

                                            {/* CTA */}
                                            <div className="inline-flex items-center gap-2 text-green-600 font-semibold group-hover:gap-3 transition-all duration-300">
                                                <span>{t('newsFeature.cta')}</span>
                                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </div>

                                            {/* Date */}
                                            <p className="text-navy-900/40 text-xs sm:text-sm mt-3">
                                                {t('newsFeature.publishedDate')}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative corner accent */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-green-200/30 to-teal-200/30 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* YouTube Video */}
                <div className="max-w-6xl mx-auto my-16">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-navy-900/5">
                        <div className="relative aspect-video w-full">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src="https://www.youtube.com/embed/yshTqwfLcW8?si=YIqWBHcGIdNjfRag"
                                title="ABC Kidz Preschool Programs Introduction"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>

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
                                        src="/programs/vpk/vpk3.jpeg"
                                        alt="VPK learning at ABC Kids"
                                        width={600}
                                        height={500}
                                        className="w-full h-auto object-cover"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-linear-to-t from-green-600/20 to-transparent" />
                                </div>
                                {/* Decorative Elements */}
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-linear-to-br from-green-400 to-teal-500 rounded-2xl -z-10" />
                                <div className="absolute -top-6 -left-6 w-24 h-24 bg-linear-to-br from-teal-400 to-green-500 rounded-full -z-10 opacity-60" />
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
                                            <div className="w-8 h-8 bg-linear-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
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
                                    className="group relative bg-linear-to-br from-green-50 to-teal-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-green-100"
                                >
                                    {/* Icon */}
                                    <div className="w-16 h-16 bg-linear-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
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
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-green-200 to-teal-200 rounded-bl-3xl rounded-tr-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
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
                                <div className="mt-10 inline-flex items-center gap-4 bg-linear-to-r from-green-100 to-teal-100 px-6 py-4 rounded-2xl border border-green-200">
                                    <div className="w-12 h-12 bg-linear-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                                        <AcademicCapIcon className="w-6 h-6 text-white" />
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
                                        src="/programs/vpk/vpk4.jpeg"
                                        alt="VPK students learning"
                                        width={600}
                                        height={500}
                                        className="w-full h-auto object-cover"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-linear-to-t from-teal-600/20 to-transparent" />
                                </div>
                                {/* Decorative Elements */}
                                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-linear-to-br from-teal-400 to-green-500 rounded-2xl -z-10" />
                                <div className="absolute -top-6 -right-6 w-24 h-24 bg-linear-to-br from-green-400 to-teal-500 rounded-full -z-10 opacity-60" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Navigation */}
            <ProgramNavigation current="vpk" />

            {/* CTA Section */}
            <ProgramsCTA />

            <Footer />
        </main>
    );
}
