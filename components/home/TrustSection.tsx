'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState, useRef } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

export default function TrustSection() {
    const t = useTranslations('trustSection');
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
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

    const testimonials = t.raw('testimonials.items') as Array<{
        name: string;
        text: string;
        rating: number;
    }>;

    // Datos de la calificación de Google
    const googleRating = {
        rating: 4.4,
        totalReviews: 28,
        stars: [5, 4, 3, 2, 1],
        distribution: [18, 7, 1, 1, 1] // Cantidad de reseñas por estrella
    };

    return (
        <section 
            ref={sectionRef}
            className="relative py-6 md:py-12 lg:py-20 bg-linear-to-b from-bg to-surface overflow-hidden"
        >
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 -left-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-800/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className={`text-center max-w-3xl mx-auto mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-lg md:text-xl text-navy-900/60">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Featured Trust Banner */}
                <div className={`max-w-4xl mx-auto mb-12 md:mb-16 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="relative rounded-3xl overflow-hidden">
                        {/* Content - Centered */}
                        <div className="relative z-10 text-center pb-10">
                            {/* Animated Counter */}
                            <div className="mb-6">
                                <AnimatedCounter target={120} isVisible={isVisible} />
                            </div>

                            {/* Text */}
                            <p className="text-xl md:text-2xl lg:text-3xl text-navy-900/80 leading-relaxed max-w-2xl mx-auto">
                                {t('familiesTrust')}
                            </p>
                        </div>

                        {/* Decorative accent line */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-accent/30 to-transparent" />
                    </div>
                </div>

                {/* Google Rating Card */}
                <div className={`max-w-4xl mx-auto mb-12 md:mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <a 
                        href="https://www.google.com/maps/place/ABC+Kidz+Preschool+-+DayCare/@28.0699994,-82.4795099,17z/data=!4m16!1m9!3m8!1s0x6524446035a9944b:0x64bb5d534004770e!2sABC+Kidz+Preschool+-+DayCare!8m2!3d28.0699947!4d-82.476935!9m1!1b1!16s%2Fg%2F11v60zpynx!3m5!1s0x6524446035a9944b:0x64bb5d534004770e!8m2!3d28.0699947!4d-82.476935!16s%2Fg%2F11v60zpynx?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-navy-900/5 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                    >
                        {/* Google Logo & Rating */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            {/* Left: Google Logo */}
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center p-3">
                                    <svg className="w-full h-full" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-navy-900/60 uppercase tracking-wider">
                                        {t('googleRating.label')}
                                    </p>
                                    <p className="text-xs text-navy-900/50">
                                        {t('googleRating.verified')}
                                    </p>
                                </div>
                            </div>

                            {/* Right: Rating Display */}
                            <div className="flex flex-col items-center md:items-end">
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-5xl font-bold text-navy-900">{googleRating.rating}</span>
                                    <span className="text-2xl text-navy-900/60">/5</span>
                                </div>
                                <div className="flex gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon 
                                            key={i} 
                                            className={`w-6 h-6 ${i < Math.floor(googleRating.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-sm text-navy-900/60">
                                    {googleRating.totalReviews} {t('googleRating.reviews')}
                                </p>
                            </div>
                        </div>
                    </a>
                </div>

                {/* Testimonials Grid */}
                <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h3 className="text-2xl md:text-3xl font-bold text-navy-900 text-center mb-8 md:mb-12">
                        {t('testimonials.title')}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                        {testimonials.slice(0, 4).map((testimonial, index) => (
                            <TestimonialCard
                                key={index}
                                testimonial={testimonial}
                                delay={index * 100}
                                isVisible={isVisible}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// Testimonial Card Component
function TestimonialCard({ 
    testimonial, 
    delay,
    isVisible
}: { 
    testimonial: { name: string; text: string; rating: number };
    delay: number;
    isVisible: boolean;
}) {
    return (
        <div 
            className={`bg-white rounded-2xl p-6 shadow-lg border border-navy-900/5 hover:shadow-xl transition-all duration-500 flex flex-col ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {/* Stars */}
            <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                    <StarIcon 
                        key={i} 
                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    />
                ))}
            </div>

            {/* Review Text */}
            <p className="text-navy-900/80 text-sm leading-relaxed mb-4 line-clamp-4">
                &ldquo;{testimonial.text}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t border-navy-900/10 mt-auto">
                <div className="w-10 h-10 bg-linear-to-br from-accent to-accent-hover rounded-full flex items-center justify-center text-navy-900 font-bold">
                    {testimonial.name.charAt(0)}
                </div>
                <div>
                    <p className="font-semibold text-navy-900 text-sm">{testimonial.name}</p>
                    <p className="text-xs text-navy-900/50">Google Review</p>
                </div>
            </div>
        </div>
    );
}

// Animated Counter Component
function AnimatedCounter({ target, isVisible }: { target: number; isVisible: boolean }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number | null = null;
        const duration = 2000; // 2 seconds animation

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(easeOutQuart * target);
            
            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(target);
            }
        };

        requestAnimationFrame(animate);
    }, [isVisible, target]);

    return (
        <div className="inline-flex items-baseline gap-2">
            <span className="text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-800 via-navy-900 to-blue-800">
                {count}+
            </span>
        </div>
    );
}
