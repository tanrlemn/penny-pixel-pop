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
        router.push('/auth/login?view=sign_in');
        break;
      case 'sign-up':
        router.push('/auth/login?view=sign_up');
        break;
      case 'forgot-password':
        router.push('/auth/login?view=forgot_password');
        break;
      default:
        router.push('/auth/login');
        break;
    }
  }, [router, slug]);

  return null;
}
