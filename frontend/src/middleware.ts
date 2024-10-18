import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'cookie';
import { cookies } from 'next/headers';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access');

  if (accessToken && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }``


  if (!accessToken && (request.nextUrl.pathname === '/charts' || request.nextUrl.pathname === '/analysis')) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (accessToken && (request.nextUrl.pathname.includes('dashboard'))) {
    const cookies = parse(request.headers.get('cookie') || '');

    console.log("cookies", cookies.user);
    console.log(cookies.user); 
    // const accessToken = cookies.access; // Retrieve access token from cookies
    const user = cookies.user ? JSON.parse(cookies.user) : null; // Parse user data from cookies
     // Check subscription status
     if (user?.subscription_status === 'inactive') {
      // Redirect to pricing page if the account is inactive
      return NextResponse.redirect(new URL('/pricing', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/dashboard/charts', '/dashboard/analysis'],
};
