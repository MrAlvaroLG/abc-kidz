'use client';

import { useTranslations } from 'next-intl';
import { 
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

// Componente para la información de contacto (Dirección, Teléfono, Email)
export function ContactDetails() {
    const t = useTranslations('contactPage.info');

    return (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-navy-900/5 h-full">
            <h3 className="text-2xl font-black text-navy-900 mb-6">{t('contactDetails.title')}</h3>
            
            <div className="space-y-4">
                {/* Address Card */}
                <a
                    href="https://maps.google.com/?q=1745+W+Fletcher+Ave,+Tampa,+FL+33612"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300"
                >
                    <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-purple-500/25">
                        <MapPinIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-base font-bold text-navy-900 mb-1">
                            {t('address.title')}
                        </h4>
                        <p className="text-navy-900/70 text-sm mb-1">
                            1745 W Fletcher Ave<br />
                            Tampa, FL 33612
                        </p>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent group-hover:text-accent-hover transition-colors duration-200">
                            {t('address.directions')}
                            <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </a>

                {/* Phone Card */}
                <a
                    href="tel:+18135122511"
                    className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300"
                >
                    <div className="w-12 h-12 bg-linear-to-br from-accent to-yellow-400 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-accent/25">
                        <PhoneIcon className="w-6 h-6 text-navy-900" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-base font-bold text-navy-900 mb-1">
                            {t('phone.title')}
                        </h4>
                        <p className="text-navy-900/70 text-lg font-medium mb-1">
                            +1 (813) 512-2511
                        </p>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent group-hover:text-accent-hover transition-colors duration-200">
                            {t('phone.call')}
                            <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </a>

                {/* Email Card */}
                <a
                    href="mailto:abckidzdirector@gmail.com"
                    className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300"
                >
                    <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-blue-500/25">
                        <EnvelopeIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-base font-bold text-navy-900 mb-1">
                            {t('email.title')}
                        </h4>
                        <p className="text-navy-900/70 text-sm mb-1">
                            abckidzdirector@gmail.com
                        </p>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent group-hover:text-accent-hover transition-colors duration-200">
                            {t('email.send')}
                            <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </a>
            </div>
        </div>
    );
}

// Componente para el horario de atención
export function BusinessHours() {
    const t = useTranslations('contactPage.info');

    const schedule = [
        { day: t('schedule.monday'), hours: '7:00 AM - 6:00 PM', open: true },
        { day: t('schedule.tuesday'), hours: '7:00 AM - 6:00 PM', open: true },
        { day: t('schedule.wednesday'), hours: '7:00 AM - 6:00 PM', open: true },
        { day: t('schedule.thursday'), hours: '7:00 AM - 6:00 PM', open: true },
        { day: t('schedule.friday'), hours: '7:00 AM - 6:00 PM', open: true },
        { day: t('schedule.saturday'), hours: t('schedule.closed'), open: false },
        { day: t('schedule.sunday'), hours: t('schedule.closed'), open: false }
    ];

    // Obtener el día actual (0 = domingo, 1 = lunes, etc.)
    const today = new Date().getDay();
    const dayMap = [6, 0, 1, 2, 3, 4, 5]; // Mapear a nuestro array (que empieza en lunes)
    const currentDayIndex = dayMap[today];

    return (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-navy-900/5 h-full">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-linear-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                    <ClockIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="text-2xl font-black text-navy-900">
                        {t('schedule.title')}
                    </h3>
                    <p className="text-sm text-navy-900/60">{t('schedule.subtitle')}</p>
                </div>
            </div>
            <div className="space-y-1">
                {schedule.map((item, index) => (
                    <div 
                        key={index}
                        className={`flex justify-between items-center py-3 px-4 rounded-xl transition-colors duration-200 ${
                            index === currentDayIndex 
                                ? 'bg-accent/10 border border-accent/20' 
                                : 'hover:bg-gray-50'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            {index === currentDayIndex && (
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                            )}
                            <span className={`text-sm font-semibold ${
                                index === currentDayIndex ? 'text-navy-900' : 'text-navy-900/80'
                            }`}>
                                {item.day}
                            </span>
                        </div>
                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                            item.open 
                                ? index === currentDayIndex 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'text-navy-900/70' 
                                : 'bg-red-50 text-red-500'
                        }`}>
                            {item.hours}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Componente por defecto que combina ambos (para compatibilidad)
export default function ContactInfo() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ContactDetails />
            <BusinessHours />
        </div>
    );
}
