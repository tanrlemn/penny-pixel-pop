'use client';

// recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentUserSheetState, activeSheetState } from '@/app/_state/atoms';

// hooks
import { useRef } from 'react';
import { useSheets, useSheetDrawer } from '@/app/_lib/hooks/sheets';

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
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import DateRangePicker from '@/app/_components/forms/dateRangePicker';
import { Check, MousePointer2 } from 'lucide-react';

export default function SheetDrawer() {
  const cancelRef = useRef();

  const [activeSheet, setActiveSheet] = useRecoilState(activeSheetState);
  const currentUserSheet = useRecoilValue(currentUserSheetState);
  const {
    deleteSheet,
    createUpdateSheet,
    loading,
    handleChangeCurrentUserSheet,
  } = useSheets();

  const { isOpen, onClose } = useSheetDrawer();

  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();

  const range = {
    from: activeSheet?.start_date,
    to: activeSheet?.end_date,
  };
  const setRange = (newRange) => {
    if (typeof newRange === 'undefined') {
      setActiveSheet({
        ...activeSheet,
        start_date: null,
        end_date: null,
      });
    } else {
      setActiveSheet({
        ...activeSheet,
        start_date: newRange.from ? newRange.from : null,
        end_date: newRange.to ? newRange.to : null,
      });
    }
  };

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

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
        <DrawerContent minH={'80vh'} bg={bgColor}>
          <DrawerCloseButton />

          <DrawerHeader>
            <Text fontSize={'1.5rem'}>
              {activeSheet?.id ? 'Edit sheet' : 'New Sheet'}
            </Text>
          </DrawerHeader>

          <DrawerBody>
            {activeSheet?.id && (
              <Tag
                cursor={'pointer'}
                onClick={() => {
                  if (currentUserSheet.id !== activeSheet.id) {
                    handleChangeCurrentUserSheet(activeSheet);
                    onClose();
                  }
                }}
                colorScheme={
                  currentUserSheet?.id === activeSheet?.id ? 'green' : 'gray'
                }
              >
                <TagLeftIcon>
                  {currentUserSheet?.id === activeSheet?.id ? (
                    <Check />
                  ) : (
                    <MousePointer2 />
                  )}
                </TagLeftIcon>
                <TagLabel>
                  {currentUserSheet?.id === activeSheet?.id
                    ? 'Current'
                    : 'Use this sheet'}
                </TagLabel>
              </Tag>
            )}
            <FormControl>
              <Stack spacing={3}>
                <Input
                  border={'none'}
                  borderBottom={'1px solid'}
                  borderColor={borderColor}
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
                  value={activeSheet?.title}
                  onChange={(e) => {
                    setActiveSheet({
                      ...activeSheet,
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
                        setActiveSheet({
                          ...activeSheet,
                          start_date: newRange.from,
                          end_date: newRange.to,
                        });
                    }}
                  />
                </Box>
              </Stack>
            </FormControl>
          </DrawerBody>
          <DrawerFooter borderTop={'1px solid'} borderTopColor={borderColor}>
            <Flex gap={'1rem'}>
              {activeSheet?.id ? (
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
                    id: activeSheet.id,
                    sheet: activeSheet,
                  });
                  onClose();
                }}
                isLoading={loading}
                isDisabled={
                  activeSheet.title === '' ||
                  !activeSheet.start_date ||
                  !activeSheet.end_date
                }
                colorScheme={'orange'}
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
                    id: activeSheet.id,
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
