'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import { LightBulbIcon } from '@heroicons/react/24/outline';

export default function AboutPhilosophy() {
    const t = useTranslations('aboutPage.philosophy');
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
        <section ref={sectionRef} className="py-20 md:py-32 bg-linear-to-b from-surface to-bg relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-6">
                        <LightBulbIcon className="w-5 h-5 text-accent" />
                        <span className="text-navy-900 text-sm font-semibold">{t('badge')}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-6">
                        {t('title')}
                    </h2>
                </div>

                {/* Main Content */}
                <div className="max-w-5xl mx-auto">
                    {/* Philosophy Statement */}
                    <div className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
                            <p className="text-xl md:text-2xl text-navy-900 leading-relaxed text-center font-medium italic">
                                &quot;{t('description')}&quot;
                            </p>
                        </div>
                    </div>

                    {/* Pillars Grid */}
                    <div className={`grid md:grid-cols-2 gap-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {highlights.map((highlight, index) => {
                            const icons = [
                                <svg key="0" className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.893.454a1.001 1.001 0 00-.502 1.659l2.905 2.905c.571-.339 1.198-.788 1.868-1.458.67-.67 1.119-1.297 1.458-1.868l-2.905-2.905a1 1 0 001.659-.502l.454-1.893a1 1 0 01.836-.986l4.435-.74a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.893.454a1.001 1.001 0 00-.502 1.659l2.905 2.905c.571-.339 1.198-.788 1.868-1.458.67-.67 1.119-1.297 1.458-1.868l-2.905-2.905a1 1 0 001.659-.502l.454-1.893a1 1 0 01.836-.986l4.435-.74a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.893.454a1 1 0 00-.502 1.659l2.905 2.905c.571-.339 1.198-.788 1.868-1.458.67-.67 1.119-1.297 1.458-1.868l-2.905-2.905a1 1 0 001.659-.502l.454-1.893a1 1 0 01.836-.986l4.435-.74a1 1 0 01.986.836l-.74 4.435a1 1 0 01-1.06.54l-1.454-1.893a1.001 1.001 0 00-1.659.502l-2.905 2.905c.339.571.788 1.198 1.458 1.868.67.67 1.297 1.119 1.868 1.458l2.905-2.905a1 1 0 01.502 1.659l-.454 1.893a1 1 0 01-.836.986l-4.435.74a1 1 0 01-.986-.836l-.74-4.435a1 1 0 01.54-1.06l1.893-.454a1.001 1.001 0 00.502-1.659l-2.905-2.905c-.571.339-1.198.788-1.868 1.458-.67.67-1.119 1.297-1.458 1.868l2.905 2.905a1 1 0 01-.659 1.659l-1.893.454a1 1 0 01-1.06-.54l-.74-4.435a1 1 0 01.836-.986l4.435-.74a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.893.454a1.001 1.001 0 00-.502 1.659l2.905 2.905c.571-.339 1.198-.788 1.868-1.458.67-.67 1.119-1.297 1.458-1.868l-2.905-2.905a1 1 0 01.659-1.659l1.893-.454a1 1 0 01.54 1.06l-.74 4.435a1 1 0 01-.836.986l-4.435.74a1 1 0 01-.986-.836z" /></svg>,
                                <svg key="1" className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M10.5 1.5H5.75A2.25 2.25 0 003.5 3.75v12.5A2.25 2.25 0 005.75 18.5h8.5a2.25 2.25 0 002.25-2.25V6.5m-11-5v5m6-5v5m-6 4h12" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>,
                                <svg key="2" className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>,
                                <svg key="3" className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M13 7H7v6h6V7z" /><path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2V2a1 1 0 112 0v1a2 2 0 012 2v2h1a2 2 0 012 2v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1h-2v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9a2 2 0 012-2h2V5a2 2 0 012-2v-1z" clipRule="evenodd" /></svg>,
                            ];
                            
                            return (
                                <div 
                                    key={index}
                                    className="bg-linear-to-br from-accent/10 to-yellow-300/10 border-2 border-accent/20 rounded-2xl p-6 md:p-8 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0">
                                            {icons[index % icons.length]}
                                        </div>
                                        <p className="text-navy-900 font-semibold text-lg leading-relaxed">
                                            {highlight}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
