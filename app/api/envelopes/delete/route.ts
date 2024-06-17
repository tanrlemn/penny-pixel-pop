import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@/app/_lib/utils/supabase/server';

export async function POST(request: NextRequest) {
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
    return NextResponse.error();
  }

  return NextResponse.json({ error });
}
