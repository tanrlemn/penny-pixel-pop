'use client';

// hooks
import { useEffect } from 'react';

// chakra-ui
import {
  Box,
  Button,
  Container,
  Tag,
  Text,
  Heading,
  Link,
} from '@chakra-ui/react';

// local components
import Navbar from './_navigation/navbar';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Navbar />
      <Container p={'5rem 1rem'}>
        <Tag
          size={'md'}
          textTransform={'uppercase'}
          colorScheme={'red'}
          maxW={'fit-content'}
        >
          Error
        </Tag>
        <Heading maxW={'500px'} mb={'1rem'} size={'2xl'} fontWeight={800}>
          Oops... Something went wrong
        </Heading>
        <Text mb={'2rem'}>
          We couldn&apos;t make that request. Please try again.
        </Text>
        <Box>
          <Button colorScheme={'orange'} onClick={() => reset()} mr={'1rem'}>
            Try again
          </Button>
          <Link mb={'2rem'} maxW={'fit-content'} href={'/'}>
            <Button variant={'ghost'} mr={'1rem'}>
              Return home
            </Button>
          </Link>
        </Box>
      </Container>
    </>
  );
}
