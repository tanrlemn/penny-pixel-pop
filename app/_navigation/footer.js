'use client';

// recoil
import { useRecoilValue } from 'recoil';
import { loadingState } from '@/app/loading';

// context
import { ContactContext } from '../_lib/context/ContactProvider';

// hooks
import { useContext } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from '../_lib/hooks/useUser';

// components
import {
  Flex,
  Box,
  Heading,
  Text,
  Stack,
  Link,
  Highlight,
} from '@chakra-ui/react';

export default function Footer() {
  const { contactOnOpen } = useContext(ContactContext);
  const loading = useRecoilValue(loadingState);

  const { session } = useSession();

  const pathname = usePathname();

  const isAuth =
    (pathname.includes('sign-in') || pathname.includes('sign-up')) &&
    session === null;

  return (
    <>
      {!loading && !isAuth && (
        <footer>
          <Flex
            flexDirection={{ base: 'column', md: 'row' }}
            p={{ base: '4rem 2rem 2rem 2rem', md: '7rem 2rem 5rem 2rem' }}>
            <Stack
              borderBottom={{
                base: 'gray.200',
                md: 'none',
              }}
              mb={{ base: '3rem', md: '0' }}
              pb={{ base: '3rem', md: '0' }}
              maxW={'25rem'}
              mr={{ base: 0, md: '7rem' }}>
              <Heading
                mb={'0.25rem'}
                size={'md'}
                color={'orange.500'}>
                _tL
              </Heading>
              <Text>
                <Highlight
                  query={"taNrleMn's"}
                  styles={{
                    fontWeight: 600,
                  }}>
                  taNrleMn&apos;s art explores the unity of shared pain and the
                  transformative power of connection.
                </Highlight>
              </Text>
            </Stack>
            <Flex
              gap={'3rem'}
              flexDirection={{ base: 'column', md: 'row' }}>
              <Box>
                <Heading
                  size={{ base: 'md' }}
                  mb={'0.5rem'}>
                  Art
                </Heading>
                <Stack gap={0}>
                  <Link href='/gallery'>Gallery</Link>
                  <Link href='/about'>About</Link>
                </Stack>
              </Box>
              <Box>
                <Heading
                  size={{ base: 'md' }}
                  mb={'0.5rem'}>
                  Shop
                </Heading>
                <Stack gap={0}>
                  <Link href='/shop'>Official Shop</Link>
                  <Link href='/subscriptions'>Subscriptions</Link>
                  <Link href='/commissions'>Commissions</Link>
                </Stack>
              </Box>
              <Box>
                <Heading
                  size={{ base: 'md' }}
                  mb={'0.5rem'}>
                  Support
                </Heading>
                <Stack gap={0}>
                  <Text
                    cursor={'pointer'}
                    onClick={contactOnOpen}>
                    Contact
                  </Text>
                  <Link href='/privacy'>Privacy</Link>
                  <Link href='/terms'>Terms</Link>
                </Stack>
              </Box>
            </Flex>
          </Flex>

          <Flex
            borderTop={'1px solid gray.200'}
            justify={'center'}
            flexDirection={'column'}
            textAlign={'center'}
            p={'2rem 1rem 1.5rem 1rem'}
            m={'0 2rem'}>
            <Text fontSize={'0.8rem'}>
              © 2024 Thought Soda, All Rights reserved
            </Text>
          </Flex>
        </footer>
      )}
    </>
  );
}
