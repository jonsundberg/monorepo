import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const user = request.cookies.get('user');

  // Tillåt åtkomst till login-sidan även om användaren inte är inloggad
  if (request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.next();
  }

  // Omdirigera till login om användaren inte är inloggad och försöker nå en skyddad route
  if (!user && !request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Om användaren är inloggad och försöker nå login-sidan, omdirigera till dashboard
  if (user && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
