import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from '../../../_lib/utils/supabase/server';

export async function POST(request) {
  const cookieStore = cookies();

  const supabase = createClient(cookieStore);

  const req = await request.json();
  const { envelopeId } = req;

  const { error } = await supabase
    .from('envelopes')
    .delete()
    .eq('id', envelopeId);

  if (error) {
    console.error(error);
  }

  return NextResponse.json({ error });
}
