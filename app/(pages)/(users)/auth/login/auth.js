'use client';

// supabase
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@/app/_lib/utils/supabase/client';

// Recoil
import { userState } from '@/app/_state/atoms';
import { useRecoilValue } from 'recoil';

// hooks
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// chakra-ui
import { Box, Heading, Text, Flex, Link } from '@chakra-ui/react';

// local components
import AuthSplashSection from './splashSection';
import LinkedLogo from '@/app/_components/branding/linkedLogo';

export default function AuthUI() {
  const router = useRouter();

  const user = useRecoilValue(userState);
  const loggedIn = !!user;

  const supabase = createClient();

  useEffect(() => {
    if (loggedIn) {
      router.push('/envelopes');
    }
  }, [router, loggedIn]);

  return (
    <>
      <Flex
        w={'100vw'}
        justify={'space-between'}
        align={'center'}>
        <AuthSplashSection />
        <Box
          borderRight={'1px solid var(--midLightBlueAlt)'}
          background={'var(--lightestBlue)'}
          p={{ base: '1rem', md: '3rem' }}
          h={'100vh'}
          minW={{ base: '100%', md: '400px' }}
          w={{ base: '100%', md: '450px' }}>
          <Box
            mb={'5rem'}
            mt={'5rem'}>
            <LinkedLogo />
          </Box>
          <Heading
            size={'lg'}
            mb={'0.5rem'}>
            Welcome back!
          </Heading>
          <Text>Sign in to your account to continue.</Text>
          <Box
            w={'100%'}
            mb={'2rem'}>
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
              }}
              providers={['google']}
              showLinks={false}
              onlyThirdPartyProviders
            />
          </Box>
          <Text
            textAlign={'center'}
            fontSize={'0.75rem'}>
            By continuing, you agree to Thought Soda&apos;s{' '}
            <Link
              textDecoration={'underline'}
              href={'/terms'}>
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              textDecoration={'underline'}
              href={'/privacy'}>
              Privacy Policy
            </Link>
            , and to receive periodic emails with updates.
          </Text>
        </Box>
      </Flex>
    </>
  );
}
