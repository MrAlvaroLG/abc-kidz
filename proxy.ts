import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  // Redirigir dominio viejo → nuevo preservando la ruta (308 permanente)
  const host = request.headers.get('host') || '';
  if (host === 'www.abckidzpreschool.com' || host === 'abckidzpreschool.com') {
    const newUrl = new URL(request.url);
    newUrl.host = 'www.abckidzpreschooldaycare.com';
    return NextResponse.redirect(newUrl, 308);
  }

  // Forzar www: redirigir non-www → www con 308 (permanente)
  if (host === 'abckidzpreschooldaycare.com') {
    const wwwUrl = new URL(request.url);
    wwwUrl.host = 'www.abckidzpreschooldaycare.com';
    return NextResponse.redirect(wwwUrl, 308);
  }

  const redirects: Record<string, string> = {
    '/vpk': '/en/programs/vpk',
    '/pre-k': '/en/programs/prek',
    '/infants': '/en/programs/infants',
    '/toddlers': '/en/programs/toddlers',
    '/school-age': '/en/programs/after-school',

    '/gallery': '/en/about',
    '/nutrition': '/en/programs',

    '/website/social/instagram': 'https://www.instagram.com/abckidzpreschool',
    '/website/social/facebook': 'https://www.facebook.com/abckidzpreschool',
  };

  if (redirects[pathname]) {
    const destination = redirects[pathname];
    if (destination.startsWith('http')) {
      return NextResponse.redirect(destination, 301);
    }
    url.pathname = destination;
    return NextResponse.redirect(url, 301);
  }

  // Excluir /studio del middleware de next-intl
  if (pathname.startsWith('/studio')) {
    return NextResponse.next();
  }

  const unwantedParams = ['ref', 'utm_source', 'utm_medium', 'utm_campaign'];
  const hasUnwantedParams = unwantedParams.some(param =>
    request.nextUrl.searchParams.has(param)
  );
  if (hasUnwantedParams) {
    unwantedParams.forEach(param => {
      url.searchParams.delete(param);
    });

    return NextResponse.redirect(url, 301);
  }

  const response = intlMiddleware(request);

  if (pathname.startsWith('/studio') || pathname.startsWith('/api')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*|api).*)',
  ],
};
