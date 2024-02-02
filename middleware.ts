import { NextResponse, NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const code = searchParams.get('code');

  if (process.env.MAINTENANCE_MODE === 'true') {
    return NextResponse.redirect(new URL('/maintenance', request.url));
  }

  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value ?? '';
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set(name, value, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            path: '/',
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set(name, '', { ...options, maxAge: -1 });
        },
      },
    }
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    if (pathname.startsWith('/auth') || code) {
      return NextResponse.redirect(new URL('/envelopes', request.url));
    }
    return NextResponse.next();
  } else if (!user && !pathname.includes('/auth/login') && !code) {
    console.log('Redirecting to login due to unauthenticated access attempt.');
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|maintenance|_next/static|_next/image|favicon.ico).*)'],
};
