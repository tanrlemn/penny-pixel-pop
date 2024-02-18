import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { type CookieOptions, createServerClient } from '@supabase/ssr';

const MODE = process.env.NEXT_PUBLIC_MODE;

export async function GET(request: Request) {
  const { searchParams, origin, port } = new URL(request.url);

  const removePort = port !== '' ? origin.replace(`:${port}`, '') : origin;

  const callbackUrl = MODE === 'production' ? removePort : origin;

  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/envelopes';

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options });
          },
        },
      }
    );
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${callbackUrl}${next}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${callbackUrl}/auth/login?error=oauth_error`);
}
