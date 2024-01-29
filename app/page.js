'use client';

// hooks
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { useUser } from './_lib/hooks/useUser';

// chakra-ui
import { Box } from '@chakra-ui/react';

export default function Home() {
  const router = useRouter();
  const [code, setCode] = useQueryState('code');

  const { userData } = useUser();

  useEffect(() => {
    const confirmAuth = async () => {
      userData && router.push('/dashboard');
    };

    confirmAuth();
  }, [code, router, userData]);

  return <Box></Box>;
}
