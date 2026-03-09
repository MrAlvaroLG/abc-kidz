'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { 
    ClockIcon, 
    CurrencyDollarIcon, 
    ShieldCheckIcon, 
    UserGroupIcon,
    DocumentArrowDownIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function TermsContent() {
    const t = useTranslations('termsPage');
    const [activeSection, setActiveSection] = useState<string>('enrollment');

    const sections = [
        { id: 'enrollment', icon: UserGroupIcon, key: 'enrollment' },
        { id: 'hours', icon: ClockIcon, key: 'hours' },
        { id: 'payment', icon: CurrencyDollarIcon, key: 'payment' },
        { id: 'policies', icon: ShieldCheckIcon, key: 'policies' }
    ];

    return (
        <section className="py-16 md:py-24 bg-bg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Navigation */}
                    <div className="mb-12 overflow-x-auto">
                        <div className="flex gap-4 min-w-max md:min-w-0 md:justify-center">
                            {sections.map((section) => {
                                const Icon = section.icon;
                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                            activeSection === section.id
                                                ? 'bg-accent text-navy-900 shadow-lg'
                                                : 'bg-white text-navy-900/60 hover:bg-accent/10'
                                        }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        {t(`sections.${section.key}.title`)}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-navy-900/5">
                        {sections.map((section) => (
                            <div
                                key={section.id}
                                className={`transition-all duration-500 ${
                                    activeSection === section.id ? 'block' : 'hidden'
                                }`}
                            >
                                <h2 className="text-3xl font-bold text-navy-900 mb-8">
                                    {t(`sections.${section.key}.title`)}
                                </h2>

                                <div className="space-y-6">
                                    {(t.raw(`sections.${section.key}.items`) as Array<{
                                        subtitle: string;
                                        content: string | string[];
                                    }>).map((item, index) => (
                                        <div key={index} className="border-l-4 border-accent pl-6 py-2">
                                            <h3 className="text-xl font-bold text-navy-900 mb-3">
                                                {item.subtitle}
                                            </h3>
                                            {Array.isArray(item.content) ? (
                                                <ul className="space-y-2">
                                                    {item.content.map((point, idx) => (
                                                        <li key={idx} className="flex items-start gap-3">
                                                            <CheckCircleIcon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                                            <span className="text-navy-900/70 leading-relaxed">
                                                                {point}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-navy-900/70 leading-relaxed">
                                                    {item.content}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Download Section */}
                    <div className="mt-12 bg-linear-to-br from-navy-900 via-blue-800 to-navy-900 rounded-3xl p-8 md:p-12 text-center">
                        <DocumentArrowDownIcon className="w-16 h-16 text-accent mx-auto mb-6" />
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            {t('download.title')}
                        </h3>
                        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                            {t('download.description')}
                        </p>
                        <a 
                            href="/ABC KIDZ Facility Parents Handbook.pdf" 
                            download
                            className="inline-flex items-center gap-3 bg-accent hover:bg-accent-hover text-navy-900 font-bold py-4 px-8 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                        >
                            <DocumentArrowDownIcon className="w-6 h-6" />
                            {t('download.button')}
                        </a>
                        <p className="text-white/60 text-sm mt-4">
                            {t('download.fileInfo')}
                        </p>
                    </div>

                    {/* Contact Note */}
                    <div className="mt-8 text-center">
                        <p className="text-navy-900/60 leading-relaxed">
                            {t('contactNote')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
