'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { Hero } from '@/components/ui/Hero';
import { Button } from '@/components/ui/Button';
import { HomeHeroVisual } from './HomeHeroVisual';

export default function HeroSection() {
    const t = useTranslations('hero');

    return (
        <Hero
            variant="home"
            title={
                <>
                    {t('title')}
                    <span className="block mt-2 text-transparent bg-clip-text bg-linear-to-r from-accent via-accent-hover to-accent animate-gradient-x">
                        {t('subtitle')}
                    </span>
                </>
            }
            description={t('description')}
            rightContent={<HomeHeroVisual />}
            bottomContent={
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-3 group cursor-pointer pb-8 animate-bounce">
                     <p className="text-sm md:text-base font-semibold text-navy-900/70 group-hover:text-accent transition-colors duration-300">
                        {t('scroll')}
                    </p>
                    <div className="relative">
                        <div className="w-7 h-11 md:w-8 md:h-12 border-2 border-navy-900/30 rounded-full flex justify-center p-2 group-hover:border-accent transition-colors duration-300 bg-surface/50 backdrop-blur-sm shadow-lg">
                            <div className="w-1.5 h-3 bg-accent rounded-full animate-scroll" />
                        </div>
                    </div>
                </div>
            }
        >
            <Button size="default" variant="primary" asChild className="group">
                <Link href="/contact">
                    {t('cta.primary')}
                    <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
            </Button>
            
            <Button size="default" variant="secondary" asChild>
                <Link href="/programs">
                    {t('cta.secondary')}
                </Link>
            </Button>
        </Hero>
    );
}
