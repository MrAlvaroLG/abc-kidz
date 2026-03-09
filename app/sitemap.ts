/**
 * Sitemap.xml Dinámico Optimizado para SEO
 * 
 * Este archivo genera automáticamente un sitemap.xml con todas las páginas válidas.
 * Solo incluye URLs canónicas finales, sin duplicados ni variantes.
 * 
 * El sitemap estará disponible en: https://tudominio.com/sitemap.xml
 * 
 * La información del dominio se importa desde seo.config.ts
 */

import { MetadataRoute } from 'next';
import { seoConfig } from '@/components/seo/seo.config';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = seoConfig.site.url;
    
    // ============================================
    // RUTAS PÚBLICAS DEL SITIO
    // ============================================
    // Solo incluir URLs que:
    // 1. Existen y devuelven 200 OK
    // 2. Deben ser indexadas por Google
    // 3. Tienen contenido útil para usuarios
    
    const routes = [
        // Home - Máxima prioridad
        { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
        
        // Páginas principales
        { path: '/about', priority: 0.9, changeFrequency: 'monthly' as const },
        { path: '/contact', priority: 0.9, changeFrequency: 'monthly' as const },
        { path: '/programs', priority: 0.95, changeFrequency: 'weekly' as const },
        
        // Programas específicos - Alta prioridad para conversión
        { path: '/programs/infants', priority: 0.85, changeFrequency: 'monthly' as const },
        { path: '/programs/toddlers', priority: 0.85, changeFrequency: 'monthly' as const },
        { path: '/programs/prek', priority: 0.85, changeFrequency: 'monthly' as const },
        { path: '/programs/vpk', priority: 0.85, changeFrequency: 'monthly' as const },
        { path: '/programs/after-school', priority: 0.85, changeFrequency: 'monthly' as const },
        
        // Blog - Contenido actualizado frecuentemente
        { path: '/blog', priority: 0.8, changeFrequency: 'daily' as const },
        
        // Páginas legales - Baja prioridad
        { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    ];
    
    // Idiomas disponibles desde config
    const locales = seoConfig.site.locales;
    
    const sitemapEntries: MetadataRoute.Sitemap = [];
    
    // ============================================
    // GENERAR ENTRADAS PARA CADA IDIOMA
    // ============================================
    locales.forEach(locale => {
        routes.forEach(route => {
            sitemapEntries.push({
                // URL canónica completa
                url: `${baseUrl}/${locale}${route.path}`,
                
                // Fecha de última modificación
                lastModified: new Date(),
                
                // Frecuencia de actualización
                changeFrequency: route.changeFrequency,
                
                // Prioridad relativa (0.0 - 1.0)
                priority: route.priority,
                
                // Alternativas de idioma (hreflang automático)
                alternates: {
                    languages: Object.fromEntries(
                        locales.map(l => [l, `${baseUrl}/${l}${route.path}`])
                    ),
                },
            });
        });
    });
    
    // ============================================
    // OPCIONAL: Añadir posts de blog dinámicamente
    // ============================================
    // TODO: Cuando tengas posts en Sanity, descomentar esto:
    /*
    const posts = await client.fetch('*[_type == "post" && !(_id in path("drafts.**"))]');
    posts.forEach(post => {
        locales.forEach(locale => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/blog/${post.slug.current}`,
                lastModified: new Date(post._updatedAt),
                changeFrequency: 'monthly',
                priority: 0.7,
            });
        });
    });
    */
    
    return sitemapEntries;
}
