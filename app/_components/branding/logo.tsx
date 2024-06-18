'use client';

// images
import circleLogo from '@/app/_assets/logo-main.svg';

// chakra-ui
import { Box, Image } from '@chakra-ui/react';

export default function Logo({ size = '1.5rem' }) {
  return (
    <Box w={size} h={'auto'}>
      <Image alt={'Penny Pixel Pop logo'} src={circleLogo.src} />
    </Box>
  );
}
