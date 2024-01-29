'use client';

// hooks
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/_lib/hooks/useUser';

// chakra-ui
import { Box, Button } from '@chakra-ui/react';
import { LogOut } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();

  const { userData } = useUser();

  useEffect(() => {
    if (!userData) {
      router.push('/auth/login');
    }
    console.log('userData', userData);
  }, [userData, router]);

  const handleSignOut = async () => {
    const response = await fetch('/api/auth/signout', {
      method: 'POST',
    });

    const { error } = await response.json();

    if (error) {
      console.log(error);
    } else {
      router.push('/auth/login');
    }
  };

  return <Box>x</Box>;
}
