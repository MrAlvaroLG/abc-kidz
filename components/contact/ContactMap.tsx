'use client';

import { useTranslations } from 'next-intl';
import { MapPinIcon } from '@heroicons/react/24/outline';

export default function ContactMap() {
    const t = useTranslations('contactPage.map');

    return (
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-navy-900/5 relative overflow-hidden">
            {/* Decorative corner accent */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-linear-to-br from-accent/10 to-transparent rounded-br-[100px]" />
            
            <div className="relative">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-linear-to-br from-accent to-yellow-400 rounded-2xl flex items-center justify-center shadow-lg shadow-accent/25">
                        <MapPinIcon className="w-8 h-8 text-navy-900" />
                    </div>
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-navy-900">
                            {t('title')}
                        </h2>
                        <p className="text-navy-900/60 text-lg">
                            {t('subtitle')}
                        </p>
                    </div>
                </div>

                {/* Map Container */}
                <div className="relative w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-xl ring-1 ring-navy-900/10">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3523.4712857744247!2d-82.47037492426753!3d28.018956715447736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2c0f7f9f9f9f9%3A0x1234567890abcdef!2s1745%20W%20Fletcher%20Ave%2C%20Tampa%2C%20FL%2033612!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="ABC Kids Location Map"
                    />
                </div>

                {/* Action Button */}
                <div className="mt-6">
                    <a
                        href="https://maps.google.com/?q=1745+W+Fletcher+Ave,+Tampa,+FL+33612"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-accent to-yellow-400 text-navy-900 font-bold text-lg rounded-xl shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 hover:scale-[1.02]"
                    >
                        <MapPinIcon className="w-6 h-6" />
                        {t('directions')}
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}
