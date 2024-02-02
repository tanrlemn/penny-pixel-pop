'use client';

// images
const images = [
  'https://i.imgur.com/jZ6hSsX.jpg',
  'https://i.imgur.com/JBc75w5.jpg',
  'https://i.imgur.com/mhsvRaa.jpg',
  'https://i.imgur.com/YuikxYK.jpg',
  'https://i.imgur.com/cziSbtZ.jpg',
  'https://i.imgur.com/uY5jq3I.jpg',
  'https://i.imgur.com/4KQQFag.jpg',
  'https://i.imgur.com/uGWFxs0.jpg',
];

// chakra-ui
import { Box } from '@chakra-ui/react';

const randomIndex = Math.floor(Math.random() * images.length);

export default function AuthSplashSection() {
  return (
    <Box
      flexGrow={1}
      background={'var(--lightBlue)'}
      minH={'100vh'}
      backgroundImage={`url(${images[randomIndex !== null ? randomIndex : 0]})`}
      backgroundPosition={'center'}
      backgroundSize={'cover'}
      backgroundRepeat={'no-repeat'}
    />
  );
}
