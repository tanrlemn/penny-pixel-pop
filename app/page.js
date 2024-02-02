'use client';

// hooks
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';

// chakra-ui
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Tag,
  Text,
} from '@chakra-ui/react';

// local components
import LoadingDiv from './_components/interactive/loadingDiv';

export default function Home() {
  const router = useRouter();
  const [code] = useQueryState('code');

  useEffect(() => {
    if (code && code !== 'undefined' && code !== null) {
      router.push(`/envelopes`);
    }
  }, [code, router]);

  return (
    <Container
      maxW={'100%'}
      p={0}>
      {code && code !== 'undefined' && code !== null ? (
        <LoadingDiv />
      ) : (
        <Flex direction={{ base: 'column', md: 'row' }}>
          <Image
            src={'https://i.imgur.com/uGWFxs0.jpg'}
            objectFit={'cover'}
            w={{ base: '100%', md: '50%' }}
            alt='A futuristic computer room with bubbles floating around.'
          />
          <Box
            p={'2rem'}
            pt={{ base: '3rem', md: '5rem' }}>
            <Tag
              mb={'0.5rem'}
              colorScheme={'green'}
              size={'md'}>
              Beta
            </Tag>
            <Heading
              mb={'1rem'}
              size={'2xl'}
              fontWeight={900}
              color={'purple.600'}>
              Manage Your Money Effortlessly with Conversational AI.
            </Heading>
            <Text mb={'1rem'}>
              Discover financial freedom with Penny Pixel Pop, your AI-powered
              budgeting ally. Effortlessly manage finances, set goals, and
              navigate your spending with just a chat. Begin your path to smart
              finance today.
            </Text>
            <Link href={'/auth/login'}>
              <Button colorScheme={'purple'}>Get Started</Button>
            </Link>
          </Box>
        </Flex>
      )}
    </Container>
  );
}
