import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Poppins, Fredoka } from "next/font/google";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import { seoConfig } from "@/components/seo/seo.config";
import { generateAlternates } from "@/lib/seo-utils";
import "../globals.css";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-poppins",
    display: "swap",
});

const fredoka = Fredoka({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-fredoka",
    display: "swap",
});

/**
 * Metadata SEO Global
 * 
 * Esta es la metadata base que se aplica a todas las páginas.
 * Cada página puede sobrescribir estos valores con su propia metadata.
 * 
 * La información se importa desde seo.config.ts para facilitar su mantenimiento.
 */
export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    
    // Validar locale y establecer tipo seguro
    const validLocale = (locale === 'en' || locale === 'es') ? locale : 'en';
    
    // Obtener traducciones para metadatos desde seoConfig
    const description = validLocale === 'es' ? seoConfig.business.description.es : seoConfig.business.description.en;
    const siteName = seoConfig.site.name;

    return {
        // Base URL para resolver URLs relativas en metadata
        metadataBase: new URL(seoConfig.site.url),
        
        // Título por defecto y template para páginas hijas
        title: {
            default: `${seoConfig.business.name} Tampa | ${validLocale === 'es' ? 'La Mejor Guardería' : 'Best Childcare & Preschool'}`,
            template: `%s | ${siteName}`
        },
        
        // Descripción optimizada con keywords locales
        description: description,
        
        // Keywords importantes para SEO local
        keywords: validLocale === 'es' ? seoConfig.keywords.es : seoConfig.keywords.en,
        
        // Información del autor/empresa
        authors: [{ name: seoConfig.business.name, url: seoConfig.site.url }],
        creator: seoConfig.business.name,
        publisher: seoConfig.business.name,
        
        // Canonical y Hreflang DINÁMICOS usando utilidad
        alternates: generateAlternates(validLocale, '/'),

        // Configuración de robots
        robots: {
            index: true,
            follow: true,
            nocache: false,
            googleBot: {
                index: true,
                follow: true,
                noimageindex: false,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        
        // Open Graph para Facebook, LinkedIn, etc.
        openGraph: {
            type: "website",
            locale: locale === 'es' ? 'es_US' : 'en_US',
            alternateLocale: locale === 'es' ? ['en_US'] : ['es_US'],
            url: seoConfig.site.url,
            siteName: siteName,
            title: `${siteName} | ${locale === 'es' ? 'La Mejor Guardería' : 'Best Childcare & Preschool'}`,
            description: description,
            images: [
                {
                    url: `${seoConfig.site.url}${seoConfig.images.ogImage}`,
                    width: seoConfig.images.ogImageDimensions.width,
                    height: seoConfig.images.ogImageDimensions.height,
                    alt: `${seoConfig.business.name} - Happy Children Learning and Playing`,
                    type: "image/jpeg",
                }
            ],
        },
        
        // Twitter/X Card
        twitter: {
            card: "summary_large_image",
            title: `${siteName} | ${locale === 'es' ? 'La Mejor Guardería' : 'Best Childcare & Preschool'}`,
            description: description,
            images: [seoConfig.images.ogImage],
            creator: seoConfig.social.twitter || undefined,
            site: seoConfig.social.twitter || undefined,
        },
        
        // Verificación de Google Search Console
        verification: {
            google: "google-site-verification-code", // TODO: Update based on real needs or env
        }
    };
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    
    if (!routing.locales.includes(locale as 'en' | 'es')) {
        notFound();
    }
    
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={`${poppins.variable} ${fredoka.variable} bg-bg antialiased`}>
                <LocalBusinessSchema locale={locale} />
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
