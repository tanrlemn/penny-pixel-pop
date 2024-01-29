import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from '../../../_lib/utils/supabase/server';

export async function GET() {
  const cookieStore = cookies();

  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from('profiles').select('*');

  if (error) {
    console.log(error);
  }

  return NextResponse.json({ data });
}
