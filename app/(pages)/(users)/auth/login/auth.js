'use client';

// supabase
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@/app/_lib/utils/supabase/client';

// hooks
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/app/_lib/hooks/useUser';

// chakra-ui
import {
  Box,
  Heading,
  Text,
  Flex,
  Link,
  Button,
  Stack,
} from '@chakra-ui/react';

// local components
import AuthSplashSection from './splashSection';
import LinkedLogo from '../../../../_components/branding/linkedLogo';

const views = [
  {
    id: 'sign_in',
    title: 'Log in',
    description: 'Welcome back',
    link: '/auth/login',
  },
  {
    id: 'sign_up',
    title: 'Get started',
    description: 'Create a new account',
    link: '/auth/sign-up',
  },
  {
    id: 'forgotten_password',
    title: 'Reset your password',
    description:
      "Type in your email and we'll send you a link to reset your password",
    link: '/auth/forgot-password',
  },
];

export default function AuthUI() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const viewParam = searchParams.get('view');

  const supabase = createClient();
  const { userData } = useUser();

  const [view, setView] = useState(views[0]);

  const handleViewChange = (view) => {
    setView(view);
    window.history.replaceState(
      {
        ...window.history.state,
        as: view.link,
        url: view.link,
      },
      '',
      view.link
    );
  };

  useEffect(() => {
    if (viewParam !== null) {
      switch (viewParam) {
        case 'sign_in':
          handleViewChange(views[0]);
          break;
        case 'sign_up':
          handleViewChange(views[1]);
          break;
        case 'forgot_password':
          handleViewChange(views[2]);
          break;
        default:
          handleViewChange(views[0]);
          break;
      }
    }

    if (userData !== null) {
      router.push('/dashboard');
    }
  }, [router, userData, viewParam]);

  const ForgotPasswordLink = () => {
    return (
      <Button
        variant={'link'}
        fontSize={'0.8rem'}
        textDecor={'underline'}
        fontWeight={400}
        onClick={() => {
          handleViewChange(views[2]);
        }}>
        Forgot your password?
      </Button>
    );
  };

  const SignUpLink = () => {
    return (
      <Button
        variant={'link'}
        fontSize={'0.8rem'}
        textDecor={'underline'}
        fontWeight={400}
        onClick={() => {
          handleViewChange(views[1]);
        }}>
        Don&apos;t have an account? Sign up
      </Button>
    );
  };

  const SignInLink = () => {
    return (
      <Button
        variant={'link'}
        fontSize={'0.8rem'}
        textDecor={'underline'}
        fontWeight={400}
        onClick={() => {
          handleViewChange(views[0]);
        }}>
        Already have an account? Sign in
      </Button>
    );
  };

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
            <LinkedLogo logo='pill-text' />
          </Box>
          <Heading
            size={'lg'}
            mb={'0.5rem'}>
            {view.title}
          </Heading>
          <Text>{view.description}</Text>
          <Box
            w={'100%'}
            mb={'2rem'}>
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
              }}
              providers={['google']}
              // view={view.id}
              showLinks={false}
              onlyThirdPartyProviders
            />

            {/* <Stack
              textAlign={'center'}
              mt={'1rem'}>
              {view.id === 'sign_in' && (
                <>
                  <ForgotPasswordLink />
                  <SignUpLink />
                </>
              )}
              {view.id === 'sign_up' && <SignInLink />}
              {view.id === 'forgotten_password' && <SignInLink />}
            </Stack> */}
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
