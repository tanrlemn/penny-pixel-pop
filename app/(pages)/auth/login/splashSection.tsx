'use client';

// hooks
import { useEffect, useState } from 'react';

// chakra-ui
import { Box } from '@chakra-ui/react';

export default function AuthSplashSection() {
  const [randomImage, setRandomImage] = useState(null);

  useEffect(() => {
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

    const random = Math.floor(Math.random() * images.length);
    !randomImage && setRandomImage(images[random]);
  }, [randomImage]);

  return (
    <>
      {randomImage && (
        <Box
          h={{ base: '40vh', md: '93vh' }}
          mb={{ base: '2rem', md: 0 }}
          w={'100%'}
          backgroundImage={`url(${randomImage})`}
          backgroundPosition={'center'}
          backgroundSize={'cover'}
          backgroundRepeat={'no-repeat'}
        />
      )}
    </>
  );
}
