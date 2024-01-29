'use client';

// hooks
import { usePathname } from 'next/navigation';

// chakra-ui
import { Box, Flex, Link } from '@chakra-ui/react';
import { History, Home, List, Search } from 'lucide-react';

export default function MenuTabs() {
  const pathname = usePathname();
  return (
    <Box
      borderTop={'1px solid'}
      borderTopColor={'gray.200'}
      position={'fixed'}
      bottom={0}
      bg={'white'}
      p={'0 2rem 1rem 2rem'}
      w={'100%'}
      left={0}>
      <Flex
        justify={'space-between'}
        align={'center'}>
        <MenuTab
          icon={<Home size={21} />}
          link={'/dashboard'}
          isCurrent={pathname.includes('/dashboard')}
        />
        <MenuTab
          icon={<List size={21} />}
          link={'/budget'}
          isCurrent={pathname.includes('/budget')}
        />
        <MenuTab
          icon={<History size={21} />}
          link={'/transactions'}
          isCurrent={pathname.includes('/transactions')}
        />
      </Flex>
    </Box>
  );
}

const MenuTab = ({ isCurrent, link, icon }) => {
  return (
    <Link
      color={isCurrent ? 'purple.600' : 'gray.400'}
      href={link}
      p={'1rem'}>
      <Flex>{icon}</Flex>
    </Link>
  );
};
