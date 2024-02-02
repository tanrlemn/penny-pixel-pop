'use client';

// Next.js hooks
import { usePathname, useRouter } from 'next/navigation';

// Recoil
import { useRecoilValue } from 'recoil';
import { userState, profileState } from '@/app/_state/atoms';
import { useAuth } from '@/app/_lib/hooks/useAuth';

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
  Link,
} from '@chakra-ui/react';

// Icons
import { LogOut, MoreHorizontal, Settings } from 'lucide-react';

// Local components
import MenuDrawer from './menuDrawer';
import MenuTabs from './menuTabs';
import LinkedLogo from '../_components/branding/linkedLogo';
import Logo from '../_components/branding/logo';

export default function Navbar() {
  useAuth();

  const pathname = usePathname();
  const user = useRecoilValue(userState);
  const profile = useRecoilValue(profileState);
  const loggedIn = !!user;
  const router = useRouter();
  const supabase = createClient();

  const isMaintenance = pathname === '/maintenance';
  const isAuth = pathname.includes('/auth');

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
      position={isAuth ? 'absolute' : 'sticky'}
      top={'0'}>
      <Flex
        p={{ base: '1rem', md: '1rem 3rem' }}
        display={isAuth ? 'none' : 'flex'}
        w={'100%'}
        align={'center'}
        justify={{ base: 'space-between' }}>
        {isMaintenance ? (
          <MaintenanceLayout />
        ) : isAuth ? (
          <></>
        ) : loggedIn ? (
          <LoggedInLayout
            profile={profile}
            signOut={signOut}
          />
        ) : (
          <LoggedOutLayout />
        )}
      </Flex>
      {!isMaintenance && !isAuth && <MenuTabs />}
    </Box>
  );
}

function LoggedInLayout({ profile, signOut }) {
  return (
    <>
      <Flex
        align={'center'}
        gap={'0.5rem'}>
        <Logo />
        <Box>
          <Heading
            mb={0}
            lineHeight={1.2}
            size={'xs'}
            fontWeight={500}
            color={'purple.600'}>
            {profile?.full_name}
          </Heading>
          <Text
            lineHeight={1}
            fontSize={'0.7rem'}>
            {profile?.email}
          </Text>
        </Box>
      </Flex>
      <UserMenu signOut={signOut} />
    </>
  );
}

function LoggedOutLayout() {
  return (
    <>
      <LinkedLogo />
      <MenuDrawer />
    </>
  );
}

function MaintenanceLayout() {
  return (
    <>
      <Flex
        gap={{ base: '1rem' }}
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'flex-start', md: 'center' }}>
        <LinkedLogo />
        <Heading
          size={'md'}
          color={'purple.600'}>
          We inspire collaboration
        </Heading>
      </Flex>
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
          borderColor={'gray.600'}>
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
        <MenuItem
          w={'100%'}
          color={'red.500'}
          py={'1rem'}
          onClick={signOut}>
          <Flex
            w={'100%'}
            gap={'0.5rem'}
            justify={'space-between'}
            align={'center'}>
            Log out
            <LogOut size={15} />
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
