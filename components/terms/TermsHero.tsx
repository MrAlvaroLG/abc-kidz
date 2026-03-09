'use client';

import { useTranslations } from 'next-intl';
import { DocumentTextIcon } from '@heroicons/react/24/solid';

export default function TermsHero() {
    const t = useTranslations('termsPage.hero');

    return (
        <section className="relative py-20 md:py-28 bg-linear-to-br from-navy-900 via-blue-800 to-navy-900 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/20 rounded-2xl mb-6 animate-fade-in">
                        <DocumentTextIcon className="w-10 h-10 text-accent" />
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
                        {t('title')}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        {t('subtitle')}
                    </p>

                    {/* Last updated */}
                    <div className="mt-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <span className="text-white/70 text-sm">{t('lastUpdated')}: </span>
                        <span className="text-white font-semibold text-sm">{t('date')}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
