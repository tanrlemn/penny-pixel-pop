import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from '@/app/_lib/utils/supabase/server';

export async function GET(request, { params }) {
  const id = params.id;

  const cookieStore = cookies();

  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from('envelopes')
    .select('*')
    .eq('id', id);

  if (error) {
    console.log(error);
  }

  return NextResponse.json({ data });
}
