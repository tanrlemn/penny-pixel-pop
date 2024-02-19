'use client';

// recoil
import { currentTxnState, envelopesState } from '@/app/_state/atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentTransactionSelector } from '@/app/_state/selectors';

// hooks
import { useRef, useState } from 'react';
import {
  useTransactionsDrawer,
  useTransactions,
} from '@/app/_lib/hooks/useTransactions';

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

// local components
import DatePicker from '@/app/_components/forms/datePicker';

export default function TransactionDrawer() {
  const cancelRef = useRef();

  const envelopes = useRecoilValue(envelopesState);
  const { createUpdateTransaction, deleteTransaction, resetCurrentTxn } =
    useTransactions();
  const setCurrentTxn = useSetRecoilState(currentTxnState);
  const currentTxn = useRecoilValue(currentTransactionSelector);
  const { isOpen, onClose } = useTransactionsDrawer();

  const [isLoading, setIsLoading] = useState(false);

  const [date, setDate] = useState(new Date());

  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();

  const handleClose = () => {
    onClose();
    currentTxn.id && resetCurrentTxn();
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement={'bottom'}
        onClose={handleClose}>
        <DrawerOverlay />
        <DrawerContent
          minH={'80vh'}
          maxH={'80vh'}
          pb={'1rem'}>
          <DrawerCloseButton />

          {envelopes && (
            <>
              <DrawerHeader
                pb={'0.5rem'}
                borderBottom={'1px solid'}
                borderBottomColor={'gray.200'}>
                <Text
                  fontWeight={500}
                  fontSize={'1.25rem'}>
                  {currentTxn.id ? 'Edit Transaction' : 'Transaction'}
                </Text>
              </DrawerHeader>
              <DrawerBody pt={'2rem'}>
                <FormControl>
                  <Stack spacing={3}>
                    <Flex
                      align={'center'}
                      gap={'1rem'}>
                      <Text minW={'fit-content'}>Envelope:</Text>
                      <Select
                        onChange={(e) => {
                          setCurrentTxn({
                            ...currentTxn,
                            envelope_name: e.target.value,
                          });
                        }}
                        variant={'filled'}
                        iconColor='gray.400'
                        color={'gray.700'}
                        placeholder='Select an envelope'
                        defaultValue={currentTxn.envelope_name}
                        minW={'max-content'}>
                        {envelopes.map((envelope) => {
                          return (
                            <option
                              key={envelope.envelope_name}
                              value={envelope.envelope_name}>
                              {envelope.envelope_name}
                            </option>
                          );
                        })}
                      </Select>
                    </Flex>
                    <Flex
                      align={'center'}
                      gap={'1rem'}>
                      <Text minW={'fit-content'}>Amount:</Text>
                      <Input
                        placeholder='$0.00'
                        size='md'
                        value={currentTxn.amount}
                        type='number'
                        onChange={(e) =>
                          setCurrentTxn({
                            ...currentTxn,
                            amount: e.target.value,
                          })
                        }
                      />
                    </Flex>

                    <Box>
                      <Text minW={'fit-content'}>Date:</Text>
                      <DatePicker
                        date={date}
                        setDate={setDate}
                        setCurrent={(newDate) => {
                          setCurrentTxn({
                            ...currentTxn,
                            date: newDate,
                          });
                        }}
                      />
                    </Box>
                    <Box mt={'2rem'}>
                      <Text minW={'fit-content'}>Note:</Text>
                      <Textarea
                        value={currentTxn.note}
                        onChange={(e) =>
                          setCurrentTxn({
                            ...currentTxn,
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

              <DrawerFooter
                pb={0}
                mb={0}
                borderTop={'1px solid'}
                borderTopColor={'gray.200'}>
                <Flex
                  gap={'1rem'}
                  p={0}>
                  <Button
                    onClick={() => {
                      setIsLoading(true);
                      onAlertOpen();
                    }}
                    variant={'outline'}
                    colorScheme={'red'}
                    size={'sm'}>
                    Delete transaction
                  </Button>
                  <Button
                    onClick={() => {
                      setIsLoading(true);
                      createUpdateTransaction({
                        transactionId: currentTxn.id,
                        transaction: currentTxn,
                        setIsLoading,
                      });
                      onClose();
                    }}
                    isLoading={isLoading}
                    colorScheme={'purple'}
                    size={'sm'}>
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
        onClose={onAlertClose}>
        <AlertDialogOverlay>
          <AlertDialogContent m={'1rem'}>
            <AlertDialogHeader
              fontSize='lg'
              fontWeight='bold'>
              Delete Transaction
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
                  deleteTransaction({
                    transactionId: currentTxn.id,
                    setIsLoading,
                  });
                  onClose();
                  onAlertClose();
                  resetCurrentTxn();
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
