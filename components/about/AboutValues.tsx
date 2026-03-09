'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
    HeartIcon, 
    ShieldCheckIcon, 
    SparklesIcon, 
    AcademicCapIcon,
    UsersIcon,
    PencilSquareIcon,
    CheckCircleIcon,
    StarIcon
} from '@heroicons/react/24/outline';

export default function AboutValues() {
    const t = useTranslations('aboutPage.values');
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const values = [
        { icon: ShieldCheckIcon, key: 'safety', color: 'from-emerald-500 to-teal-500', bgColor: 'bg-emerald-50' },
        { icon: HeartIcon, key: 'love', color: 'from-pink-500 to-rose-500', bgColor: 'bg-pink-50' },
        { icon: SparklesIcon, key: 'learning', color: 'from-blue-500 to-indigo-500', bgColor: 'bg-blue-50' },
        { icon: UsersIcon, key: 'diversity', color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-50' },
        { icon: AcademicCapIcon, key: 'communication', color: 'from-orange-500 to-amber-500', bgColor: 'bg-orange-50' },
        { icon: CheckCircleIcon, key: 'development', color: 'from-cyan-500 to-blue-500', bgColor: 'bg-cyan-50' },
        { icon: StarIcon, key: 'professionalism', color: 'from-yellow-500 to-amber-500', bgColor: 'bg-yellow-50' },
        { icon: PencilSquareIcon, key: 'play', color: 'from-red-500 to-pink-500', bgColor: 'bg-red-50' }
    ];

    return (
        <section ref={sectionRef} className="py-20 md:py-32 bg-linear-to-b from-surface to-bg relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-6">
                        <SparklesIcon className="w-5 h-5 text-accent" />
                        <span className="text-navy-900 text-sm font-semibold">{t('badge')}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-6">
                        {t('title')}
                    </h2>
                    <p className="text-lg md:text-xl text-navy-900/60">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Featured Card */}
                <div 
                    className={`max-w-7xl mx-auto mb-12 relative rounded-3xl overflow-hidden shadow-xl transition-all duration-700 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    <div className="absolute inset-0">
                        <Image
                            src="/about/kids/photo6.jpeg"
                            alt="Our Values in Action"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-navy-900 via-navy-900/60 to-transparent" />
                    </div>
                    <div className="relative h-full min-h-[300px] md:min-h-[400px] flex flex-col justify-end p-8 md:p-12">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full w-fit mb-4 border border-white/20">
                            <ShieldCheckIcon className="w-5 h-5 text-accent" />
                            <span className="text-white text-sm font-medium">{t('featuredLabel')}</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {t('featuredTitle')}
                        </h3>
                        <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
                            {t('featuredDescription')}
                        </p>
                    </div>
                </div>

                {/* 8 Values Grid */}
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <div
                                    key={value.key}
                                    className={`group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-navy-900/5 ${
                                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                    style={{ transitionDelay: `${index * 50}ms` }}
                                >
                                    {/* Icon */}
                                    <div className={`inline-flex p-3 rounded-xl bg-linear-to-br ${value.color} mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-lg font-bold text-navy-900 mb-2">
                                        {t(`items.${value.key}.title`)}
                                    </h3>
                                    <p className="text-navy-900/60 text-sm leading-relaxed">
                                        {t(`items.${value.key}.description`)}
                                    </p>

                                    {/* Hover decoration */}
                                    <div className={`absolute top-0 right-0 w-24 h-24 bg-linear-to-br ${value.color} opacity-0 group-hover:opacity-5 rounded-bl-full transition-opacity duration-500`} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
