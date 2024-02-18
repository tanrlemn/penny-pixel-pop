'use client';

// images
import circleLogo from '@/app/_assets/dark-circle.svg';

// chakra-ui
import { Box, Image } from '@chakra-ui/react';

export default function Logo({ size = '2rem', logo = 'pill' }) {
  const logos = {
    pill: {
      src: circleLogo.src,
    },
  };
  return (
    <Box
      w={size}
      h={'auto'}>
      <Image
        alt={'Penny Pixel Pop logo'}
        src={logos[logo].src}
      />
    </Box>
  );
}
