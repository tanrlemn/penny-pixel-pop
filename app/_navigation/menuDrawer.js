'use client';

// hooks
import { useRef } from 'react';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box>
        <Menu
          ref={btnRef}
          onClick={onOpen}
          color={'#6B46C1'}
          cursor={'pointer'}
        />
      </Box>

      <Drawer
        isOpen={isOpen}
        placement='top'
        isFullHeight
        onClose={onClose}
        autoFocus={false}>
        <DrawerContent
          w={'100%'}
          maxH={{ base: '100vh' }}
          pb={{ base: '6rem', md: '3rem' }}
          color={'white'}
          background={'purple.600'}>
          <DrawerCloseButton p={'2rem'} />
          <DrawerHeader>
            <LinkedLogo />
          </DrawerHeader>

          <DrawerBody
            p={{ base: '0 2rem', md: '1rem 3rem' }}
            w={'100%'}>
            <Flex
              w={'100%'}
              h={'100%'}
              flexDirection={{ base: 'column', md: 'row' }}
              justify={'space-between'}>
              <Flex gap={'2rem'}>
                <Link href='/auth/login'>
                  <Button colorScheme={'purple'}>Login</Button>
                </Link>
              </Flex>
              <VStack>
                <Link href='/privacy'>Privacy Policy</Link>
                <Link href='/terms'>Terms of Service</Link>
              </VStack>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
