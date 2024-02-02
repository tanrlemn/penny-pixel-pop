'use client';

// hooks
import { usePathname } from 'next/navigation';

// chakra-ui
import { Box, Flex, Link, Text, VStack } from '@chakra-ui/react';
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
      p={'0 2rem 0 2rem'}
      w={'100%'}
      left={0}>
      <Flex
        justify={'space-around'}
        align={'center'}>
        <MenuTab
          icon={<List size={21} />}
          link={'/envelopes'}
          title={'Envelopes'}
          isCurrent={pathname.includes('/envelopes')}
        />
        <MenuTab
          icon={<History size={21} />}
          link={'/transactions'}
          title={'Transactions'}
          isCurrent={pathname.includes('/transactions')}
        />
      </Flex>
    </Box>
  );
}

const MenuTab = ({ isCurrent, link, icon, title }) => {
  return (
    <Link
      color={isCurrent ? 'purple.600' : 'gray.400'}
      href={link}
      p={'1rem'}>
      <VStack>
        {icon}
        <Text fontSize={'0.7rem'}>{title}</Text>
      </VStack>
    </Link>
  );
};
