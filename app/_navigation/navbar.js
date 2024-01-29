'use client';

// hooks
import { usePathname } from 'next/navigation';
import { useProfile, useUser } from '../_lib/hooks/useUser';

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
  Link,
} from '@chakra-ui/react';

// lucide
import { LogOut, MoreHorizontal, Settings } from 'lucide-react';

// local components
import MenuDrawer from './menuDrawer';
import MenuTabs from './menuTabs';
import LinkedLogo from '../_components/branding/linkedLogo';
import Logo from '../_components/branding/logo';

export default function Navbar() {
  const pathname = usePathname();
  const { profile } = useProfile();
  const { signOut } = useUser();
  const loggedIn = profile !== null;

  const isMantenance = pathname === '/maintenance';
  const isAuth = pathname.includes('/auth');
  const isHome = pathname === '/';

  return (
    <Box
      bg={'white'}
      borderBottom={'1px solid'}
      borderBottomColor={'gray.200'}
      zIndex={1000}
      position={isAuth ? 'absolute' : 'sticky'}
      top={'0'}>
      <Flex
        p={{ base: '1rem', md: '2rem 3rem' }}
        w={'100%'}
        align={'center'}
        justify={{ base: 'space-between' }}>
        {isMantenance ? (
          <>
            <Flex
              gap={{ base: '1rem' }}
              direction={{ base: 'column', md: 'row' }}
              align={{ base: 'flex-start', md: 'center' }}>
              <LinkedLogo logo={'pill-text'} />
              <Heading
                size={'md'}
                color={'purple.600'}>
                We inspire collaboration
              </Heading>
            </Flex>
          </>
        ) : isAuth ? (
          <></>
        ) : loggedIn ? (
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
                  {profile.full_name}
                </Heading>
                <Text
                  lineHeight={1}
                  fontSize={'0.7rem'}>
                  {profile.email}
                </Text>
              </Box>
            </Flex>
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
                <MenuItem
                  pb={'1rem'}
                  borderBottom={'1px solid'}
                  borderBottomColor={'gray.200'}>
                  <Link
                    href={'/settings'}
                    w={'100%'}>
                    <Flex
                      w={'100%'}
                      justify={'space-between'}
                      align={'center'}>
                      Settings
                      <Settings size={15} />
                    </Flex>
                  </Link>
                </MenuItem>
                <MenuItem
                  color={'red.500'}
                  pt={'1rem'}
                  onClick={signOut}>
                  <Flex
                    w={'100%'}
                    justify={'space-between'}
                    align={'center'}>
                    Log out
                    <LogOut size={15} />
                  </Flex>
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <>
            <LinkedLogo />
            <MenuDrawer />
          </>
        )}
      </Flex>
      {!isMantenance && !isAuth && !isHome && <MenuTabs />}
    </Box>
  );
}
