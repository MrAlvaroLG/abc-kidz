'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from '@/i18n/routing';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faBabyCarriage, 
    faChild,
    faBook,
    faGraduationCap,
    faSchool
} from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Image from 'next/image';

const carouselImages = [
    { src: '/home/photo7.jpg', alt: 'ABC Kids Learning Environment' },
    { src: '/home/photo2.jpg', alt: 'Children Learning Activities' },
    { src: '/home/photo4.jpg', alt: 'Fun Learning Moments' },
    { src: '/home/photo5.jpg', alt: 'Interactive Learning' },
    { src: '/home/photo6.jpg', alt: 'Creative Activities' },
];

export default function ProgramsSection() {
    const t = useTranslations('programsSection');
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

        const currentSection = sectionRef.current;

        if (currentSection) {
            observer.observe(currentSection);
        }

        return () => {
            if (currentSection) {
                observer.unobserve(currentSection);
            }
        };
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

    const programs = [
        {
            key: 'infants',
            icon: faBabyCarriage,
            ageRange: '0-12',
            ageLabel: 'months',
            gradient: 'from-pink-500 to-purple-600',
            bgColor: 'bg-pink-500',
            lightBg: 'bg-pink-50'
        },
        {
            key: 'toddlers',
            icon: faChild,
            ageRange: '1-2',
            ageLabel: 'years',
            gradient: 'from-blue-500 to-cyan-600',
            bgColor: 'bg-blue-500',
            lightBg: 'bg-blue-50'
        },
        {
            key: 'prek',
            icon: faBook,
            ageRange: '3-4',
            ageLabel: 'years',
            gradient: 'from-orange-500 to-yellow-600',
            bgColor: 'bg-orange-500',
            lightBg: 'bg-orange-50'
        },
        {
            key: 'vpk',
            icon: faGraduationCap,
            ageRange: '4-5',
            ageLabel: 'years',
            gradient: 'from-green-500 to-teal-600',
            bgColor: 'bg-green-500',
            lightBg: 'bg-teal-50'
        },
        {
            key: 'after_school',
            icon: faSchool,
            ageRange: '5-12',
            ageLabel: 'years',
            gradient: 'from-indigo-500 to-violet-600',
            bgColor: 'bg-indigo-500',
            lightBg: 'bg-indigo-50',
            className: 'md:col-span-2'
        }
    ];

    return (
        <section 
            ref={sectionRef}
            className="relative py-10 md:py-16 bg-linear-to-b from-surface to-bg overflow-hidden"
        >
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-20 -right-32 w-96 h-96 bg-blue-800/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-base sm:text-lg text-navy-900/60">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Programs Grid 2x2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto mb-16">
                    {programs.map((program, index) => (
                        <ProgramCard
                            key={program.key}
                            programKey={program.key}
                            icon={program.icon}
                            ageRange={program.ageRange}
                            ageLabel={program.ageLabel}
                            gradient={program.gradient}
                            bgColor={program.bgColor}
                            lightBg={program.lightBg}
                            isVisible={isVisible}
                            delay={index * 100}
                            className={program.className}
                        />
                    ))}
                </div>

                {/* Photo Carousel */}
                <div className={`max-w-6xl mx-auto mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-navy-900/10 to-transparent" />
                            
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

                {/* CTA Button */}
                <div className={`text-center transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <Link 
                        href="/programs"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-blue-800 to-navy-900 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
                    >
                        {t('cta')}
                        <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

// Program Card Component
function ProgramCard({ 
    programKey, 
    icon, 
    ageRange,
    ageLabel,
    gradient,
    bgColor,
    lightBg,
    isVisible,
    delay,
    className = ''
}: { 
    programKey: string;
    icon: IconDefinition;
    ageRange: string;
    ageLabel: string;
    gradient: string;
    bgColor: string;
    lightBg: string;
    isVisible: boolean;
    delay: number;
    className?: string;
}) {
    const t = useTranslations(`programsSection.programs.${programKey}`);
    const tSection = useTranslations('programsSection');
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className={`relative group transition-all duration-1000 ${className} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${delay}ms` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`relative ${lightBg} rounded-3xl shadow-xl overflow-hidden transition-all duration-500 ${isHovered ? 'shadow-2xl scale-[1.02]' : ''}`}>
                {/* Content Container - Vertical Layout Compacto */}
                <div className="p-6 md:p-8 flex flex-col items-center text-center space-y-4 min-h-80">
                    {/* Icon Large */}
                    <div className={`${bgColor} w-20 h-20 md:w-24 md:h-24 rounded-2xl shadow-2xl flex items-center justify-center transform transition-all duration-500 ${isHovered ? 'scale-110 -rotate-6' : ''}`}>
                        <FontAwesomeIcon icon={icon} className="text-3xl md:text-4xl text-white" />
                    </div>

                    {/* Program Name */}
                    <h3 className={`text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-linear-to-r ${gradient}`}>
                        {t('name')}
                    </h3>
                    
                    {/* Age Range Badge */}
                    <div className="inline-flex items-baseline gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border-2 border-navy-900/10">
                        <span className="text-xl font-bold text-navy-900">{ageRange}</span>
                        <span className="text-xs font-semibold text-navy-900/60 uppercase tracking-wider">{tSection(`ageLabels.${ageLabel}`)}</span>
                    </div>

                    {/* Tagline */}
                    <p className="text-base md:text-lg font-semibold text-navy-900/80 leading-snug max-w-xs">
                        {t('tagline')}
                    </p>

                    {/* Spacer para empujar botón al fondo */}
                    <div className="flex-1" />

                    {/* CTA Button */}
                    <Link
                        href={`/programs/${programKey.replace('_', '-')}`}
                        className={`group/btn inline-flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r ${gradient} text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-2xl transition-all duration-300 transform ${isHovered ? 'scale-105' : ''}`}
                    >
                        <span>{tSection('learnMore')}</span>
                        <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>

                {/* Hover Overlay Effect */}
                <div className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-0 transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-5' : ''}`} />
                
                {/* Decorative corner accent */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-linear-to-br ${gradient} opacity-10 blur-2xl rounded-full transform transition-all duration-500 ${isHovered ? 'scale-150' : ''}`} />
            </div>
        </div>
    );
}

