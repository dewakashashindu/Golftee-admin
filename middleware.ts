import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get auth token from cookies or localStorage (we'll use cookies)
  const token = request.cookies.get('adminToken')?.value;
  
  // Public routes that don't require authentication
  const publicRoutes = ['/splash', '/login', '/signup', '/forgot-password', '/reset-password'];
  
  // Protected routes that require authentication
  const protectedRoutes = [
    '/home',
    '/bookings',
    '/equipment-bookings',
    '/analytics',
    '/equipment',
    '/events',
    '/support',
    '/notifications',
    '/edit-information'
  ];
  
  // If user is on a public route
  if (publicRoutes.includes(pathname)) {
    // If they have a token, redirect to dashboard
    if (token) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
    // Otherwise allow access to public routes
    return NextResponse.next();
  }
  
  // If user is trying to access a protected route
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // If token exists, allow access
    return NextResponse.next();
  }
  
  // For root path, redirect appropriately
  if (pathname === '/') {
    if (token) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
    return NextResponse.redirect(new URL('/splash', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
