'use client';

// chakra-ui
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';

// local components
import MenuDrawer from './menuDrawer';
import LinkedLogo from '../_components/branding/linkedLogo';

export default function Navbar() {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      bg={bgColor}
      borderBottom={'1px solid'}
      borderBottomColor={borderColor}
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
        <LinkedLogo text />
        <MenuDrawer />
      </Flex>
    </Box>
  );
}
