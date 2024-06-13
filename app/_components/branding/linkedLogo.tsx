'use client';

// hooks
import { useIsMobile } from '@/app/_lib/hooks/useIsMobile';

// chakra-ui
import { Flex, Heading, Link } from '@chakra-ui/react';

// local components
import Logo from './logo';

export default function LinkedLogo({
  link = '/',
  text = false,
  color = 'purple.500',
}) {
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
