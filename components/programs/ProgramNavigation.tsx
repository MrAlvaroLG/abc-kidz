import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

const programs = [
    { 
        key: 'infants', 
        path: '/programs/infants',
        color: 'text-pink-600',
        bgHover: 'group-hover:bg-pink-50',
        borderHover: 'group-hover:border-pink-200',
        textHover: 'group-hover:text-pink-600',
        iconColor: 'group-hover:text-pink-500'
    },
    { 
        key: 'toddlers', 
        path: '/programs/toddlers',
        color: 'text-blue-500',
        bgHover: 'group-hover:bg-blue-50',
        borderHover: 'group-hover:border-blue-200',
        textHover: 'group-hover:text-blue-600',
        iconColor: 'group-hover:text-blue-500'
    },
    { 
        key: 'prek', 
        path: '/programs/prek',
        color: 'text-orange-500',
        bgHover: 'group-hover:bg-orange-50',
        borderHover: 'group-hover:border-orange-200',
        textHover: 'group-hover:text-orange-600',
        iconColor: 'group-hover:text-orange-500'
    },
    { 
        key: 'vpk', 
        path: '/programs/vpk',
        color: 'text-green-600',
        bgHover: 'group-hover:bg-green-50',
        borderHover: 'group-hover:border-green-200',
        textHover: 'group-hover:text-green-600',
        iconColor: 'group-hover:text-green-500'
    },
    { 
        key: 'after_school', 
        path: '/programs/after-school',
        color: 'text-indigo-600',
        bgHover: 'group-hover:bg-indigo-50',
        borderHover: 'group-hover:border-indigo-200',
        textHover: 'group-hover:text-indigo-600',
        iconColor: 'group-hover:text-indigo-500'
    }
] as const;

type ProgramKey = typeof programs[number]['key'];

interface ProgramNavigationProps {
    current: ProgramKey;
}

export default function ProgramNavigation({ current }: ProgramNavigationProps) {
    const t = useTranslations('footer.programs');
    const common = useTranslations('common');
    
    const currentIndex = programs.findIndex(p => p.key === current);
    const prev = currentIndex > 0 ? programs[currentIndex - 1] : null;
    const next = currentIndex < programs.length - 1 ? programs[currentIndex + 1] : null;

    if (!prev && !next) return null;

    return (
        <nav className="bg-white border-t border-gray-100 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 max-w-7xl mx-auto">
                    {/* Previous Program */}
                    <div className="w-full sm:w-1/2 flex justify-start">
                        {prev ? (
                            <Link 
                                href={prev.path}
                                className={`group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 w-full sm:w-auto ${prev.bgHover}`}
                            >
                                <div className={`w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300 ${prev.borderHover}`}>
                                    <ArrowLeftIcon className={`w-5 h-5 text-gray-400 transition-colors ${prev.iconColor}`} />
                                </div>
                                <div className="text-left">
                                    <span className={`block text-xs uppercase tracking-wider text-gray-400 font-semibold transition-colors ${prev.textHover}`}>
                                        {common('previousProgram')}
                                    </span>
                                    <span className={`text-lg font-bold text-navy-900 transition-colors ${prev.textHover}`}>
                                        {t(prev.key)}
                                    </span>
                                </div>
                            </Link>
                        ) : (
                            <div className="w-full sm:w-auto p-4 hidden sm:block" /> /* Spacer */
                        )}
                    </div>

                    {/* Divider for mobile */}
                    <div className="w-full h-px bg-gray-100 sm:hidden" />

                    {/* Next Program */}
                    <div className="w-full sm:w-1/2 flex justify-end">
                        {next ? (
                            <Link 
                                href={next.path}
                                className={`group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 w-full sm:w-auto flex-row-reverse sm:flex-row-reverse text-right justify-between sm:justify-start ${next.bgHover}`}
                            >
                                <div className="text-right">
                                    <span className={`block text-xs uppercase tracking-wider text-gray-400 font-semibold transition-colors ${next.textHover}`}>
                                        {common('nextProgram')}
                                    </span>
                                    <span className={`text-lg font-bold text-navy-900 transition-colors ${next.textHover}`}>
                                        {t(next.key)}
                                    </span>
                                </div>
                                <div className={`w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300 ${next.borderHover}`}>
                                    <ArrowRightIcon className={`w-5 h-5 text-gray-400 transition-colors ${next.iconColor}`} />
                                </div>
                            </Link>
                        ) : (
                            <div className="w-full sm:w-auto p-4 hidden sm:block" /> /* Spacer */
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
