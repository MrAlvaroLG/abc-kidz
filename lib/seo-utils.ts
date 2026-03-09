/**
 * Utilidades para SEO dinámico
 * Genera canonical URLs y alternates hreflang correctamente
 */

import { seoConfig } from '@/components/seo/seo.config';

export type LocaleType = 'en' | 'es';

/**
 * Genera la metadata de alternates con canonical y hreflang
 * 
 * @param locale - Idioma actual ('en' | 'es')
 * @param pathname - Ruta sin locale (ej: '/about', '/programs/vpk')
 * @returns Objeto alternates para Next.js metadata
 * 
 * @example
 * // En /en/about
 * generateAlternates('en', '/about')
 * // Retorna:
 * // {
 * //   canonical: 'https://www.abckidzpreschool.com/en/about',
 * //   languages: {
 * //     'en': '/en/about',
 * //     'es': '/es/about',
 * //     'x-default': '/en/about'
 * //   }
 * // }
 */
export function generateAlternates(locale: LocaleType, pathname: string = '') {
    const baseUrl = seoConfig.site.url;
    const defaultLocale = 'en';
    
    // Limpiar pathname: eliminar slash inicial si existe para evitar doble slash
    const cleanPathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
    
    return {
        // URL canónica: siempre incluye el locale
        canonical: `${baseUrl}/${locale}${cleanPathname}`,
        
        // Alternativas de idioma para hreflang (URLs absolutas requeridas por Google)
        languages: {
            'en': `${baseUrl}/en${cleanPathname}`,
            'es': `${baseUrl}/es${cleanPathname}`,
            // x-default apunta al idioma por defecto
            'x-default': `${baseUrl}/${defaultLocale}${cleanPathname}`,
        },
    };
}

/**
 * Genera una URL absoluta completa
 * 
 * @param locale - Idioma actual
 * @param pathname - Ruta sin locale
 * @returns URL completa
 */
export function generateCanonicalUrl(locale: LocaleType, pathname: string = ''): string {
    const baseUrl = seoConfig.site.url;
    const cleanPathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
    return `${baseUrl}/${locale}${cleanPathname}`;
}

/**
 * Extrae el pathname sin el locale de una URL completa
 * 
 * @param fullPath - Ruta completa con locale (ej: '/en/about')
 * @returns Pathname sin locale (ej: '/about')
 */
export function getPathnameWithoutLocale(fullPath: string): string {
    // Eliminar /en o /es del inicio
    return fullPath.replace(/^\/(en|es)/, '') || '/';
}

/**
 * Genera Open Graph metadata con URLs correctas
 */
export function generateOgMetadata(
    locale: LocaleType,
    pathname: string,
    title: string,
    description: string,
    imageUrl?: string
) {
    const url = generateCanonicalUrl(locale, pathname);
    
    return {
        type: 'website' as const,
        locale: locale === 'es' ? 'es_US' : 'en_US',
        alternateLocale: locale === 'es' ? ['en_US'] : ['es_US'],
        url,
        title,
        description,
        siteName: seoConfig.business.name,
        images: imageUrl ? [{
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
        }] : undefined,
    };
}
