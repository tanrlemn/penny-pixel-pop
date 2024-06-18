import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@/app/_lib/utils/supabase/server';

export async function POST(request: NextRequest) {
  const cookieStore = cookies();

  const supabase = createClient(cookieStore);

  const req = await request.json();
  const { id, envelope_id, amount, note, date, sheet_id } = req;

  const { data, error } = await supabase
    .from('transactions')
    .upsert([{ id: id, envelope_id, amount, note, date, sheet_id }])
    .select();

  if (error) {
    console.error(error);
    return NextResponse.error();
  }

  return NextResponse.json({ data });
}
