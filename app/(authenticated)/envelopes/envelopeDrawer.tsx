'use client';

// recoil
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';
import { sheetsState, currentEnvelopeState } from '@/app/_state/atoms';

// hooks
import { useRef, useState } from 'react';
import { useEnvelopeDrawer, useEnvelopes } from '@/app/_lib/hooks/envelopes';
import { useSheetDrawer, useSheets } from '@/app/_lib/hooks/sheets';

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
import { NumericFormat } from 'react-number-format';

export default function EnvelopeDrawer() {
  const cancelRef = useRef();

  const sheets = useRecoilValue(sheetsState);

  const { onOpen: onSheetsOpen } = useSheetDrawer();

  const [currentEnvelope, setCurrentEnvelope] =
    useRecoilState(currentEnvelopeState);
  const resetCurrentEnvelope = useResetRecoilState(currentEnvelopeState);

  const { createUpdateEnvelope, deleteEnvelope, loading } = useEnvelopes();

  const { isOpen, onClose } = useEnvelopeDrawer();

  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();

  const inputProps = {
    placeholder: '$0.00',
    style: {
      borderRadius: 'var(--chakra-radii-md)',
      padding: '0.25rem 1rem',
      border: '1px solid',
      borderColor: 'var(--chakra-colors-gray-200)',
      fontSize: '0.9rem',
    },
  };

  return (
    <>
      <Drawer
        autoFocus={false}
        trapFocus={false}
        isOpen={isOpen}
        placement={'right'}
        size={{ base: 'lg', md: 'sm' }}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent minH={'80vh'}>
          <DrawerCloseButton />

          <DrawerHeader>
            <Text fontSize={'1.5rem'}>
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
                  fontSize={'1.5rem'}
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
                <Flex align={'center'} gap={'1rem'}>
                  <Text minW={'fit-content'}>Budget amount:</Text>
                  <NumericFormat
                    value={currentEnvelope.budget_amount}
                    {...inputProps}
                    prefix='$'
                    thousandSeparator
                    onValueChange={(values) => {
                      const { floatValue } = values;
                      setCurrentEnvelope({
                        ...currentEnvelope,
                        budget_amount: floatValue,
                      });
                    }}
                  />
                </Flex>
                <Flex align={'center'} gap={'1rem'}>
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
                    maxW={'fit-content'}
                    size={'sm'}
                    borderRadius={'md'}
                  >
                    {categories.map((category) => {
                      return (
                        <option key={category.name} value={category.name}>
                          {category.name}
                        </option>
                      );
                    })}
                  </Select>
                </Flex>
                {!currentEnvelope.sheet_id && (
                  <Flex align={'center'} gap={'1rem'}>
                    <Text minW={'fit-content'}>Sheet:</Text>
                    {sheets && (
                      <>
                        {sheets.length > 0 ? (
                          <Select
                            onChange={(e) => {
                              setCurrentEnvelope({
                                ...currentEnvelope,
                                sheet_id: e.target.value,
                              });
                            }}
                            variant={'filled'}
                            iconColor='gray.400'
                            color={'gray.700'}
                            defaultValue={
                              currentEnvelope.sheet_id || 'Select a sheet'
                            }
                            maxW={'fit-content'}
                            size={'sm'}
                            borderRadius={'md'}
                          >
                            <option value={'Select a sheet'} disabled={true}>
                              Select a sheet
                            </option>
                            {sheets.map((s) => {
                              return (
                                <option key={s.title} value={s.id}>
                                  {s.title}
                                </option>
                              );
                            })}
                          </Select>
                        ) : (
                          <Button
                            onClick={() => {
                              onClose();
                              onSheetsOpen();
                            }}
                            colorScheme={'gray'}
                            size={'xs'}
                          >
                            Create a Sheet
                          </Button>
                        )}
                      </>
                    )}
                  </Flex>
                )}
              </Stack>
            </FormControl>
          </DrawerBody>
          <DrawerFooter borderTop={'1px solid'} borderTopColor={'gray.200'}>
            <Flex gap={'1rem'}>
              {currentEnvelope.id ? (
                <Button
                  size={'sm'}
                  colorScheme='red'
                  variant={'outline'}
                  onClick={() => {
                    onAlertOpen();
                  }}
                >
                  Delete envelope
                </Button>
              ) : (
                <Button
                  size={'sm'}
                  colorScheme='gray'
                  variant={'outline'}
                  onClick={() => {
                    onClose();
                  }}
                >
                  Cancel
                </Button>
              )}
              <Button
                onClick={() => {
                  createUpdateEnvelope({
                    envelope: currentEnvelope,
                  });
                  resetCurrentEnvelope();
                  onClose();
                }}
                isLoading={loading}
                colorScheme={'orange'}
                size={'sm'}
              >
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
        onClose={onAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent m={'1rem'}>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Envelope
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onAlertClose}>
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={() => {
                  deleteEnvelope({
                    id: currentEnvelope.id,
                  });
                  onClose();
                  onAlertClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
