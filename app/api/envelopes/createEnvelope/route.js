import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from '../../../_lib/utils/supabase/server';

export async function POST(request) {
  const cookieStore = cookies();

  const supabase = createClient(cookieStore);

  const req = await request.json();
  const { envelope_name, category, budget_amount } = req;

  const { data, error } = await supabase
    .from('envelopes')
    .insert([{ envelope_name, category, budget_amount }])
    .select();

  if (error) {
    console.log(error);
  }

  return NextResponse.json({ data });
}
