import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from '../../../_lib/utils/supabase/server';

export async function POST(request) {
  const cookieStore = cookies();

  const supabase = createClient(cookieStore);

  const req = await request.json();
  const { id } = req;

  const { error } = await supabase.from('envelopes').delete().eq('id', id);

  if (error) {
    console.log(error);
  }

  return NextResponse.json({ error });
}
