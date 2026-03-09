'use client';

import { useTranslations } from 'next-intl';
import { HeartIcon, ShieldCheckIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';
import { Hero } from '@/components/ui/Hero';

export default function ProgramsHero() {
    const t = useTranslations('programsPage');

    return (
        <Hero
            variant="page"
            align="center"
            topContent={
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
                    <PuzzlePieceIcon className="w-5 h-5 text-accent" />
                    <span className="text-white/90 text-sm font-medium">{t('hero.badge')}</span>
                </div>
            }
            title={t('hero.title')}
            subtitle={t('hero.subtitle')}
        >
            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-8 text-left">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <HeartIcon className="w-10 h-10 text-accent mx-auto mb-3" />
                    <h3 className="text-white font-semibold mb-2 text-center">{t('hero.features.love')}</h3>
                    <p className="text-white/70 text-sm">{t('hero.features.loveDesc')}</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <ShieldCheckIcon className="w-10 h-10 text-accent mx-auto mb-3" />
                    <h3 className="text-white font-semibold mb-2 text-center">{t('hero.features.safety')}</h3>
                    <p className="text-white/70 text-sm">{t('hero.features.safetyDesc')}</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <PuzzlePieceIcon className="w-10 h-10 text-accent mx-auto mb-3" />
                    <h3 className="text-white font-semibold mb-2 text-center">{t('hero.features.play')}</h3>
                    <p className="text-white/70 text-sm">{t('hero.features.playDesc')}</p>
                </div>
            </div>
        </Hero>
    );
}
