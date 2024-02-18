'use client';

// images
const images = [
  'https://i.imgur.com/jZ6hSsXh.jpg',
  'https://i.imgur.com/JBc75w5h.jpg',
  'https://i.imgur.com/mhsvRaah.jpg',
  'https://i.imgur.com/YuikxYKh.jpg',
  'https://i.imgur.com/cziSbtZh.jpg',
  'https://i.imgur.com/uY5jq3Ih.jpg',
  'https://i.imgur.com/4KQQFagh.jpg',
  'https://i.imgur.com/uGWFxs0h.jpg',
];

// chakra-ui
import { Box } from '@chakra-ui/react';

const randomIndex = Math.floor(Math.random() * images.length);

export default function AuthSplashSection() {
  return (
    <Box
      background={'var(--lightBlue)'}
      h={{ base: '40vh', md: '93vh' }}
      mb={{ base: '2rem', md: 0 }}
      w={'100%'}
      backgroundImage={`url(${images[randomIndex !== null ? randomIndex : 0]})`}
      backgroundPosition={'center'}
      backgroundSize={'cover'}
      backgroundRepeat={'no-repeat'}
    />
  );
}
