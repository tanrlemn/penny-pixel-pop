'use client';

// hooks
import { usePathname } from 'next/navigation';

// chakra-ui
import {
  Box,
  Flex,
  Link,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { History, Layers3, List } from 'lucide-react';

export default function MenuTabs() {
  const pathname = usePathname();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  return (
    <Box
      borderTop={'1px solid'}
      borderTopColor={borderColor}
      position={'fixed'}
      bottom={0}
      bg={bgColor}
      w={'100%'}
      left={0}
    >
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
    </Box>
  );
}

const MenuTab = ({ isCurrent, link, icon, title }) => {
  const color = useColorModeValue(
    isCurrent ? 'orange.600' : 'gray.500',
    isCurrent ? 'orange.400' : 'gray.500'
  );
  return (
    <Link color={color} href={link} p={'0.5rem'}>
      <VStack>
        {icon}
        <Text fontSize={'0.7rem'}>{title}</Text>
      </VStack>
    </Link>
  );
};
