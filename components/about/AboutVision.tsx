'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';

export default function AboutVision() {
    const t = useTranslations('aboutPage.vision');
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

    const highlights = t.raw('highlights') as string[];

    return (
        <section ref={sectionRef} className="py-20 md:py-32 bg-linear-to-b from-bg to-surface relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-800/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-6">
                        <EyeIcon className="w-5 h-5 text-accent" />
                        <span className="text-navy-900 text-sm font-semibold">{t('badge')}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-6">
                        {t('title')}
                    </h2>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto">
                    {/* Vision Statement */}
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="bg-linear-to-br from-accent/20 to-yellow-300/10 border-2 border-accent/20 rounded-3xl p-8 md:p-12 mb-10">
                            <p className="text-xl md:text-2xl text-navy-900 leading-relaxed font-medium text-center">
                                {t('description')}
                            </p>
                        </div>

                        {/* Highlights Grid */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {highlights.map((highlight, index) => (
                                <div 
                                    key={index}
                                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 bg-linear-to-br from-accent to-yellow-400 rounded-full flex items-center justify-center shrink-0 mt-1">
                                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <p className="text-navy-900/80 text-lg leading-relaxed">
                                            {highlight}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
