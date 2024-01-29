'use client';

// chakra-ui
import { Box, Container, Heading, Link, Tag, Text } from '@chakra-ui/react';

export default function Privacy() {
  return (
    <Container p={'5rem 1rem'}>
      <Box mb={'2rem'}>
        <Tag
          size={'sm'}
          textTransform={'uppercase'}
          colorScheme={'purple'}
          maxW={'fit-content'}>
          Policy
        </Tag>
        <Heading
          mb={'1rem'}
          size={'2xl'}
          fontWeight={800}>
          Privacy Policy for Thought Soda
        </Heading>
      </Box>
      <Box mb={'2rem'}>
        <Heading
          mb={'0.5rem'}
          size={'md'}>
          Introduction
        </Heading>
        <Text>
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, disclose, and safeguard your information when you use
          Thought Soda.
        </Text>
      </Box>
      <Box mb={'2rem'}>
        <Heading
          mb={'0.5rem'}
          size={'md'}>
          Information Collection and Use
        </Heading>
        <Text mb={'0.75rem'}>
          Personal Identification Information: We collect information that you
          voluntarily provide when registering, such as name, email address, and
          password.
        </Text>
        <Text>
          Usage Data: We collect data on how the Service is accessed and used.
        </Text>
      </Box>
      <Box mb={'2rem'}>
        <Heading
          mb={'0.5rem'}
          size={'md'}>
          Use of Data
        </Heading>
        <Text mb={'0.75rem'}>To provide and maintain our Service.</Text>
        <Text mb={'0.75rem'}>To notify you about changes to our Service.</Text>
        <Text>
          To allow you to participate in interactive features of our Service.
        </Text>
      </Box>
      <Box mb={'2rem'}>
        <Heading
          mb={'0.5rem'}
          size={'md'}>
          Data Sharing and Disclosure
        </Heading>
        <Text mb={'0.75rem'}>
          We do not sell or rent personal information to third parties.
        </Text>
        <Text>
          Data may be shared with third-party service providers to facilitate
          our Service, provide the Service on our behalf, or assist us in
          analyzing how our Service is used.
        </Text>
      </Box>
      <Box mb={'2rem'}>
        <Heading
          mb={'0.5rem'}
          size={'md'}>
          Data Security
        </Heading>
        <Text>
          We strive to use commercially acceptable means to protect your
          personal information, but remember that no method of transmission over
          the Internet is 100% secure.
        </Text>
      </Box>
      <Box mb={'2rem'}>
        <Heading
          mb={'0.5rem'}
          size={'md'}>
          Children&apos;s Privacy
        </Heading>
        <Text mb={'0.75rem'}>
          Our Service does not address anyone under the age of 18
          (&quot;Children&quot;).
        </Text>
        <Text>
          We do not knowingly collect personally identifiable information from
          anyone under the age of 18.
        </Text>
      </Box>
      <Box mb={'2rem'}>
        <Heading
          mb={'0.5rem'}
          size={'md'}>
          Changes to Privacy Policy
        </Heading>
        <Text>
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page.
        </Text>
      </Box>
      <Box mb={'2rem'}>
        <Heading
          mb={'0.5rem'}
          size={'md'}>
          Contact Information
        </Heading>
        <Text>
          If you have any questions about this Privacy Policy, please contact us
          at{' '}
          <Link href='mailto:support@thoughtsoda.com'>
            support@thoughtsoda.com
          </Link>
          .
        </Text>
      </Box>
    </Container>
  );
}
