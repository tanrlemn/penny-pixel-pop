'use client';

// hooks
import { useEffect } from 'react';

// chakra-ui
import {
  Box,
  Button,
  Container,
  Link,
  Text,
  Heading,
  Tag,
} from '@chakra-ui/react';

export default function NotFound() {
  return (
    <Container p={'5rem 1rem'}>
      <Tag
        size={'md'}
        textTransform={'uppercase'}
        colorScheme={'red'}
        maxW={'fit-content'}>
        404
      </Tag>
      <Heading
        maxW={'500px'}
        mb={'1rem'}
        size={'2xl'}
        fontWeight={800}>
        Oops... That&apos;s an error
      </Heading>
      <Text mb={'2rem'}>
        We couldn&apos;t find the page you were looking for. Please try again.
      </Text>
      <Box>
        <Link
          mb={'2rem'}
          maxW={'fit-content'}
          href={'/'}>
          <Button
            colorScheme={'purple'}
            mr={'1rem'}>
            Return home
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
