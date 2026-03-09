'use client';

import { useTranslations } from 'next-intl';
import { 
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon,
} from '@heroicons/react/24/outline';

export default function LocationSection() {
    const t = useTranslations('locationSection');

    const contactInfo = [
        {
            icon: MapPinIcon,
            label: t('address.label'),
            value: '1745 W Fletcher Ave',
            value2: 'Tampa, FL 33612',
            link: 'https://maps.google.com/?q=1745+W+Fletcher+Ave,+Tampa,+FL+33612'
        },
        {
            icon: PhoneIcon,
            label: t('phone.label'),
            value: '+1 (813) 512-2511',
            link: 'tel:+18135122511'
        },
        {
            icon: EnvelopeIcon,
            label: t('email.label'),
            value: 'abckidzdirector@gmail.com',
            link: 'mailto:abckidzdirector@gmail.com'
        }
    ];

    return (
        <section className="relative py-8 md:py-12 bg-linear-to-b from-bg to-surface overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-20 -right-32 w-96 h-96 bg-blue-800/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-base sm:text-lg text-navy-900/60">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="max-w-5xl mx-auto space-y-8">
                    {/* Google Maps Embed */}
                    <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl border border-navy-900/5">
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

                    {/* Contact Info Cards */}
                    <div className="grid sm:grid-cols-3 gap-4">
                        {contactInfo.map((info, index) => (
                            <a
                                key={index}
                                href={info.link}
                                target={info.icon === MapPinIcon ? '_blank' : undefined}
                                rel={info.icon === MapPinIcon ? 'noopener noreferrer' : undefined}
                                className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-navy-900/5 group"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-12 h-12 bg-linear-to-br from-accent to-accent-hover rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                                        <info.icon className="w-6 h-6 text-navy-900" />
                                    </div>
                                    <p className="text-xs font-bold text-navy-900/50 uppercase tracking-wider mb-1">
                                        {info.label}
                                    </p>
                                    <p className="text-sm font-semibold text-navy-900">
                                        {info.value}
                                    </p>
                                    {info.value2 && (
                                        <p className="text-sm font-semibold text-navy-900">
                                            {info.value2}
                                        </p>
                                    )}
                                </div>
                            </a>
                        ))}
                    </div>

                
                </div>
            </div>
        </section>
    );
}
