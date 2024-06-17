'use client';

// hooks
import { usePathname } from 'next/navigation';
import { useAuth } from '../_lib/hooks/useAuth';

// chakra-ui
import { Box, Flex, Link, Text, VStack } from '@chakra-ui/react';
import { History, Home, Layers3, List, Search } from 'lucide-react';

export default function MenuTabs() {
  const pathname = usePathname();
  const { loading } = useAuth();
  return (
    <Box
      borderTop={'1px solid'}
      borderTopColor={'gray.200'}
      position={'fixed'}
      bottom={0}
      bg={'white'}
      w={'100%'}
      left={0}
    >
      {!loading && (
        <Flex justify={'space-around'} align={'center'}>
          <MenuTab
            icon={<Layers3 size={17} />}
            link={'/sheets'}
            title={'Sheets'}
            isCurrent={pathname.includes('/sheets')}
          />
          <MenuTab
            icon={<List size={17} />}
            link={'/envelopes'}
            title={'Envelopes'}
            isCurrent={pathname.includes('/envelopes')}
          />
          <MenuTab
            icon={<History size={17} />}
            link={'/transactions'}
            title={'Transactions'}
            isCurrent={pathname.includes('/transactions')}
          />
        </Flex>
      )}
    </Box>
  );
}

const MenuTab = ({ isCurrent, link, icon, title }) => {
  return (
    <Link
      color={isCurrent ? 'purple.600' : 'gray.400'}
      href={link}
      p={'0.5rem'}
    >
      <VStack>
        {icon}
        <Text fontSize={'0.7rem'}>{title}</Text>
      </VStack>
    </Link>
  );
};
