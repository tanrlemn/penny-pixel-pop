import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from '@/app/_lib/utils/supabase/server';

export async function GET() {
  const cookieStore = cookies();

  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from('envelopes').select('*');

  if (error) {
    console.error(error);
  }

  return NextResponse.json({ data });
}
