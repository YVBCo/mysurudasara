import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('dasara_session');
  const path = request.nextUrl.pathname;

  // Protect Admin routes
  if (path.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    try {
      const parsed = JSON.parse(session.value);
      if (parsed.role !== 'ADMIN' && parsed.role !== 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/my-dasara', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Protect My Dasara
  if (path.startsWith('/my-dasara')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Protect Vendor routes
  if (path.startsWith('/vendor-dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    try {
      const parsed = JSON.parse(session.value);
      if (parsed.role !== 'VENDOR' && parsed.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/my-dasara', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Redirect authenticated users away from Login
  if (path === '/login') {
    if (session) {
      try {
        const parsed = JSON.parse(session.value);
        if (parsed.role === 'ADMIN') return NextResponse.redirect(new URL('/admin', request.url));
        if (parsed.role === 'VENDOR') return NextResponse.redirect(new URL('/vendor-dashboard', request.url));
        return NextResponse.redirect(new URL('/my-dasara', request.url));
      } catch {
        // invalid session
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/my-dasara/:path*', '/vendor-dashboard/:path*', '/login'],
};
