'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { CalendarIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { trackWhatsappClick, trackScheduleVisitClick } from '@/lib/gaEvents';

export default function ProgramsCTA() {
    const t = useTranslations('programsPage.cta');

    return (
        <section className="relative py-20 md:py-32 bg-linear-to-br from-navy-900 via-blue-800 to-navy-900 overflow-hidden">
            {/* Decorative elements - Simplified for a cleaner look */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMi4yIDEuOC00IDQtNHM0IDEuOCA0IDQtMS44IDQtNCA0LTQtMS44LTQtNCIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
                <div className="absolute top-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Title */}
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight leading-tight">
                        {t('title')}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed font-light">
                        {t('subtitle')}
                    </p>

                    {/* Action buttons - Dual CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                        {/* WhatsApp Button */}
                        <a
                            href="https://wa.me/18137704917?text=Hello!%20I%27m%20interested%20in%20learning%20more%20about%20ABC%20Kids%20programs."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center justify-center gap-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-lg py-5 px-10 rounded-full shadow-2xl transition-all duration-300 hover:shadow-[#25D366]/30 hover:-translate-y-1 hover:scale-105 w-full sm:w-auto whitespace-nowrap"
                            onClick={trackWhatsappClick}
                        >
                            <FontAwesomeIcon icon={faWhatsapp} className="fa-xl shrink-0" />
                            <span>{t('whatsapp')}</span>
                        </a>

                        {/* Schedule Visit Button */}
                        <Link href="/contact" className="w-full sm:w-auto">
                            <button
                                className="group relative inline-flex items-center justify-center gap-4 bg-accent hover:bg-accent-hover text-navy-900 font-bold text-lg py-5 px-10 rounded-full shadow-2xl transition-all duration-300 hover:shadow-accent/20 hover:-translate-y-1 hover:scale-105 w-full whitespace-nowrap"
                                onClick={trackScheduleVisitClick}
                            >
                                <CalendarIcon className="w-6 h-6 shrink-0" />
                                <span>{t('scheduleVisit')}</span>
                                <ArrowRightIcon className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                        </Link>
                    </div>

                    {/* WhatsApp subtitle */}
                    <p className="mt-6 text-sm text-blue-200/80 flex items-center justify-center gap-2">
                        <FontAwesomeIcon icon={faWhatsapp} className="w-4 h-4 text-[#25D366]" />
                        {t('whatsappSubtitle')}
                    </p>
                </div>
            </div>
        </section>
    );
}
