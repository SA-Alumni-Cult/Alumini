import { NextResponse,NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const sub = host.split('.')[0];

  // If 'admin' subdomain, rewrite to admin dashboard route
  if (sub === 'admin') {
    const url = request.nextUrl.clone();
    console.log(`Admin subdomain detected: ${url.pathname}`);
    url.pathname = `/adminDashboard`;
    console.log(`Rewriting request to: ${url.pathname}`);
    return NextResponse.rewrite(url);
  }

  // Block access to admin path from any other subdomain/domain
  if (request.nextUrl.pathname.startsWith('/adminDashboard')) {
    return new NextResponse('Not authorized', { status: 403 });
  }

  // Allow normal access for other paths
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
     * - .well-known (well-known files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|\\.well-known).*)',
  ],
};
