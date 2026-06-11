import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LOCALES = ['en', 'fr', 'es'];
const DEFAULT_LOCALE = 'en';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip check for paths starting with locale
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Detect language preference
  let lang = DEFAULT_LOCALE;
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferred = acceptLanguage.split(',')[0].toLowerCase();
    if (preferred.startsWith('fr')) {
      lang = 'fr';
    } else if (preferred.startsWith('es')) {
      lang = 'es';
    }
  }

  // Redirect
  const url = request.nextUrl.clone();
  url.pathname = `/${lang}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - logo.jpg (logo)
     * - sitemap.xml
     * - robots.txt
     */
    '/((?!api|_next/static|_next/image|favicon.ico|logo.jpg|sitemap.xml|robots.txt).*)',
  ],
};
