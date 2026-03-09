'use client';

import { useTranslations } from 'next-intl';
import { NewspaperIcon } from '@heroicons/react/24/outline';

export default function BlogHero() {
    const t = useTranslations('blogPage');

    return (
        <section className="relative min-h-[40vh] flex items-center justify-center bg-linear-to-br from-navy-900 via-blue-800 to-navy-900 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-20">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6 animate-fade-in">
                        <NewspaperIcon className="w-5 h-5 text-accent" />
                        <span className="text-white/90 text-sm font-medium">{t('hero.badge')}</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
                        {t('hero.title')}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        {t('hero.subtitle')}
                    </p>
                </div>
            </div>
        </section>
    );
}
