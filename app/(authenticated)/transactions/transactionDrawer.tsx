'use client';

// recoil
import { useRecoilValue, useResetRecoilState, useRecoilState } from 'recoil';
import {
  currentTransactionState,
  loadingTransactionsState,
} from '@/app/_state/atoms';
import {
  currentTransactionSelector,
  envelopeCategoriesSelector,
} from '@/app/_state/selectors';

// hooks
import { useRef, useState } from 'react';
import {
  useTransactionsDrawer,
  useTransactions,
} from '@/app/_lib/hooks/transactions';

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
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { NumericFormat } from 'react-number-format';

// local components
import DatePicker from '@/app/_components/forms/datePicker';

export default function TransactionDrawer() {
  const cancelRef = useRef();

  const categories = useRecoilValue(envelopeCategoriesSelector);

  const { createUpdateTransaction, deleteTransaction } = useTransactions();
  const [currentTransaction, setCurrentTransaction] = useRecoilState(
    currentTransactionSelector
  );
  const resetCurrentTransaction = useResetRecoilState(currentTransactionState);
  const { isOpen, onClose } = useTransactionsDrawer();

  const loading = useRecoilValue(loadingTransactionsState);

  const date = new Date(currentTransaction?.date);
  const setDate = (newDate) => {
    setCurrentTransaction({
      ...currentTransaction,
      date: newDate,
    });
  };

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
        isOpen={isOpen}
        placement={'right'}
        size={{ base: 'lg', md: 'sm' }}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent minH={'80vh'}>
          <DrawerCloseButton />

          {categories && (
            <>
              <DrawerHeader>
                <Text fontSize={'1.5rem'}>Transaction</Text>
              </DrawerHeader>
              <DrawerBody pt={'2rem'}>
                <FormControl>
                  <Stack spacing={3}>
                    <Flex align={'center'} gap={'1rem'}>
                      <Text minW={'fit-content'}>Envelope:</Text>
                      <Select
                        onChange={(e) => {
                          setCurrentTransaction({
                            ...currentTransaction,
                            envelope_name: e.target.value,
                          });
                        }}
                        variant={'filled'}
                        iconColor='gray.400'
                        color={'gray.700'}
                        defaultValue={
                          currentTransaction.envelope_name ||
                          'Select an envelope'
                        }
                        maxW={'fit-content'}
                        size={'sm'}
                        borderRadius={'md'}
                      >
                        <option value={'Select an envelope'} disabled={true}>
                          Select an envelope
                        </option>
                        {categories.map((category) =>
                          category.envelopes.map((envelope) => (
                            <option
                              key={envelope.envelope_name}
                              value={envelope.envelope_name}
                            >
                              {envelope.envelope_name}
                            </option>
                          ))
                        )}
                      </Select>
                    </Flex>
                    <Flex align={'center'} gap={'1rem'}>
                      <Text minW={'fit-content'}>Amount:</Text>
                      <NumericFormat
                        value={currentTransaction.amount}
                        {...inputProps}
                        prefix='$'
                        thousandSeparator
                        onValueChange={(values) => {
                          const { floatValue } = values;
                          setCurrentTransaction({
                            ...currentTransaction,
                            amount: floatValue,
                          });
                        }}
                      />
                    </Flex>

                    <Box>
                      <Text minW={'fit-content'}>Date:</Text>
                      <DatePicker
                        date={date}
                        setDate={setDate}
                        setCurrent={(newDate) => {
                          setCurrentTransaction({
                            ...currentTransaction,
                            date: newDate,
                          });
                        }}
                      />
                    </Box>
                    <Box mt={'2rem'}>
                      <Text minW={'fit-content'}>Note:</Text>
                      <Textarea
                        value={currentTransaction.note}
                        onChange={(e) =>
                          setCurrentTransaction({
                            ...currentTransaction,
                            note: e.target.value,
                          })
                        }
                        size='md'
                        placeholder='Add a note about this transaction'
                      />
                    </Box>
                  </Stack>
                </FormControl>
              </DrawerBody>

              <DrawerFooter borderTop={'1px solid'} borderTopColor={'gray.200'}>
                <Flex gap={'1rem'}>
                  {currentTransaction.id ? (
                    <Button
                      onClick={() => {
                        onAlertOpen();
                      }}
                      variant={'outline'}
                      colorScheme={'red'}
                      size={'sm'}
                    >
                      Delete transaction
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
                      createUpdateTransaction({
                        transaction: currentTransaction,
                      });
                      onClose();
                    }}
                    isLoading={loading}
                    colorScheme={'orange'}
                    size={'sm'}
                    isDisabled={
                      currentTransaction.amount === 0 ||
                      !date ||
                      !currentTransaction.envelope_name
                    }
                  >
                    Save transaction
                  </Button>
                </Flex>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
      <AlertDialog
        isCentered
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent m={'1rem'}>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Transaction
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
                  deleteTransaction({
                    id: currentTransaction.id,
                  });
                  onClose();
                  onAlertClose();
                  resetCurrentTransaction();
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
