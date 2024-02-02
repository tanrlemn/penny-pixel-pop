'use client';

// hooks
import { useIsMobile } from '@/app/_lib/hooks/useIsMobile';

// chakra-ui
import { Flex, Heading, Link } from '@chakra-ui/react';

// local components
import Logo from './logo';

export default function LinkedLogo({
  link = '/',
  logo = 'pill',
  text = false,
  color = 'purple.500',
}) {
  const isMobile = useIsMobile();
  const widths = {
    pill: isMobile ? '3rem' : '3rem',
  };

  return (
    <Link href={link}>
      <Flex
        align={'center'}
        gap={'0.5rem'}>
        <Logo
          logo={logo}
          size={widths[logo]}
        />
        {text && (
          <Heading
            size={'md'}
            color={color}>
            Penny Pixel Pop
          </Heading>
        )}
      </Flex>
    </Link>
  );
}
