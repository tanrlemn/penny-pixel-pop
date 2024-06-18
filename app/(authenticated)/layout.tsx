'use client';
// hooks
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/app/_lib/hooks/useAuth';

// recoil
import { useRecoilValue } from 'recoil';
import { userState } from '@/app/_state/atoms';
import { userProfileSelector } from '@/app/_state/selectors';

// supabase
import { createClient } from '@/app/_lib/utils/supabase/client';

// chakra-ui
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
import { Link } from '@chakra-ui/next-js';

// lucide icons
import { CircleUser, LogOut, MoreHorizontal, Settings } from 'lucide-react';

// local components
import MenuTabs from '@/app/_navigation/menuTabs';
import Logo from '@/app/_components/branding/logo';
import EnvelopeDrawer from '@/app/_components/forms/envelopeDrawer';
import TransactionDrawer from '@/app/_components/forms/transactionDrawer';
import SheetDrawer from '@/app/_components/forms/sheetDrawer';

export default function AuthenticatedLayout({ children }) {
  const { loading } = useAuth();

  const pathname = usePathname();
  const user = useRecoilValue(userState);
  const profile = useRecoilValue(userProfileSelector);
  const loggedIn = !!user;
  const router = useRouter();
  const supabase = createClient();

  const isUserPage =
    pathname.includes('/envelopes') ||
    pathname.includes('/settings') ||
    pathname.includes('/sheets') ||
    pathname.includes('/transactions');

  useEffect(() => {
    if (!loading && !loggedIn && isUserPage) {
      console.log('redirecting to login');
      router.replace(
        '/auth/login?message=You must be logged in to view that page'
      );
    }
  }, [loading, user, loggedIn, router, isUserPage, pathname]);

  const signOut = async () => {
    await supabase.auth.signOut({ scope: 'local' });
    router.replace('/auth/login');
  };
  return (
    <>
      <Box
        bg={'white'}
        borderBottom={'1px solid'}
        borderBottomColor={'gray.200'}
        zIndex={1000}
        position={'relative'}
        top={'0'}
      >
        <Flex
          p={{ base: '0.5rem', md: '0.5rem 2rem' }}
          display={'flex'}
          w={'100%'}
          align={'center'}
          justify={{ base: 'space-between' }}
        >
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
        </Flex>
      </Box>
      {children}
      <SheetDrawer />
      <EnvelopeDrawer />
      <TransactionDrawer />
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
      <MenuList fontSize={'0.85rem'} zIndex={10000}>
        <MenuItem
          py={'1rem'}
          borderBottom={'1px solid'}
          borderBottomColor={'gray.200'}
        >
          <Link
            href={'/account'}
            w={'100%'}
            _hover={{ textDecoration: 'none' }}
          >
            <Flex align={'center'} gap={'0.5rem'}>
              <CircleUser size={15} />
              Account
            </Flex>
          </Link>
        </MenuItem>
        <MenuItem w={'100%'} color={'red.500'} py={'1rem'} onClick={signOut}>
          <Flex w={'100%'} gap={'0.5rem'} align={'center'}>
            <LogOut size={15} />
            Log out
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
