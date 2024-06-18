'use client';

// hooks
import { useRef, useState } from 'react';
import { useSheets, useSheetDrawer } from '@/app/_lib/hooks/useSheets';

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
import DateRangePicker from './dateRangePicker';

export default function SheetDrawer() {
  const cancelRef = useRef();

  const {
    deleteSheet,
    createUpdateSheet,
    currentSheet,
    setCurrentSheet,
    loading,
  } = useSheets();

  const { isOpen, onClose } = useSheetDrawer();

  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();

  const range = {
    from: currentSheet?.start_date,
    to: currentSheet?.end_date,
  };
  const setRange = (newRange) => {
    setCurrentSheet({
      ...currentSheet,
      start_date: newRange.from,
      end_date: newRange.to,
    });
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
              {currentSheet?.id ? 'Edit sheet' : 'Sheet'}
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
                  value={currentSheet?.title}
                  onChange={(e) => {
                    setCurrentSheet({
                      ...currentSheet,
                      title: e.target.value,
                    });
                  }}
                />
                <Box>
                  <Text minW={'fit-content'}>Date range:</Text>
                  <DateRangePicker
                    range={range}
                    setRange={setRange}
                    setCurrent={(newRange) => {
                      newRange &&
                        setCurrentSheet({
                          ...currentSheet,
                          start_date: newRange.from,
                          end_date: newRange.to,
                        });
                    }}
                  />
                </Box>
              </Stack>
            </FormControl>
          </DrawerBody>
          <DrawerFooter borderTop={'1px solid'} borderTopColor={'gray.200'}>
            <Flex gap={'1rem'}>
              {currentSheet?.id ? (
                <Button
                  size={'sm'}
                  colorScheme='red'
                  variant={'outline'}
                  onClick={() => {
                    onAlertOpen();
                  }}
                >
                  Delete sheet
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
                  createUpdateSheet({
                    id: currentSheet.id,
                    sheet: currentSheet,
                  });
                  // resetCurrentEnvelope();
                  onClose();
                }}
                isLoading={loading}
                colorScheme={'purple'}
                size={'sm'}
              >
                Save sheet
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
              Delete sheet
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
                  deleteSheet({
                    id: currentSheet.id,
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
