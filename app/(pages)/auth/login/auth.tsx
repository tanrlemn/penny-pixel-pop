'use client';

// supabase
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@/app/_lib/utils/supabase/client';

// hooks
import { useOrigin } from '@/app/_lib/hooks/window';
import { useAuth } from '@/app/_lib/hooks/auth';

// chakra-ui
import { Box, Heading, Text, Flex, Link } from '@chakra-ui/react';

// local components
import AuthSplashSection from './splashSection';
import LoadingDiv from '@/app/_components/interactive/loadingDiv';

export default function AuthUI() {
  const { callbackUrl } = useOrigin();
  const { loading } = useAuth();

  const supabase = createClient();

  return (
    <Flex
      minH={'93vh'}
      maxW={'100%'}
      direction={{ base: 'column', md: 'row' }}
      align={'center'}
    >
      <AuthSplashSection />
      <Box
        p={{ base: '1rem', md: '3rem' }}
        minW={{ base: '100%', md: '400px' }}
        w={{ base: '100%', md: '450px' }}
      >
        {loading ? (
          <LoadingDiv id={'auth loader'} isLoading={loading} />
        ) : (
          <>
            <Heading size={'lg'} mb={'0.5rem'}>
              Welcome back!
            </Heading>
            <Text>Sign in to your account to continue.</Text>
            <Box w={'100%'} mb={'2rem'}>
              <Auth
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                }}
                providers={['google']}
                showLinks={false}
                onlyThirdPartyProviders
                redirectTo={`${callbackUrl}/auth/callback`}
              />
            </Box>
            <Text textAlign={'center'} fontSize={'0.75rem'}>
              By continuing, you agree to Thought Soda&apos;s{' '}
              <Link textDecoration={'underline'} href={'/terms'}>
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link textDecoration={'underline'} href={'/privacy'}>
                Privacy Policy
              </Link>
              , and to receive periodic emails with updates.
            </Text>
          </>
        )}
      </Box>
    </Flex>
  );
}
