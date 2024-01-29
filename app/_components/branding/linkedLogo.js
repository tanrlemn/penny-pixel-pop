'use client';

// hooks
import { useIsMobile } from '@/app/_lib/hooks/useIsMobile';

// chakra-ui
import { Link } from '@chakra-ui/react';

// local components
import Logo from './logo';

export default function LinkedLogo({ link = '/', logo = 'pill' }) {
  const isMobile = useIsMobile();
  const widths = {
    pill: isMobile ? '5rem' : '6rem',
    'pill-text': isMobile ? '10rem' : '12rem',
  };

  return (
    <Link href={link}>
      <Logo
        logo={logo}
        size={widths[logo]}
      />
    </Link>
  );
}
