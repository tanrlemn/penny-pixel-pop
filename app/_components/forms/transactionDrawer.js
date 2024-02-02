'use client';

// recoil
import { currentTxnState, envelopesState } from '@/app/_state/atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentTransactionSelector } from '@/app/_state/selectors';

// hooks
import { useEffect, useState } from 'react';
import {
  useTransactionsDrawer,
  useTransactions,
} from '@/app/_lib/hooks/useTransactions';

// chakra-ui
import {
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
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';

// local components
import DatePicker from '@/app/_components/forms/datePicker';

export default function TransactionDrawer() {
  const envelopes = useRecoilValue(envelopesState);
  const { createUpdateTransaction, deleteTransaction } = useTransactions();
  const setCurrentTxn = useSetRecoilState(currentTxnState);
  const currentTxn = useRecoilValue(currentTransactionSelector);
  const { isOpen, onClose } = useTransactionsDrawer();

  const [isLoading, setIsLoading] = useState(false);

  const [date, setDate] = useState(new Date());

  useEffect(() => {}, [currentTxn]);

  return (
    <Drawer
      isOpen={isOpen}
      placement={{ base: 'bottom', md: 'right' }}
      size={{ base: 'lg', md: 'sm' }}
      onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent minH={'80vh'}>
        <DrawerCloseButton />

        {envelopes && (
          <>
            <DrawerHeader>
              <Text fontSize={'1.5rem'}>Transaction</Text>
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
              borderTop={'1px solid'}
              borderTopColor={'gray.200'}>
              <Box>
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
              </Box>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
