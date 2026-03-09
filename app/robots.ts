import { MetadataRoute } from 'next';
import { seoConfig } from '@/components/seo/seo.config';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = seoConfig.site.url;
    
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/studio/', '/api/', '/_next/', '/admin/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
