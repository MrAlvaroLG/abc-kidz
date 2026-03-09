'use client';

import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faFacebook,
    faInstagram,
    faTiktok,
    faWhatsapp
} from '@fortawesome/free-brands-svg-icons';

export default function ContactSocialResponse() {
    const t = useTranslations('contactPage.info');

    const socialLinks = [
        { 
            icon: faFacebook, 
            href: 'https://www.facebook.com/abckidzpreschool', 
            label: 'Facebook',
            color: 'hover:bg-blue-600 hover:border-blue-600'
        },
        { 
            icon: faInstagram, 
            href: 'https://www.instagram.com/abc_kidz_preschool/', 
            label: 'Instagram',
            color: 'hover:bg-pink-600 hover:border-pink-600'
        },
        { 
            icon: faTiktok, 
            href: 'https://www.tiktok.com/@abc.kidz.preschool?_t=ZT-90O84znEJap&_r=1', 
            label: 'TikTok',
            color: 'hover:bg-black hover:border-black'
        }
    ];

    return (
        <div className="relative">
            {/* WhatsApp CTA - Big Prominent Button */}
            <div className="bg-linear-to-br from-green-500 to-green-600 rounded-3xl p-8 md:p-12 shadow-2xl shadow-green-500/20 mb-8 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white text-sm font-semibold mb-4">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            {t('whatsapp.badge')}
                        </div>
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3">
                            {t('whatsapp.title')}
                        </h3>
                        <p className="text-white/90 text-lg max-w-md">
                            {t('whatsapp.subtitle')}
                        </p>
                    </div>

                    <a
                        href="https://wa.me/18137704917"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 bg-white text-green-600 font-bold text-lg md:text-xl px-8 py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                        <FontAwesomeIcon icon={faWhatsapp} className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                        <span>{t('whatsapp.button')}</span>
                        <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Social Media Section */}
            <div className="bg-linear-to-br from-navy-900 to-blue-900 rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                            {t('social.title')}
                        </h3>
                        <p className="text-white/70 text-lg max-w-xl mx-auto">
                            {t('social.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className={`group flex items-center justify-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 transition-all duration-300 hover:scale-105 ${social.color}`}
                            >
                                <FontAwesomeIcon icon={social.icon} className="w-6 h-6 text-white" />
                                <span className="text-white font-semibold">{social.label}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
