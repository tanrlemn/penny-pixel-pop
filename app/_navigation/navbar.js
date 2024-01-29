'use client';

// hooks
import { usePathname } from 'next/navigation';

// chakra-ui
import { Flex, Box, Heading } from '@chakra-ui/react';

// local components
import MenuDrawer from './menuDrawer';
import LinkedLogo from '../_components/branding/linkedLogo';

export default function Navbar() {
  const pathname = usePathname();
  const isMantenance = pathname === '/maintenance';
  const isAuth = pathname.includes('/auth');

  return (
    <Box
      bg={'transparent'}
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
        ) : (
          <>
            <LinkedLogo />
            <MenuDrawer />
          </>
        )}
      </Flex>
    </Box>
  );
}
