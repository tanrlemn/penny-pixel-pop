import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from '../../../_lib/utils/supabase/server';

export async function POST(request) {
  const cookieStore = cookies();

  const supabase = createClient(cookieStore);

  const req = await request.json();
  const { transactionId, envelope_id, amount, note, date } = req;

  const { data, error } = await supabase
    .from('transactions')
    .upsert([{ id: transactionId, envelope_id, amount, note, date }])
    .select();

  if (error) {
    console.error(error);
  }

  return NextResponse.json({ data });
}
