'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
    SparklesIcon, 
    HeartIcon, 
    AcademicCapIcon,
    ShieldCheckIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';

export default function AboutStory() {
    const t = useTranslations('aboutPage.story');
    const [isVisible, setIsVisible] = useState(false);
    const [activePillar, setActivePillar] = useState(0);
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

    const pillars = [
        { icon: HeartIcon, key: 'love', color: 'from-pink-500 to-rose-500', bgLight: 'bg-pink-50' },
        { icon: ShieldCheckIcon, key: 'safety', color: 'from-emerald-500 to-teal-500', bgLight: 'bg-emerald-50' },
        { icon: AcademicCapIcon, key: 'education', color: 'from-blue-500 to-indigo-500', bgLight: 'bg-blue-50' },
        { icon: UserGroupIcon, key: 'community', color: 'from-purple-500 to-pink-500', bgLight: 'bg-purple-50' }
    ];

    return (
        <section ref={sectionRef} className="py-20 md:py-32 bg-bg relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-800/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-6">
                        <HeartIcon className="w-5 h-5 text-accent" />
                        <span className="text-navy-900 text-sm font-semibold">{t('label')}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-6">
                        {t('title')}
                    </h2>
                    <p className="text-lg text-navy-900/60 leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start max-w-7xl mx-auto mb-20">
                    {/* Left - Image Gallery */}
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <div className="relative">
                            {/* Main Image */}
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-4/3 group">
                                <Image
                                    src="/about/personal/photo8.jpeg"
                                    alt="Our Story"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-navy-900/80 via-navy-900/20 to-transparent" />

                                {/* Caption */}
                                <div className="absolute bottom-6 left-6 right-6">
                                    <p className="text-white font-medium text-lg">{t('imageCaption')}</p>
                                    <p className="text-white/70 text-sm">{t('imageCaptionSub')}</p>
                                </div>
                            </div>

                            {/* Secondary Images */}
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="relative rounded-2xl overflow-hidden aspect-square shadow-xl group">
                                    <Image
                                        src="/about/kids/photo4.jpeg"
                                        alt="Learning Moments"
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="relative rounded-2xl overflow-hidden aspect-square shadow-xl group">
                                    <Image
                                        src="/about/personal/photo11.jpeg"
                                        alt="Our Team"
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right - Story Content */}
                    <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                        {/* Story Paragraphs */}
                        <div className="space-y-6 text-navy-900/70 text-lg leading-relaxed mb-12">
                            <p className="text-xl text-navy-900 font-medium leading-relaxed">
                                {t('paragraph1')}
                            </p>
                            <p>{t('paragraph2')}</p>
                            <p>{t('paragraph3')}</p>
                        </div>

                        {/* Mission Statement */}
                        <div className="bg-linear-to-r from-accent/10 to-accent/5 border-l-4 border-accent rounded-r-2xl p-6">
                            <h3 className="text-xl font-bold text-navy-900 mb-3 flex items-center gap-2">
                                <SparklesIcon className="w-6 h-6 text-accent" />
                                {t('mission.title')}
                            </h3>
                            <p className="text-navy-900/70 leading-relaxed italic">
                                &quot;{t('mission.text')}&quot;
                            </p>
                        </div>
                    </div>
                </div>

                {/* Our Pillars - Full Width Section */}
                <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {/* Pillars Header */}
                    <div className="text-center mb-12">
                        <h3 className="text-2xl md:text-3xl font-bold text-navy-900 mb-3">{t('pillarsTitle')}</h3>
                        <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
                    </div>

                    {/* Pillars Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pillars.map((pillar, index) => {
                            const Icon = pillar.icon;
                            const isActive = activePillar === index;
                            return (
                                <button
                                    key={pillar.key}
                                    onClick={() => setActivePillar(index)}
                                    className={`group relative p-6 rounded-2xl border-2 transition-all duration-500 text-left ${
                                        isActive 
                                            ? 'border-accent bg-white shadow-xl scale-[1.02]' 
                                            : 'border-navy-900/5 bg-white/50 hover:bg-white hover:border-accent/30 hover:shadow-lg'
                                    }`}
                                >
                                    {/* Active Indicator */}
                                    {isActive && (
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse" />
                                    )}

                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${pillar.color} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'shadow-lg' : ''}`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>

                                    {/* Title */}
                                    <h4 className={`font-bold text-lg mb-2 transition-colors duration-300 ${isActive ? 'text-navy-900' : 'text-navy-900/80'}`}>
                                        {t(`pillars.${pillar.key}.title`)}
                                    </h4>

                                    {/* Description */}
                                    <p className={`text-sm leading-relaxed transition-colors duration-300 ${isActive ? 'text-navy-900/70' : 'text-navy-900/50'}`}>
                                        {t(`pillars.${pillar.key}.description`)}
                                    </p>

                                    {/* Bottom Accent Line */}
                                    <div className={`absolute bottom-0 left-6 right-6 h-0.5 rounded-full transition-all duration-500 ${
                                        isActive ? 'bg-accent' : 'bg-transparent group-hover:bg-accent/30'
                                    }`} />
                                </button>
                            );
                        })}
                    </div>

                    {/* Progress Indicator */}
                    <div className="flex justify-center mt-8 gap-2">
                        {pillars.map((pillar, index) => (
                            <button
                                key={`indicator-${pillar.key}`}
                                onClick={() => setActivePillar(index)}
                                className={`h-2 rounded-full transition-all duration-500 ${
                                    activePillar === index 
                                        ? 'w-8 bg-accent' 
                                        : 'w-2 bg-navy-900/20 hover:bg-navy-900/40'
                                }`}
                                aria-label={`Go to pillar ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
