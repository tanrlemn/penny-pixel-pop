'use client';

// chakra-ui
import { Flex, Heading, Link, useColorModeValue } from '@chakra-ui/react';

// local components
import Logo from './logo';

export default function LinkedLogo({ link = '/', text = false }) {
  const color = useColorModeValue('orange.600', 'orange.100');
  return (
    <Link href={link}>
      <Flex align={'center'} gap={'0.5rem'}>
        <Logo />
        {text && (
          <Heading size={'md'} color={color}>
            Penny Pixel Pop
          </Heading>
        )}
      </Flex>
    </Link>
  );
}
