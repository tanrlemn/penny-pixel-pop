'use client';

// hooks
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page({ params }) {
  const slug = params.slug;

  const router = useRouter();

  useEffect(() => {
    switch (slug) {
      case 'sign-in':
        router.replace('/auth/login?view=sign_in');
        break;
      case 'sign-up':
        router.replace('/auth/login?view=sign_up');
        break;
      case 'forgot-password':
        router.replace('/auth/login?view=forgot_password');
        break;
      default:
        router.replace('/auth/login');
        break;
    }
  }, [router, slug]);

  return null;
}
