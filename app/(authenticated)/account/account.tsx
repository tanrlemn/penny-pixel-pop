'use client';

// recoil
import { useRecoilValue } from 'recoil';
import { userProfileSelector } from '@/app/_state/selectors';

// chakra-ui
import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { Users } from 'lucide-react';

export default function Settings() {
  const profile = useRecoilValue(userProfileSelector);

  return (
    <Container maxW={{ base: '100vw', md: '900px' }} p={'1rem'}>
      <Heading mb={'1rem'}>Account</Heading>
      <Flex
        position={'sticky'}
        zIndex={10}
        bg={'white'}
        top={'0'}
        p={'0.5rem 0'}
        justify={'space-between'}
        align={'center'}
      >
        <Heading size={'sm'}>Sharing preferences</Heading>
      </Flex>
      <Box>
        <Flex py={'0.5rem'} align={'center'}>
          <Users size={17} />
          <Text fontWeight={500} ml={'0.5rem'}>
            Manage family sharing
          </Text>
        </Flex>
      </Box>
    </Container>
  );
}
