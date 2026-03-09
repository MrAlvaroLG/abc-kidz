/**
 * SEO Configuration
 * 
 * Este archivo centraliza toda la información de SEO del sitio.
 * Modifica estos valores cuando necesites actualizar la información del negocio.
 * 
 * Todos los archivos de SEO (LocalBusinessSchema, layout.tsx, sitemap, robots)
 * importan estos datos de aquí.
 */

export const seoConfig = {
    // ============================================
    // INFORMACIÓN DEL NEGOCIO
    // ============================================
    business: {
        name: "ABC Kidz Preschool Daycare",
        legalName: "ABC Kidz Preschool Daycare LLC",
        type: "ChildCare",
        description: {
            en: "Premier daycare and preschool in Tampa, FL. We offer infant care, toddler programs, Pre-K, VPK, and after-school programs in a safe, nurturing environment. Trusted by 500+ families.",
            es: "Guardería y preescolar de primera categoría en Tampa, FL. Ofrecemos cuidado de bebés, programas para niños pequeños, Pre-K, VPK y programas después de la escuela en un ambiente seguro y acogedor."
        },
        slogan: {
            en: "Where Every Child is a Unique Piece of the Perfect Puzzle",
            es: "Donde cada niño es una pieza única del rompecabezas perfecto"
        },
        priceRange: "$$",
        foundingDate: "2020",
        numberOfEmployees: "10-20",
    },

    // ============================================
    // INFORMACIÓN DE CONTACTO
    // ============================================
    contact: {
        phone: {
            main: "+1-813-512-2511",
            display: "(813) 512-2511",
            whatsapp: "+1-813-770-4917",
            whatsappDisplay: "(813) 770-4917",
            whatsappLink: "https://wa.me/18137704917",
        },
        email: "abckidzdirector@gmail.com",
        address: {
            street: "1745 W Fletcher Ave",
            city: "Tampa",
            state: "FL",
            stateFullName: "Florida",
            zip: "33612",
            country: "US",
            countryFullName: "United States",
            full: "1745 W Fletcher Ave, Tampa, FL 33612",
        },
        geo: {
            latitude: 28.0189567,
            longitude: -82.4703749,
        },
    },

    // ============================================
    // HORARIOS DE OPERACIÓN
    // ============================================
    hours: {
        weekdays: {
            open: "07:00",
            close: "18:00",
            displayOpen: "7:00 AM",
            displayClose: "6:00 PM",
        },
        weekend: null, // Cerrado los fines de semana
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        displaySchedule: {
            en: "Monday - Friday: 7:00 AM - 6:00 PM",
            es: "Lunes a Viernes: 7:00 AM - 6:00 PM"
        }
    },

    // ============================================
    // REDES SOCIALES
    // ============================================
    social: {
        facebook: "https://www.facebook.com/abckidzpreschool",
        instagram: "https://www.instagram.com/abc_kidz_preschool/",
        tiktok: "https://www.tiktok.com/@abc.kidz.preschool",
        twitter: "@abckidstampa", // Si tienen Twitter/X
        youtube: null,
        linkedin: null,
    },

    // ============================================
    // SITIO WEB
    // ============================================
    site: {
        url: "https://www.abckidzpreschooldaycare.com",
        name: "ABC Kidz Preschool Daycare Tampa",
        locales: ["en", "es"] as const,
        defaultLocale: "en" as const,
    },

    // ============================================
    // IMÁGENES SEO
    // ============================================
    images: {
        ogImage: "/og-image.jpg",
        logo: "/logo.png",
        favicon: "/favicon.ico",
        gallery: [
            "/images/daycare-exterior.jpg",
            "/images/classroom.jpg",
        ],
        ogImageDimensions: {
            width: 1200,
            height: 630,
        },
    },

    // ============================================
    // REVIEWS Y CALIFICACIONES
    // ============================================
    ratings: {
        google: {
            rating: 4.4,
            reviewCount: 28,
            bestRating: 5,
        },
    },

    // ============================================
    // ÁREAS DE SERVICIO
    // ============================================
    serviceAreas: [
        { name: "Tampa", type: "City", wiki: "https://en.wikipedia.org/wiki/Tampa,_Florida" },
        { name: "Brandon", type: "City" },
        { name: "Hillsborough County", type: "AdministrativeArea" },
        { name: "Temple Terrace", type: "City" },
        { name: "Carrollwood", type: "Neighborhood" },
    ],

    // ============================================
    // PROGRAMAS/SERVICIOS
    // ============================================
    programs: [
        {
            name: "Infant Daycare Program",
            description: "Nurturing care for babies 6 weeks to 12 months old. Personalized attention, safe environment, and developmental activities.",
            ageRange: { min: 0, max: 12, unit: "months" },
        },
        {
            name: "Toddler Program",
            description: "Engaging learning program for toddlers 1-2 years. Focus on language development, motor skills, and social interaction.",
            ageRange: { min: 1, max: 2, unit: "years" },
        },
        {
            name: "Pre-K Program",
            description: "Comprehensive preschool curriculum for children 3-4 years preparing them for kindergarten success.",
            ageRange: { min: 3, max: 4, unit: "years" },
        },
        {
            name: "VPK Program",
            description: "Florida's FREE Voluntary Prekindergarten program for 4-year-olds. State-approved curriculum and certified teachers.",
            ageRange: { min: 4, max: 5, unit: "years" },
        },
        {
            name: "After School Program",
            description: "Safe after-school care for school-age children with homework help, enrichment activities, and fun!",
            ageRange: { min: 5, max: 12, unit: "years" },
        },
    ],

    // ============================================
    // AMENIDADES/CARACTERÍSTICAS
    // ============================================
    amenities: [
        "Outdoor Playground",
        "Security Cameras",
        "Nutritious Meals Provided",
        "Air Conditioned Classrooms",
        "Secure Entry System",
    ],

    // ============================================
    // MÉTODOS DE PAGO
    // ============================================
    payment: {
        accepted: ["Cash", "Credit Card", "Check"],
        currency: "USD",
    },

    // ============================================
    // KEYWORDS SEO
    // ============================================
    keywords: {
        en: [
            "daycare Tampa",
            "daycare Tampa FL",
            "preschool Tampa",
            "childcare Tampa",
            "infant daycare Tampa",
            "toddler daycare Tampa",
            "VPK Tampa",
            "VPK program Tampa FL",
            "Pre-K Tampa",
            "best daycare near me",
            "affordable daycare Tampa",
            "ABC Kidz Preschool",
            "childcare center Tampa",
            "early childhood education Tampa",
            "daycare Hillsborough County",
            "daycare Brandon FL",
            "preschool near me Tampa",
            "after school program Tampa",
        ],
        es: [
            "guardería Tampa",
            "daycare Tampa español",
            "cuidado infantil Tampa",
            "preescolar Tampa",
            "VPK Tampa",
            "VPK gratis Tampa",
            "Pre-K Tampa",
            "guardería hispana Tampa",
            "guardería cerca de mí Tampa",
            "guardería económica Tampa",
            "educación temprana Tampa",
        ],
    },

    // ============================================
    // VERIFICACIONES (Search Console, etc.)
    // ============================================
    verification: {
        google: null, // Agregar código real de Google Search Console aquí
        bing: null,
        yandex: null,
    },
};

// Tipos TypeScript para autocompletado
export type SEOConfig = typeof seoConfig;
export type Locale = typeof seoConfig.site.locales[number];