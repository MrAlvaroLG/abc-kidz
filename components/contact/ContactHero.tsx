'use client';

import { useTranslations } from 'next-intl';
import { 
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';

export default function ContactHero() {
    const t = useTranslations('contactPage');

    return (
        <section className="relative pt-10 pb-20 md:pt-20 md:pb-28 bg-linear-to-br from-navy-900 via-blue-900 to-navy-900 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/15 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Hero Content */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent/20 backdrop-blur-sm rounded-full text-accent font-semibold text-sm mb-8 animate-fade-in border border-accent/30">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                        </span>
                        {t('hero.badge')}
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-8 animate-fade-in-up leading-tight">
                        {t('hero.title')}
                    </h1>
                    
                    <p className="text-lg sm:text-xl lg:text-2xl text-white/80 leading-relaxed max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        {t('hero.subtitle')}
                    </p>
                </div>

                {/* Quick Contact Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto">
                    {/* Phone Card */}
                    <a 
                        href="tel:+18135122511"
                        className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:border-accent/50 transition-all duration-300 animate-fade-in-up hover:scale-105"
                        style={{ animationDelay: '0.2s' }}
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="w-14 h-14 bg-linear-to-br from-accent to-yellow-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-accent/25">
                                <PhoneIcon className="w-7 h-7 text-navy-900" />
                            </div>
                            <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2">
                                {t('hero.phone')}
                            </p>
                            <p className="text-base font-bold text-white group-hover:text-accent transition-colors duration-300">
                                +1 (813) 512-2511
                            </p>
                        </div>
                    </a>

                    {/* Email Card */}
                    <a 
                        href="mailto:abckidzdirector@gmail.com"
                        className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:border-accent/50 transition-all duration-300 animate-fade-in-up hover:scale-105"
                        style={{ animationDelay: '0.3s' }}
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="w-14 h-14 bg-linear-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-blue-500/25">
                                <EnvelopeIcon className="w-7 h-7 text-white" />
                            </div>
                            <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2">
                                {t('hero.email')}
                            </p>
                            <p className="text-sm font-bold text-white group-hover:text-accent transition-colors duration-300 break-all">
                                abckidzdirector@gmail.com
                            </p>
                        </div>
                    </a>

                    {/* Address Card */}
                    <a 
                        href="https://maps.google.com/?q=1745+W+Fletcher+Ave,+Tampa,+FL+33612"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:border-accent/50 transition-all duration-300 animate-fade-in-up hover:scale-105"
                        style={{ animationDelay: '0.5s' }}
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="w-14 h-14 bg-linear-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-purple-500/25">
                                <MapPinIcon className="w-7 h-7 text-white" />
                            </div>
                            <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2">
                                {t('hero.address')}
                            </p>
                            <p className="text-sm font-bold text-white group-hover:text-accent transition-colors duration-300">
                                1745 W Fletcher Ave, Tampa
                            </p>
                        </div>
                    </a>
                </div>
            </div>

            {/* Wave Divider */}
            <div className="absolute -bottom-px left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-auto block">
                    <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
                </svg>
            </div>
        </section>
    );
}
