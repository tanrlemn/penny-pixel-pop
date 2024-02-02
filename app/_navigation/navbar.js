// supabase
import { createClient } from '@/app/_lib/utils/supabase/server';

// next
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// local components
import NavbarClient from './navbarClient';

export default async function Navbar() {
  const cookieStore = cookies();

  const supabase = createClient(cookieStore);

  const user = await supabase.auth.getUser();

  if (user) {
    return <NavbarClient />;
  } else {
    redirect('/auth/login');
  }
}
