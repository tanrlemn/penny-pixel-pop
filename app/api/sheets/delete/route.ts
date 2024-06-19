import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@/app/_lib/utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();

    const supabase = createClient(cookieStore);

    const req = await request.json();
    const { id } = req;

    const { error, data } = await supabase.from('sheets').delete().eq('id', id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Sheet delete error:', error);
    return NextResponse.error();
  }
}
