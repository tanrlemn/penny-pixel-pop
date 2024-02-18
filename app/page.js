'use client';

// hooks
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
import HowItWorks from './_components/sections/howItWorks';

export default function Home() {
  const [code] = useQueryState('code');

  return (
    <Container
      maxW={'100%'}
      mb={'10rem'}
      p={0}>
      <Flex
        align={{ base: 'flex-start', md: 'center' }}
        direction={{ base: 'column', md: 'row' }}
        mb={{ base: '2rem', md: '7rem' }}>
        <Image
          src={'https://i.imgur.com/uGWFxs0h.jpg'}
          objectFit={'cover'}
          w={{ base: '100%', md: '50%' }}
          alt='A futuristic computer room with bubbles floating around.'
        />
        <Box p={{ base: '2rem 1rem', md: '2rem' }}>
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
      <HowItWorks />
    </Container>
  );
}
