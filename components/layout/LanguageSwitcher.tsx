'use client'

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { LanguageIcon } from '@heroicons/react/24/outline';
import { useTransition } from 'react';

interface LanguageSwitcherProps {
    translations?: {
        language: string;
        slug: string;
    }[];
}
export default function LanguageSwitcher({ translations }: LanguageSwitcherProps = {}) {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const toggleLanguage = () => {
        const newLocale = locale === 'en' ? 'es' : 'en';
        
        startTransition(() => {
            if (translations && translations.length > 0) {
                const translation = translations.find(t => t.language === newLocale);
                if (translation) {
                    router.push(`/blog/${translation.slug}`, { locale: newLocale });
                    return;
                }
            }
            router.replace(pathname, { locale: newLocale });
        });
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex flex-row items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 group"
            aria-label="Change language"
            disabled={isPending}
            title={locale === 'en' ? 'Cambiar a Español' : 'Switch to English'}
        >
            <div 
                className={`flex items-center gap-2 px-2 py-1.5 md:py-1 rounded-lg md:transition-all md:duration-500 ${
                    locale === 'en' 
                        ? 'bg-linear-to-br from-[#0288D1] via-[#C62828] to-[#0288D1]' 
                        : 'bg-linear-to-br from-[#C62828] via-[#FBC02D] to-[#C62828]'
                }`}
                style={{
                    backgroundSize: '200% 200%',
                    backgroundPosition: '0% 50%',
                }}
                onMouseEnter={(e) => {
                    if (window.innerWidth >= 768) {
                        e.currentTarget.style.backgroundPosition = '100% 50%';
                    }
                }}
                onMouseLeave={(e) => {
                    if (window.innerWidth >= 768) {
                        e.currentTarget.style.backgroundPosition = '0% 50%';
                    }
                }}
            >
                <LanguageIcon className="h-6 w-6 md:h-7 md:w-7 text-white" />
                <span className="text-xl md:text-2xl font-semibold uppercase text-white">
                    {locale === 'en' ? 'EN' : 'ES'}
                </span>
            </div>
        </button>
    );
}
