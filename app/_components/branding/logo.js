'use client';

// images
import pillLogo from '@/app/_assets/logo-light-pill.png';
import pillTextLogo from '@/app/_assets/light-text-pill.svg';

// chakra-ui
import { Box, Image } from '@chakra-ui/react';

export default function Logo({ size = '5rem', logo = 'pill' }) {
  const logos = {
    pill: {
      src: pillLogo.src,
    },
    'pill-text': {
      src: pillTextLogo.src,
    },
  };
  return (
    <Box
      w={size}
      h={'auto'}>
      <Image
        alt={'Thought Soda logo'}
        src={logos[logo].src}
      />
    </Box>
  );
}
