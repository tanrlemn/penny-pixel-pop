'use client';

// hooks
import { useRef } from 'react';
import { useAuth } from '../_lib/hooks/useAuth';

// chakra-ui
import {
  Link,
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Flex,
  Heading,
  Box,
  VStack,
} from '@chakra-ui/react';
import { Menu } from 'lucide-react';

// local components
import LinkedLogo from '../_components/branding/linkedLogo';

export default function MenuDrawer() {
  const btnRef = useRef();
  const { loading } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box>
        <Button
          isLoading={loading}
          onClick={onOpen}>
          <Menu
            size={17}
            ref={btnRef}
            color={'#6B46C1'}
            cursor={'pointer'}
          />
        </Button>
      </Box>

      <Drawer
        isOpen={isOpen}
        placement='top'
        onClose={onClose}
        autoFocus={false}>
        <DrawerOverlay />
        <DrawerContent
          w={'100%'}
          maxH={{ base: '100vh' }}
          color={'white'}
          background={'purple.600'}>
          <DrawerCloseButton p={'2rem'} />
          <DrawerHeader>
            <LinkedLogo
              text
              color='purple.50'
            />
          </DrawerHeader>

          <DrawerBody
            p={{ base: '2rem', md: '2rem 3rem' }}
            w={'100%'}>
            <VStack
              h={'100%'}
              align={'flex-start'}
              justify={'space-between'}>
              <Box mb={'3rem'}>
                <Heading
                  color={'purple.50'}
                  size={'md'}
                  mb={'1rem'}>
                  Transform your finances with chat <br />– budgeting made so
                  simple, it feels like talking to a friend.
                </Heading>
                <Link href='/auth/login'>
                  <Button colorScheme={'gray'}>Get started</Button>
                </Link>
              </Box>

              <Link
                fontSize={'0.85rem'}
                href='/privacy'>
                Privacy Policy
              </Link>
              <Link
                fontSize={'0.85rem'}
                href='/terms'>
                Terms of Service
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
