/**
 * LocalBusinessSchema Component
 * 
 * Este componente genera datos estructurados (Schema.org) para Google.
 * Los datos estructurados ayudan a Google a entender tu negocio y mostrar
 * rich snippets en los resultados de búsqueda (estrellas, horarios, etc.)
 * 
 * La información se importa desde seo.config.ts para facilitar su mantenimiento.
 */

import { seoConfig } from './seo.config';

interface LocalBusinessSchemaProps {
    locale: string;
}

export default function LocalBusinessSchema({ locale }: LocalBusinessSchemaProps) {
    const { business, contact, hours, social, site, images, ratings, serviceAreas, programs, amenities, payment } = seoConfig;
    
    // Select description based on locale
    const description = locale === 'es' ? business.description.es : business.description.en;

    const schema = {
        "@context": "https://schema.org",
        "@type": business.type,
        "name": business.name,
        "image": [
            `${site.url}${images.ogImage}`,
            ...images.gallery.map(img => `${site.url}${img}`)
        ],
        "description": description,
        "@id": site.url,
        "url": `${site.url}/${locale}`,
        "telephone": contact.phone.main,
        "email": contact.email,
        "priceRange": business.priceRange,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": contact.address.street,
            "addressLocality": contact.address.city,
            "addressRegion": contact.address.state,
            "postalCode": contact.address.zip,
            "addressCountry": contact.address.country
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": contact.geo.latitude,
            "longitude": contact.geo.longitude
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": hours.days,
                "opens": hours.weekdays.open,
                "closes": hours.weekdays.close
            }
        ],
        "sameAs": [
            social.facebook,
            social.instagram,
            social.tiktok,
            contact.phone.whatsappLink
        ].filter(Boolean),
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": ratings.google.rating.toString(),
            "bestRating": ratings.google.bestRating.toString(),
            "worstRating": "1",
            "reviewCount": ratings.google.reviewCount.toString()
        },
        "areaServed": serviceAreas.map(area => ({
            "@type": area.type,
            "name": area.name,
            ...(area.wiki && { "sameAs": area.wiki })
        })),
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Childcare Programs",
            "itemListElement": programs.map(program => ({
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": program.name,
                    "description": program.description
                }
            }))
        },
        "amenityFeature": amenities.map(amenity => ({
            "@type": "LocationFeatureSpecification",
            "name": amenity
        })),
        "paymentAccepted": payment.accepted,
        "currenciesAccepted": payment.currency,
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": contact.phone.main,
            "contactType": "customer service",
            "availableLanguage": ["English", "Spanish"],
            "areaServed": contact.address.country
        }
    };

    return (
        <script
            id="local-business-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
