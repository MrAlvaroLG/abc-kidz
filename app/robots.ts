/**
 * Robots.txt Dinámico
 * 
 * Este archivo le dice a los motores de búsqueda (Google, Bing, etc.)
 * qué páginas pueden rastrear e indexar.
 * 
 * El archivo estará disponible en: https://tudominio.com/robots.txt
 * 
 * La información del dominio se importa desde seo.config.ts
 */

import { MetadataRoute } from 'next';
import { seoConfig } from '@/components/seo/seo.config';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = seoConfig.site.url;
    
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/studio/',      // Sanity Studio - no indexar
                    '/api/',         // API routes - no indexar
                    '/_next/',       // Next.js internals - no indexar
                    '/admin/',       // Cualquier área de admin
                ],
            },
            {
                // Bloquear bots maliciosos conocidos
                userAgent: ['AhrefsBot', 'MJ12bot', 'SemrushBot'],
                disallow: '/',
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}
