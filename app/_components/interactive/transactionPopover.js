// recoil
import { currentTxnState, envelopesState } from '@/app/_state/atoms';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

// hooks
import { useState, useRef } from 'react';
import {
  useTransactions,
  useTransactionsDrawer,
} from '@/app/_lib/hooks/useTransactions';

// utils
import { formatCurrency } from '@/app/_lib/utils/currencyFormater';

// chakra-ui
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useDisclosure,
} from '@chakra-ui/react';
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';

export default function TransactionPopover({ txn, color }) {
  const cancelRef = useRef();
  const { deleteTransaction } = useTransactions();
  const { onOpen } = useTransactionsDrawer();
  const setCurrentTxn = useSetRecoilState(currentTxnState);

  const { isOpen, onOpen: alertOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Popover placement={'auto'}>
        <PopoverTrigger color={'gray.500'}>
          <MoreHorizontal />
        </PopoverTrigger>
        <PopoverContent
          bg={'gray.50'}
          border={'2px solid'}
          borderColor={`${color}.200`}>
          <PopoverArrow bg={`${color}.400`} />
          <PopoverCloseButton />
          <PopoverHeader>
            <Stat>
              <StatLabel
                mt={'0.5rem'}
                mb={'0.45rem'}>
                {txn.envelope_name}
              </StatLabel>
              <StatNumber mb={'0.5rem'}>
                {formatCurrency(txn.amount)}
              </StatNumber>
              <StatHelpText>{txn.note}</StatHelpText>
            </Stat>
          </PopoverHeader>
          <PopoverBody>
            <Stack>
              <Button
                onClick={() => {
                  setCurrentTxn(txn);
                  onOpen();
                }}
                leftIcon={<Edit size={15} />}
                size={'sm'}>
                Edit
              </Button>
              <Button
                onClick={() => {
                  setIsLoading(true);
                  alertOpen();
                }}
                leftIcon={<Trash2 size={15} />}
                colorScheme={'red'}
                size={'sm'}>
                Delete
              </Button>
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <AlertDialog
        isCentered
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}>
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
                onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={() => {
                  setIsLoading(true);
                  deleteTransaction({ transactionId: txn.id });
                  onClose();
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
