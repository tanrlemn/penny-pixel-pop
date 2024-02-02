import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from '@/app/_lib/utils/supabase/server';

export async function POST(request) {
  const cookieStore = cookies();

  const supabase = createClient(cookieStore);

  const req = await request.json();
  const { envelopeId, category } = req;

  const { data, error } = await supabase
    .from('envelopes')
    .update({ category })
    .eq('id', envelopeId)
    .select();

  if (error) {
    console.error(error);
  }

  return NextResponse.json({ data });
}
