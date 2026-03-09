'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { 
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon,
    ClockIcon
} from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faFacebook,
    faInstagram,
    faWhatsapp,
    faTiktok
} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    const t = useTranslations('footer');
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { label: t('links.about'), href: '/about' },
        { label: t('links.programs'), href: '/programs' },
        { label: t('links.blog'), href: '/blog' },
        { label: t('links.contact'), href: '/contact' }
    ];

    const programs = [
        { label: t('programs.infants'), href: '/programs/infants' },
        { label: t('programs.toddlers'), href: '/programs/toddlers' },
        { label: t('programs.prek'), href: '/programs/prek' },
        { label: t('programs.vpk'), href: '/programs/vpk' },
        { label: t('programs.after_school'), href: '/programs/after-school' }
    ];

    const socialLinks = [
        { icon: faFacebook, href: 'https://www.facebook.com/abckidzpreschool', label: 'Facebook' },
        { icon: faInstagram, href: 'https://www.instagram.com/abc_kidz_preschool/', label: 'Instagram' },
        { icon: faTiktok, href: 'https://www.tiktok.com/@abc.kidz.preschool', label: 'TikTok' },
        { icon: faWhatsapp, href: 'https://wa.me/18137704917', label: 'WhatsApp' }
    ];

    return (
        <footer className="relative bg-navy-900 text-white overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
                {/* Main Footer Content */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {/* Company Info */}
                        <div className="lg:col-span-1">
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold mb-2">
                                    ABC <span className="text-accent">Kidz Preschool</span>
                                </h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    {t('description')}
                                </p>
                            </div>

                            {/* Social Links */}
                            <div>
                                <h4 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-4">
                                    {t('followUs')}
                                </h4>
                                <div className="flex gap-3">
                                    {socialLinks.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.label}
                                            className="w-10 h-10 bg-white/10 hover:bg-accent rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 group"
                                        >
                                            <FontAwesomeIcon icon={social.icon} className="w-5 h-5 text-white group-hover:text-navy-900 transition-colors duration-300" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-lg font-bold mb-4">{t('quickLinks')}</h4>
                            <ul className="space-y-3">
                                {quickLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link 
                                            href={link.href}
                                            className="text-white/70 hover:text-accent text-sm transition-colors duration-200 flex items-center gap-2 group"
                                        >
                                            <span className="w-0 h-0.5 bg-accent transition-all duration-200 group-hover:w-4" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Programs */}
                        <div>
                            <h4 className="text-lg font-bold mb-4">{t('ourPrograms')}</h4>
                            <ul className="space-y-3">
                                {programs.map((program, index) => (
                                    <li key={index}>
                                        <Link 
                                            href={program.href}
                                            className="text-white/70 hover:text-accent text-sm transition-colors duration-200 flex items-center gap-2 group"
                                        >
                                            <span className="w-0 h-0.5 bg-accent transition-all duration-200 group-hover:w-4" />
                                            {program.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="text-lg font-bold mb-4">{t('contactInfo')}</h4>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <MapPinIcon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                    <div className="text-sm text-white/70">
                                        <p>1745 W Fletcher Ave</p>
                                        <p>Tampa, FL 33612</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <PhoneIcon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                    <a 
                                        href="tel:+18135122511"
                                        className="text-sm text-white/70 hover:text-accent transition-colors duration-200"
                                    >
                                        +1 (813) 512-2511
                                    </a>
                                </li>
                                <li className="flex items-start gap-3">
                                    <EnvelopeIcon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                    <a 
                                        href="mailto:abckidzdirector@gmail.com"
                                        className="text-sm text-white/70 hover:text-accent transition-colors duration-200"
                                    >
                                        abckidzdirector@gmail.com
                                    </a>
                                </li>
                                <li className="flex items-start gap-3">
                                    <ClockIcon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                    <div className="text-sm text-white/70">
                                        <p>{t('schedule.weekdays')}</p>
                                        <p className="text-white/50">{t('schedule.weekend')}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-sm text-white/50 text-center md:text-left">
                                © {currentYear} ABC Kidz Preschool. {t('rights')}
                            </p>
                            <div className="flex flex-wrap justify-center gap-6">
                                <Link 
                                    href="/terms"
                                    className="text-sm text-white/50 hover:text-accent transition-colors duration-200"
                                >
                                    {t('terms')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
