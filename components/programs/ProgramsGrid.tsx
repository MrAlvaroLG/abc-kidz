'use client';

import { useTranslations } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { Link } from '@/i18n/routing';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faBabyCarriage, 
    faChild,
    faBook,
    faGraduationCap,
    faSchool
} from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type ProgramKey = 'infants' | 'toddlers' | 'prek' | 'vpk' | 'after_school';

const programIcons: Record<ProgramKey, IconDefinition> = {
    infants: faBabyCarriage,
    toddlers: faChild,
    prek: faBook,
    vpk: faGraduationCap,
    after_school: faSchool
};

const programColors = {
    infants: {
        gradient: 'from-pink-500 to-purple-500',
        title: 'text-3xl md:text-4xl font-bold text-white',
        bullet: 'bg-linear-to-br from-pink-500 to-purple-500',
    },
    toddlers: {
        gradient: 'from-blue-500 to-cyan-500',
        title: 'text-3xl md:text-4xl font-bold text-white',
        bullet: 'bg-linear-to-br from-blue-500 to-cyan-500',
    },
    prek: {
        gradient: 'from-orange-500 to-yellow-500',
        title: 'text-3xl md:text-4xl font-bold text-white',
        bullet: 'bg-linear-to-br from-orange-500 to-yellow-500',
    },
    vpk: {
        gradient: 'from-green-500 to-teal-500',
        title: 'text-3xl md:text-4xl font-bold text-white',
        bullet: 'bg-linear-to-br from-green-500 to-teal-500',
    },
    after_school: {
        gradient: 'from-indigo-500 to-violet-500',
        title: 'text-3xl md:text-4xl font-bold text-white',
        bullet: 'bg-linear-to-br from-indigo-500 to-violet-500',
    }
};

export default function ProgramsGrid() {
    const t = useTranslations('programsSection');
    const [visibleCards, setVisibleCards] = useState<number[]>([]);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.getAttribute('data-index') || '0');
                        setVisibleCards(prev => [...new Set([...prev, index])]);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const cards = document.querySelectorAll('.program-card-wrapper');
        cards.forEach(card => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    const programs: ProgramKey[] = ['infants', 'toddlers', 'prek', 'vpk', 'after_school'];

    return (
        <Section ref={sectionRef} className="bg-bg">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-4">
                    {t('title')}
                </h2>
                <p className="text-lg md:text-xl text-navy-900/60">
                    {t('subtitle')}
                </p>
            </div>

            {/* Programs Grid - 2x2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {programs.map((programKey, index) => {
                    const colors = programColors[programKey];
                    const isVisible = visibleCards.includes(index);
                    
                    // Age ranges estáticos
                    const ageRanges = {
                        infants: '0-12 months',
                        toddlers: '1-2 years',
                        prek: '3-4 years',
                        vpk: '4-5 years',
                        after_school: '5-12 years'
                    };

                    return (
                        <div
                            key={programKey}
                            data-index={index}
                            className={`program-card-wrapper transition-all duration-700 ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            } ${programKey === 'after_school' ? 'md:col-span-2' : ''}`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <Card hoverEffect className="h-full flex flex-col relative group">
                                {/* Icon circle - top right corner */}
                                <div className="absolute right-6 top-6 z-10">
                                    <div className={`w-16 h-16 bg-linear-to-br ${colors.gradient} rounded-full shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <FontAwesomeIcon icon={programIcons[programKey]} className="text-2xl text-white" />
                                    </div>
                                </div>

                                {/* Gradient Header */}
                                <div className={`relative bg-linear-to-br ${colors.gradient} p-8 pb-16`}>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl opacity-50 translate-x-1/4 -translate-y-1/4" />
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl opacity-50 -translate-x-1/4 translate-y-1/4" />

                                    {/* Age badge */}
                                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 mb-4">
                                        <span className="text-white text-sm font-semibold">
                                            {ageRanges[programKey]}
                                        </span>
                                    </div>

                                    <h3 className={colors.title}>
                                        {t(`programs.${programKey}.name`)}
                                    </h3>

                                    <p className="text-white/90 text-lg font-medium mt-2">
                                        {t(`programs.${programKey}.tagline`)}
                                    </p>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="space-y-4 flex-1">
                                        {t.raw(`programs.${programKey}.highlights`).map((highlight: string, idx: number) => (
                                            <div 
                                                key={idx}
                                                className="flex items-start gap-3 group/item"
                                            >
                                                <div className={`mt-0.5 w-6 h-6 rounded-full ${colors.bullet} flex items-center justify-center shrink-0 shadow-md group-hover/item:scale-110 transition-transform duration-300`}>
                                                    <CheckCircleIcon className="w-4 h-4 text-white" />
                                                </div>
                                                <p className="text-navy-900/80 font-medium leading-relaxed">
                                                    {highlight}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8">
                                        <Button asChild fullWidth className={`bg-linear-to-r ${colors.gradient} hover:brightness-110 border-0`}>
                                            <Link href={`/programs/${programKey.replace('_', '-')}`}>
                                                {t('learnMore')}
                                                <ArrowRightIcon className="w-5 h-5 ml-2" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}
