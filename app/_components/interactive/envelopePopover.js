// hooks
import { useState, useRef } from 'react';
import { useEnvelopes, useEnvelopeDrawer } from '@/app/_lib/hooks/useEnvelopes';

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
  StatLabel,
  StatNumber,
  useDisclosure,
} from '@chakra-ui/react';
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';

export default function EnvelopePopover({ envelope, color }) {
  const cancelRef = useRef();
  const { deleteEnvelope, setCurrentEnvelope } = useEnvelopes();
  const { onOpen } = useEnvelopeDrawer();

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
              <StatLabel mb={'0.45rem'}>{envelope.envelope_name}</StatLabel>
              <StatNumber>{formatCurrency(envelope.budget_amount)}</StatNumber>
            </Stat>
          </PopoverHeader>
          <PopoverBody>
            <Stack>
              <Button
                onClick={() => {
                  setCurrentEnvelope(envelope);
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
              Delete Envelope
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
                  deleteEnvelope({ envelopeId: envelope.id });
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
