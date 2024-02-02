'use client';

// hooks
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';

// chakra-ui
import { Box } from '@chakra-ui/react';

export default function Home() {
  const router = useRouter();
  const code = useQueryState('code');

  useEffect(() => {
    if (code && code !== 'undefined' && code !== null) {
      router.push(`/envelopes`);
    }
  }, [code, router]);

  return <Box></Box>;
}
