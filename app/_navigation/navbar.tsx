'use client';

// hooks
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/app/_lib/hooks/useAuth';

// Recoil
import { useRecoilValue } from 'recoil';
import { userState, profileState } from '@/app/_state/atoms';

// Supabase
import { createClient } from '@/app/_lib/utils/supabase/client';

// Chakra-UI components
import {
  Flex,
  Box,
  Heading,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

// Icons
import { LogOut, MoreHorizontal } from 'lucide-react';

// Local components
import MenuDrawer from './menuDrawer';
import MenuTabs from './menuTabs';
import LinkedLogo from '../_components/branding/linkedLogo';
import Logo from '../_components/branding/logo';

export default function Navbar() {
  const { loading } = useAuth();

  const pathname = usePathname();
  const user = useRecoilValue(userState);
  const profile = useRecoilValue(profileState);
  const loggedIn = !!user;
  const router = useRouter();
  const supabase = createClient();

  const isAuth = pathname.includes('/auth');
  const isUserPage =
    pathname.includes('/envelopes') ||
    pathname.includes('/settings') ||
    pathname.includes('/dashboard') ||
    pathname.includes('/transactions');

  useEffect(() => {
    if (!loading && !loggedIn && !isAuth && isUserPage) {
      console.log('redirecting to login');
      router.replace(
        '/auth/login?message=You must be logged in to view that page'
      );
    } else if (!loading && loggedIn && isAuth && !isUserPage) {
      console.log('redirecting to dashboard');
      router.replace('/envelopes');
    }
  }, [loading, user, loggedIn, router, isAuth, isUserPage, pathname]);

  const signOut = async () => {
    await supabase.auth.signOut({ scope: 'local' });
    router.replace('/auth/login');
  };

  return (
    <Box
      bg={'white'}
      borderBottom={'1px solid'}
      borderBottomColor={'gray.200'}
      zIndex={1000}
      position={loggedIn ? 'relative' : 'sticky'}
      top={'0'}
    >
      <Flex
        p={{ base: '0.5rem', md: '0.5rem 2rem' }}
        display={'flex'}
        w={'100%'}
        align={'center'}
        justify={{ base: 'space-between' }}
      >
        {loggedIn ? (
          <LoggedInLayout profile={profile} signOut={signOut} />
        ) : (
          <LoggedOutLayout />
        )}
      </Flex>
    </Box>
  );
}

function LoggedInLayout({ profile, signOut }) {
  return (
    <>
      <Flex align={'center'} gap={'0.5rem'}>
        <Logo />
        <Box>
          <Heading
            mb={0}
            lineHeight={1.2}
            size={'xs'}
            fontWeight={500}
            color={'orange.600'}
          >
            {profile?.full_name}
          </Heading>
          <Text lineHeight={1} fontSize={'0.7rem'}>
            {profile?.email}
          </Text>
        </Box>
      </Flex>
      <UserMenu signOut={signOut} />
      <MenuTabs />
    </>
  );
}

function LoggedOutLayout() {
  return (
    <>
      <LinkedLogo text={true} />
      <MenuDrawer />
    </>
  );
}

function UserMenu({ signOut }) {
  return (
    <Menu>
      <MenuButton>
        <Box
          borderRadius={'100px'}
          border={'1px solid'}
          p={'0.15rem'}
          color={'gray.600'}
          borderColor={'gray.600'}
        >
          <MoreHorizontal size={15} />
        </Box>
      </MenuButton>
      <MenuList fontSize={'0.85rem'}>
        {/* <MenuItem
          py={'1rem'}
          borderBottom={'1px solid'}
          borderBottomColor={'gray.200'}>
          <Link
            href={'/settings'}
            w={'100%'}>
            <Flex
              justify={'space-between'}
              align={'center'}>
              Settings
              <Settings size={15} />
            </Flex>
          </Link>
        </MenuItem> */}
        <MenuItem w={'100%'} color={'red.500'} py={'1rem'} onClick={signOut}>
          <Flex
            w={'100%'}
            gap={'0.5rem'}
            justify={'space-between'}
            align={'center'}
          >
            Log out
            <LogOut size={15} />
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
