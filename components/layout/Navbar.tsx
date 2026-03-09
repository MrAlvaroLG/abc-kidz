'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import LanguageSwitcher from './LanguageSwitcher'

interface NavbarProps {
    translations?: {
        language: string;
        slug: string;
    }[];
}
export default function Navbar({ translations }: NavbarProps = {}) {
    const [isOpen, setIsOpen] = useState(false)
    const t = useTranslations('navbar')

    return (
        <>
            {/* Overlay invisible - cierra el menú al hacer clic fuera */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-transparent"
                    onClick={() => setIsOpen(false)}
                />
            )}

        <div className="sticky top-0 z-50 bg-surface shadow-md rounded-2xl md:shadow-none md:rounded-none">
            <div className="flex items-center justify-between px-4 py-2">
                {/*logo*/}
                <Link href="/" className="transition-transform hover:scale-105 duration-300">
                    <Image 
                        src="/logo.png" 
                        alt="ABC Kidz Preschool Logo" 
                        width={9101} 
                        height={6744}
                        className="h-11 md:h-13 w-auto"
                        priority
                    />
                </Link>
                
                {/* Navegación desktop - oculto en móvil */}
                <nav className="hidden lg:flex items-center gap-12 text-2xl font-semibold">
                    <Link 
                        href="/programs"
                        className="relative text-navy-900 hover:text-accent transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 group"
                    >
                        {t('programs')}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300 ease-out"></span>
                    </Link>
                    <Link 
                        href="/blog"
                        className="relative text-navy-900 hover:text-accent transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 group"
                    >
                        {t('blog')}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300 ease-out"></span>
                    </Link>
                    <Link 
                        href="/contact"
                        className="relative text-navy-900 hover:text-accent transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 group"
                    >
                        {t('contact')}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300 ease-out"></span>
                    </Link>
                    <Link 
                        href="/about"
                        className="relative text-navy-900 hover:text-accent transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 group"
                    >
                        {t('about')}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300 ease-out"></span>
                    </Link>
                    <Link 
                        href="/terms"
                        className="relative text-navy-900 hover:text-accent transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 group"
                    >
                        {t('terms')}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300 ease-out"></span>
                    </Link>
                </nav>
                
                <div className="flex items-center gap-2">
                    {/* Selector de idioma - visible siempre */}
                    <LanguageSwitcher translations={translations} />
                    
                    {/* Botón hamburguesa - solo móvil */}
                    <button 
                        className="block lg:hidden w-8 h-8 relative hover:scale-110 transition-transform duration-300 group"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
                    >
                        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}>
                            {isOpen ? (
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <div className="absolute h-1 w-full bg-navy-900 rounded-full rotate-45 transition-colors duration-300"></div>
                                    <div className="absolute h-1 w-full bg-navy-900 rounded-full -rotate-45 transition-colors duration-300"></div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-1.5 w-full">
                                    <div className="h-1 w-full bg-navy-900 rounded-full transition-colors duration-300"></div>
                                    <div className="h-1 w-full bg-navy-900 rounded-full transition-colors duration-300"></div>
                                    <div className="h-1 w-full bg-navy-900 rounded-full transition-colors duration-300"></div>
                                </div>
                            )}
                        </div>
                    </button>
                </div>
            </div>

            {/* Menú móvil desplegable */}
            <div className={`lg:hidden transition-all duration-400 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <nav className="flex flex-col gap-4 px-4 pb-4 w-full text-lg md:text-xl font-semibold">
                    <Link 
                        href="/programs"
                        className={`text-navy-900 transition-all duration-400 ease-out ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}
                        style={{ 
                            transitionDelay: isOpen ? '0ms' : '0ms',
                            transitionTimingFunction: isOpen ? 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'ease-out'
                        }}
                    >
                        {t('programs')}
                    </Link>
                    <Link 
                        href="/blog"
                        className={`text-navy-900 transition-all duration-400 ease-out ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}
                        style={{ 
                            transitionDelay: isOpen ? '50ms' : '0ms',
                            transitionTimingFunction: isOpen ? 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'ease-out'
                        }}
                    >
                        {t('blog')}
                    </Link>
                    <Link 
                        href="/contact"
                        className={`text-navy-900 transition-all duration-400 ease-out ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}
                        style={{ 
                            transitionDelay: isOpen ? '100ms' : '0ms',
                            transitionTimingFunction: isOpen ? 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'ease-out'
                        }}
                    >
                        {t('contact')}
                    </Link>
                    <Link 
                        href="/about"
                        className={`text-navy-900 transition-all duration-400 ease-out ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}
                        style={{ 
                            transitionDelay: isOpen ? '150ms' : '0ms',
                            transitionTimingFunction: isOpen ? 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'ease-out'
                        }}
                    >
                        {t('about')}
                    </Link>
                    <Link 
                        href="/terms"
                        className={`text-navy-900 transition-all duration-400 ease-out ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}
                        style={{ 
                            transitionDelay: isOpen ? '200ms' : '0ms',
                            transitionTimingFunction: isOpen ? 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'ease-out'
                        }}
                    >
                        {t('terms')}
                    </Link>
                </nav>
            </div>
        </div>
        </>
    );
}
