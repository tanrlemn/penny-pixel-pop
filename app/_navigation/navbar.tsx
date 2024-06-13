'use client';

// chakra-ui
import { Box, Flex } from '@chakra-ui/react';

// local components
import MenuDrawer from './menuDrawer';
import LinkedLogo from '../_components/branding/linkedLogo';

export default function Navbar() {
  return (
    <Box
      bg={'white'}
      borderBottom={'1px solid'}
      borderBottomColor={'gray.200'}
      zIndex={1000}
      position={'sticky'}
      top={'0'}
    >
      <Flex
        p={{ base: '0.5rem', md: '0.5rem 2rem' }}
        display={'flex'}
        w={'100%'}
        align={'center'}
        justify={{ base: 'space-between' }}
      >
        <LinkedLogo text={true} />
        <MenuDrawer />
      </Flex>
    </Box>
  );
}
