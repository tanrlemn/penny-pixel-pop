import { cookies } from 'next/headers';
import { NextResponse,NextRequest } from 'next/server';
import { createClient } from '@/app/_lib/utils/supabase/server';

export async function POST(request: NextRequest) {
  const cookieStore = cookies();

  const supabase = createClient(cookieStore);

  await supabase.auth.signOut();

  return NextResponse.redirect('/auth/login');
}
