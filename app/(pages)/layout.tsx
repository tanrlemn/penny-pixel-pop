'use client';

// hooks
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/app/_lib/hooks/useAuth';

// recoil
import { useRecoilValue } from 'recoil';
import { userState } from '@/app/_state/atoms';

// local components
import Navbar from '../_navigation/navbar';

export default function PagesLayout({ children }) {
  const { loading } = useAuth();

  const pathname = usePathname();
  const user = useRecoilValue(userState);
  const loggedIn = !!user;
  const router = useRouter();

  const isAuth = pathname.includes('/auth');

  useEffect(() => {
    if (!loading && loggedIn && isAuth) {
      console.log('redirecting to sheets');
      router.replace('/sheets');
    }
  }, [loading, user, loggedIn, router, isAuth, pathname]);

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
