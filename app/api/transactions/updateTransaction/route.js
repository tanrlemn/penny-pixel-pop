import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from '../../../_lib/utils/supabase/server';

export async function POST(request) {
  const cookieStore = cookies();

  const supabase = createClient(cookieStore);

  const req = await request.json();
  const { id, envelope_id, amount, note, date } = req;

  console.log(req);

  const { data, error } = await supabase
    .from('transactions')
    .upsert([{ id, envelope_id, amount, note, date }])
    .select();

  if (error) {
    console.log(error);
  }

  return NextResponse.json({ data });
}
