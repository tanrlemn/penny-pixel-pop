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

// hooks
import { useEffect, useState } from 'react';

// chakra-ui
import { Box } from '@chakra-ui/react';

export default function AuthSplashSection() {
  const [randomIndex, setRandomIndex] = useState(null);

  useEffect(() => {
    const random = Math.floor(Math.random() * images.length);
    setRandomIndex(random);
  }, []);

  return (
    <>
      {randomIndex && (
        <Box
          background={'var(--lightBlue)'}
          h={{ base: '40vh', md: '93vh' }}
          mb={{ base: '2rem', md: 0 }}
          w={'100%'}
          backgroundImage={`url(${images[randomIndex]})`}
          backgroundPosition={'center'}
          backgroundSize={'cover'}
          backgroundRepeat={'no-repeat'}
        />
      )}
    </>
  );
}
