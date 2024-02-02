'use client';

// chakra-ui
import { Box, Container, Heading, Link, Tag, Text } from '@chakra-ui/react';

export default function Terms() {
  return (
    <Container p={'3rem 1rem'}>
      <Box mb={'2rem'}>
        <Heading
          mb={'1rem'}
          size={'2xl'}
          fontWeight={800}>
          Terms of Service for Penny Pixel Pop
        </Heading>
      </Box>

      <Box mb={'2rem'}>
        <Heading
          mb={'0.5rem'}
          size={'md'}>
          Introduction
        </Heading>
        <Text mb={'0.5rem'}>
          Welcome to Penny Pixel Pop. These terms govern your use of our app and
          services, providing important information about your legal rights.
        </Text>
        <Text>
          By accessing or using Penny Pixel Pop, you agree to be bound by these
          terms. If you do not agree, you should not use the app.
        </Text>
      </Box>

      <Box mb={'2rem'}>
        <Heading
          mb={'0.5rem'}
          size={'md'}>
          Use License
        </Heading>
        <Text>
          We grant you a limited, non-exclusive license to use Penny Pixel Pop
          for personal, non-commercial purposes. This license does not include
          any right to resell the app&apos;s content or services.
        </Text>
      </Box>

      <Box mb={'2rem'}>
        <Heading
          mb={'0.5rem'}
          size={'md'}>
          User Responsibilities
        </Heading>
        <Text>
          Users are responsible for maintaining the security of your account and
          for all activities that occur under your account. You agree to use
          Penny Pixel Pop lawfully and respect the rights of others.
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
          The content and services provided by Penny Pixel Pop, including all
          software, text, and graphics, are protected by intellectual property
          laws and are owned by us or our licensors.
        </Text>
      </Box>
      <Box mb={'2rem'}>
        <Heading
          mb={'0.5rem'}
          size={'md'}>
          Termination
        </Heading>
        <Text>
          We may terminate your access to the app without notice if you violate
          these terms.
        </Text>
      </Box>
      <Box mb={'2rem'}>
        <Heading
          mb={'0.5rem'}
          size={'md'}>
          Disclaimers and Limitations of Liability
        </Heading>
        <Text>
          Penny Pixel Pop is provided &quot;as is.&quot; We disclaim all
          warranties and limit our liability to the maximum extent permitted by
          law.
        </Text>
      </Box>

      <Box mb={'2rem'}>
        <Heading
          mb={'0.5rem'}
          size={'md'}>
          Dispute Resolution
        </Heading>
        <Text>
          Any disputes related to these terms will be resolved through binding
          arbitration or in small claims court, subject to applicable law.
        </Text>
      </Box>

      <Box mb={'2rem'}>
        <Heading
          mb={'0.5rem'}
          size={'md'}>
          Modifications to the Terms
        </Heading>
        <Text>
          We reserve the right to modify these terms at any time. Your continued
          use of the app constitutes acceptance of the new terms.
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
          <Link href='mailto:support@pennypixelpop.com'>
            support@pennypixelpop.com
          </Link>
          .
        </Text>
      </Box>
    </Container>
  );
}
