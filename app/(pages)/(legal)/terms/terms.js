'use client';

// chakra-ui
import { Box, Container, Heading, Link, Tag, Text } from '@chakra-ui/react';

export default function Terms() {
  return (
    <Container p={'5rem 1rem'}>
      <Box mb={'2rem'}>
        <Tag
          size={'sm'}
          textTransform={'uppercase'}
          colorScheme={'purple'}
          maxW={'fit-content'}>
          Terms
        </Tag>
        <Heading
          mb={'1rem'}
          size={'2xl'}
          fontWeight={800}>
          Terms of Service for Thought Soda
        </Heading>
      </Box>

      <Box mb={'2rem'}>
        <Heading
          mb={'0.5rem'}
          size={'md'}>
          Introduction
        </Heading>
        <Text mb={'0.5rem'}>
          Welcome to Thought Soda! These Terms of Service (&quot;Terms&quot;)
          govern your use of the Thought Soda website and services
          (&quot;Service&quot;).
        </Text>
        <Text>
          By accessing or using our Service, you agree to be bound by these
          Terms and our <Link href='/privacy'>Privacy Policy</Link>.
        </Text>
      </Box>

      <Box mb={'2rem'}>
        <Heading
          mb={'0.5rem'}
          size={'md'}>
          Use of Service
        </Heading>
        <Text mb={'0.5rem'}>
          The Service is intended for users who are at least 18 years old.
        </Text>
        <Text mb={'0.5rem'}>
          Thought Soda provides a platform for creative workshops and
          collaboration.
        </Text>
        <Text>
          Users must register for an account to access certain features of the
          Service.
        </Text>
      </Box>

      <Box mb={'2rem'}>
        <Heading
          mb={'0.5rem'}
          size={'md'}>
          User Responsibilities
        </Heading>
        <Text mb={'0.5rem'}>
          Users are responsible for their conduct and any content they submit to
          the Service.
        </Text>
        <Text>
          Prohibited activities include violating laws, infringing on
          intellectual property, and engaging in harassment or harmful behavior.
        </Text>
      </Box>
      <Box mb={'2rem'}>
        <Heading
          mb={'0.5rem'}
          size={'md'}>
          Intellectual Property
        </Heading>
        <Text>
          Thought Soda and its original content, features, and functionality are
          owned by Thought Soda and are protected by copyright, trademark, and
          other intellectual property laws.
        </Text>
      </Box>
      <Box mb={'2rem'}>
        <Heading
          mb={'0.5rem'}
          size={'md'}>
          Termination
        </Heading>
        <Text>
          We may terminate or suspend access to our Service immediately, without
          prior notice, for any breach of these Terms.
        </Text>
      </Box>
      <Box mb={'2rem'}>
        <Heading
          mb={'0.5rem'}
          size={'md'}>
          Limitation of Liability
        </Heading>
        <Text>
          Thought Soda is not liable for any direct, indirect, incidental, or
          consequential damages resulting from the use or inability to use the
          Service.
        </Text>
      </Box>
      <Box mb={'2rem'}>
        <Heading
          mb={'0.5rem'}
          size={'md'}>
          Changes to Terms
        </Heading>
        <Text>
          We reserve the right to modify or replace these Terms at any time. We
          will provide notice of any changes on our platform.
        </Text>
      </Box>
      <Box mb={'2rem'}>
        <Heading
          mb={'0.5rem'}
          size={'md'}>
          Contact Information
        </Heading>
        <Text>
          If you have any questions about these Terms of Service, please contact
          us at{' '}
          <Link href='mailto:support@thoughtsoda.com'>
            support@thoughtsoda.com
          </Link>
          .
        </Text>
      </Box>
    </Container>
  );
}
