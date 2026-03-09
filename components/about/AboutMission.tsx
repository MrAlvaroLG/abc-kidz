'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { SparklesIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const carouselImages = [
    { src: '/about/carrusel/photo1.jpg', alt: 'ABC Kids Learning - Children Playing' },
    { src: '/about/carrusel/photo2.jpg', alt: 'ABC Kids Learning - Educational Activities' },
    { src: '/about/carrusel/photo4.jpg', alt: 'ABC Kids Learning - Fun Learning Environment' },
];

export default function AboutMission() {
    const t = useTranslations('aboutPage.mission');
    const [isVisible, setIsVisible] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const sectionRef = useRef<HTMLElement>(null);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    }, []);

    const goToSlide = useCallback((index: number) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        // Resume autoplay after 5 seconds of inactivity
        if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
        autoPlayRef.current = setTimeout(() => setIsAutoPlaying(true), 5000);
    }, []);

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

    // Auto-play carousel
    useEffect(() => {
        if (!isAutoPlaying) return;
        
        const interval = setInterval(nextSlide, 4000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
        };
    }, []);

    const highlights = t.raw('highlights') as string[];

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
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto">
                    {/* Mission Statement */}
                    <div className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="bg-linear-to-br from-accent/10 to-accent/5 border-2 border-accent/30 rounded-3xl p-8 md:p-12">
                            <p className="text-xl md:text-2xl text-navy-900 font-semibold leading-relaxed">
                                {t('description')}
                            </p>
                        </div>
                    </div>

                    {/* Highlights Grid */}
                    <div className={`grid md:grid-cols-2 gap-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {highlights.map((highlight, index) => (
                            <div 
                                key={index}
                                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-linear-to-br from-accent to-yellow-400 rounded-lg flex items-center justify-center shrink-0 mt-1">
                                        <span className="text-navy-900 font-bold text-sm">{index + 1}</span>
                                    </div>
                                    <p className="text-navy-900 font-semibold text-lg">
                                        {highlight}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Carousel */}
                    <div className={`mt-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                            {/* Main Carousel Container */}
                            <div className="relative aspect-[4/3] sm:aspect-video md:aspect-[21/9]">
                                {carouselImages.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                                            index === currentSlide 
                                                ? 'opacity-100 scale-100' 
                                                : 'opacity-0 scale-105'
                                        }`}
                                    >
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            className="object-cover"
                                            priority={index === 0}
                                        />
                                    </div>
                                ))}
                                
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/20 to-transparent" />
                                
                                {/* Navigation Arrows */}
                                <button
                                    onClick={() => { prevSlide(); setIsAutoPlaying(false); }}
                                    className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
                                    aria-label="Previous slide"
                                >
                                    <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                </button>
                                <button
                                    onClick={() => { nextSlide(); setIsAutoPlaying(false); }}
                                    className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
                                    aria-label="Next slide"
                                >
                                    <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                </button>

                                {/* Bottom Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                                    <div className="flex items-end justify-between gap-4">
                                        {/* Text Content */}
                                        <div className="flex-1">
                                            <p className="text-white font-semibold text-base sm:text-lg">Our Mission in Action</p>
                                            <p className="text-white/70 text-xs sm:text-sm">Creating moments that inspire and empower</p>
                                        </div>
                                        
                                        {/* Dots Indicator */}
                                        <div className="flex items-center gap-2">
                                            {carouselImages.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => goToSlide(index)}
                                                    className={`transition-all duration-300 rounded-full ${
                                                        index === currentSlide
                                                            ? 'w-8 h-2 bg-accent'
                                                            : 'w-2 h-2 bg-white/50 hover:bg-white/70'
                                                    }`}
                                                    aria-label={`Go to slide ${index + 1}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                                <div 
                                    className="h-full bg-accent transition-all duration-300 ease-linear"
                                    style={{ 
                                        width: `${((currentSlide + 1) / carouselImages.length) * 100}%`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
