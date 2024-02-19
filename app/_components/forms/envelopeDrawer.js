'use client';

// hooks
import { useRef, useState } from 'react';
import { useEnvelopeDrawer, useEnvelopes } from '@/app/_lib/hooks/useEnvelopes';

// chakra-ui
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  Input,
  Select,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { categories } from '@/app/_state/constants';

export default function EnvelopeDrawer() {
  const cancelRef = useRef();

  const {
    currentEnvelope,
    createUpdateEnvelope,
    setCurrentEnvelope,
    resetCurrentEnvelope,
    deleteEnvelope,
  } = useEnvelopes();

  const { isOpen, onClose } = useEnvelopeDrawer();

  const [isLoading, setIsLoading] = useState(false);

  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();

  return (
    <>
      <Drawer
        autoFocus={false}
        trapFocus={false}
        isOpen={isOpen}
        placement={'bottom'}
        onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          minH={'80vh'}
          maxH={'85vh'}>
          <DrawerCloseButton />

          <DrawerHeader
            pb={'0.5rem'}
            borderBottom={'1px solid'}
            borderBottomColor={'gray.200'}>
            <Text
              fontWeight={500}
              fontSize={'1.25rem'}>
              {currentEnvelope.id ? 'Edit envelope' : 'Envelope'}
            </Text>
          </DrawerHeader>

          <DrawerBody pt={'2rem'}>
            <FormControl>
              <Stack spacing={3}>
                <Input
                  border={'none'}
                  borderBottom={'1px solid'}
                  borderColor={'gray.200'}
                  borderRadius={0}
                  _placeholder={{ color: 'gray.300' }}
                  transition={'all 0.2s ease-in-out'}
                  _focus={{
                    borderRadius: '9px',
                    borderBottom: 'none',
                    padding: '0.5rem 1rem',
                  }}
                  focusBorderColor='green.300'
                  placeholder='Untitled'
                  fontSize={'2rem'}
                  p={'0.5rem 0'}
                  mb={'1rem'}
                  h={'auto'}
                  fontWeight={500}
                  value={currentEnvelope.envelope_name}
                  onChange={(e) => {
                    setCurrentEnvelope({
                      ...currentEnvelope,
                      envelope_name: e.target.value,
                    });
                  }}
                />
                <Flex
                  align={'center'}
                  gap={'1rem'}>
                  <Text minW={'fit-content'}>Budget amount:</Text>
                  <Input
                    placeholder='$0.00'
                    size='md'
                    value={currentEnvelope.budget_amount}
                    type='number'
                    onChange={(e) =>
                      setCurrentEnvelope({
                        ...currentEnvelope,
                        budget_amount: e.target.value,
                      })
                    }
                  />
                </Flex>
                <Flex
                  align={'center'}
                  gap={'1rem'}>
                  <Text minW={'fit-content'}>Category:</Text>
                  <Select
                    onChange={(e) => {
                      setCurrentEnvelope({
                        ...currentEnvelope,
                        category: e.target.value,
                      });
                    }}
                    variant={'filled'}
                    iconColor='gray.400'
                    color={'gray.700'}
                    defaultValue={currentEnvelope.category || 'Necessities'}
                    minW={'max-content'}>
                    {categories.map((category) => {
                      return (
                        <option
                          key={category.name}
                          value={category.name}>
                          {category.name}
                        </option>
                      );
                    })}
                  </Select>
                </Flex>
              </Stack>
            </FormControl>
          </DrawerBody>
          <DrawerFooter
            borderTop={'1px solid'}
            borderTopColor={'gray.200'}>
            <Flex gap={'1rem'}>
              {currentEnvelope.id ? (
                <Button
                  size={'sm'}
                  colorScheme='red'
                  variant={'outline'}
                  onClick={() => {
                    onAlertOpen();
                  }}>
                  Delete envelope
                </Button>
              ) : (
                <Button
                  size={'sm'}
                  colorScheme='gray'
                  variant={'outline'}
                  onClick={() => {
                    onClose();
                  }}>
                  Cancel
                </Button>
              )}
              <Button
                onClick={() => {
                  setIsLoading(true);
                  createUpdateEnvelope({
                    envelopeId: currentEnvelope.id,
                    envelope: currentEnvelope,
                    setIsLoading,
                  });
                  resetCurrentEnvelope();
                  onClose();
                }}
                isLoading={isLoading}
                colorScheme={'purple'}
                size={'sm'}>
                Save envelope
              </Button>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <AlertDialog
        autoFocus={false}
        isCentered
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}>
        <AlertDialogOverlay>
          <AlertDialogContent m={'1rem'}>
            <AlertDialogHeader
              fontSize='lg'
              fontWeight='bold'>
              Delete Envelope
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onAlertClose}>
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={() => {
                  setIsLoading(true);
                  deleteEnvelope({
                    envelopeId: currentEnvelope.id,
                    setIsLoading,
                  });
                  onClose();
                  onAlertClose();
                }}
                ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
