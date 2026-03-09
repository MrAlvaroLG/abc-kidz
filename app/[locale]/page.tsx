import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import TrustSection from "@/components/home/TrustSection";
import ProgramsSection from "@/components/home/ProgramsSection";
import CtaSection from "@/components/home/CtaSection";
import LocationSection from "@/components/home/LocationSection";
import { seoConfig } from "@/components/seo/seo.config";
import { generateAlternates, generateCanonicalUrl } from "@/lib/seo-utils";

/**
 * Metadata específica para la página de inicio
 * 
 * Esta metadata sobrescribe la del layout para la página principal.
 * Está optimizada con keywords de alta intención para "daycare Tampa".
 */
export async function generateMetadata({ 
    params 
}: { 
    params: Promise<{ locale: string }> 
}): Promise<Metadata> {
    const { locale } = await params;
    const validLocale = (locale === 'en' || locale === 'es') ? locale : 'en';
    const { site, business } = seoConfig;
    
    // Obtener la URL base limpia
    const baseUrl = site.url;

    const isEs = validLocale === 'es';

    return {
        // Título optimizado: Marca | Keyword Principal | Ubicación
        title: isEs 
            ? `${business.name} | Mejor Guardería y VPK en Tampa, FL`
            : `${business.name} | Premier Daycare & VPK in Tampa, FL`,
            
        // Descripción optimizada para CTR (Click Through Rate)
        description: isEs
            ? "La guardería hispana #1 en Tampa (33612). Ofrecemos cuidado de bebés, VPK gratis y programas after-school en un entorno seguro y amoroso. ¡Agenda tu visita!"
            : "Top-rated preschool in Tampa (33612). Free VPK, infant care & secure after-school programs. Nurturing environment with cameras. Book your tour!",
            
        // Keywords específicas de alto valor
        keywords: isEs 
            ? ["guardería tampa", "vpk gratis tampa", "cuidado de niños 33612", "daycare en español", "abc kidz preschool"]
            : ["daycare tampa", "free vpk tampa", "infant care 33612", "preschool tampa", "abc kidz"],

        // Canonical y hreflang usando utilidad dinámica
        alternates: generateAlternates(validLocale, '/'),

        // OpenGraph para compartir en redes (Facebook/WhatsApp)
        openGraph: {
            title: isEs 
                ? "¡La Mejor Educación para tu Hijo en Tampa!"
                : "The Best Start for Your Child in Tampa!",
            description: isEs
                ? "Descubre por qué cientos de familias latinas confían en ABC Kidz. Seguridad, amor y educación."
                : "Discover why hundreds of families trust ABC Kidz. Safety, love, and education.",
            url: generateCanonicalUrl(validLocale, '/'),
            siteName: business.name,
            locale: isEs ? "es_US" : "en_US",
            alternateLocale: isEs ? ['en_US'] : ['es_US'],
            type: "website",
            images: [
                {
                    url: `${baseUrl}/opengraph-image.jpg`, // Asegúrate de tener esta imagen
                    width: 1200,
                    height: 630,
                    alt: "ABC Kidz Preschool Happy Children",
                },
            ],
        },
        
        // Robot directives
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

export default function Home() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <HeroSection />
            <TrustSection />
            <ProgramsSection />
            <LocationSection />
            <CtaSection />
            <Footer />
        </main>
    );
}
