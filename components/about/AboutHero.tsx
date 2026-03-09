'use client';

import { useTranslations } from 'next-intl';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';
import { Hero } from '@/components/ui/Hero';

export default function AboutHero() {
    const t = useTranslations('aboutPage.hero');

    return (
        <Hero
            variant="page"
            align="center"
            topContent={
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20">
                    <ShieldCheckIcon className="w-5 h-5 text-green-400" />
                    <span className="text-white/90 text-sm font-medium">{t('badge')}</span>
                </div>
            }
            title={
                <>
                    {t('title')}
                    <span className="block mt-2 text-transparent bg-clip-text bg-linear-to-r from-accent via-yellow-300 to-accent">
                        {t('titleHighlight')}
                    </span>
                </>
            }
            subtitle={t('subtitle')}
        />
    );
}
