'use client';

// hooks
import { useState } from 'react';
import {
  useTransactionsDrawer,
  useTransactions,
} from '@/app/_lib/hooks/useTransactions';
import { useEnvelopes } from '@/app/_lib/hooks/useEnvelopes';

// chakra-ui
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
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
  const { envelopes } = useEnvelopes();
  const { currentTxn, createUpdateTxn, setCurrentTxn, resetTxn } =
    useTransactions();
  const { isTxnOpen, onTxnClose } = useTransactionsDrawer();

  const [isLoading, setIsLoading] = useState(false);

  const [date, setDate] = useState(new Date());

  return (
    <Drawer
      isOpen={isTxnOpen}
      placement='bottom'
      size={'lg'}
      onClose={onTxnClose}>
      <DrawerOverlay />
      <DrawerContent minH={'80vh'}>
        <DrawerCloseButton />

        <DrawerBody pt={'4rem'}>
          {envelopes && (
            <>
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
                      setCurrent={(date) => {
                        setCurrentTxn({
                          ...currentTxn,
                          date: date,
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
              <Box mt={'3rem'}>
                <Button
                  onClick={() => {
                    setIsLoading(true);
                    createUpdateTxn(currentTxn.id, currentTxn, setIsLoading);
                    resetTxn();
                    onTxnClose();
                  }}
                  isLoading={isLoading}
                  colorScheme={'purple'}
                  size={'sm'}>
                  Save transaction
                </Button>
              </Box>
            </>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
