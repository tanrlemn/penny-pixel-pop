import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from '@/app/_lib/utils/supabase/server';

export async function POST(request) {
  const cookieStore = cookies();

  const supabase = createClient(cookieStore);

  const req = await request.json();
  const { envelopeId, envelope_name, category, budget_amount } = req;

  const { data, error } = await supabase
    .from('envelopes')
    .upsert([{ id: envelopeId, envelope_name, category, budget_amount }])
    .select();

  if (error) {
    console.error(error);
  }

  return NextResponse.json({ data });
}
