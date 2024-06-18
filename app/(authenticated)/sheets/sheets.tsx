'use client';

// recoil
import {
  useResetRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useRecoilState,
} from 'recoil';
import {
  sheetsState,
  currentUserSheetState,
  activeSheetState,
} from '@/app/_state/atoms';

// hooks
import { useSheets, useSheetDrawer } from '@/app/_lib/hooks/sheets';

// utils
import { format } from 'date-fns';

// chakra-ui
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

// local components
import LoadingDiv from '@/app/_components/interactive/loadingDiv';
import { CircleCheck } from 'lucide-react';

export default function Sheets() {
  const sheets = useRecoilValue(sheetsState);
  const resetActiveSheet = useResetRecoilState(activeSheetState);
  const setActiveSheet = useSetRecoilState(activeSheetState);
  const currentUserSheet = useRecoilValue(currentUserSheetState);
  const { loading } = useSheets();
  const { onOpen } = useSheetDrawer();

  return (
    <Box h={'fit-content'} mt={'1rem'} mb={'5rem'}>
      <Container maxW={{ base: '100vw', md: '700px' }} p={'0.5rem'}>
        <Heading mb={'1rem'}>Sheets</Heading>
        <Flex
          position={'sticky'}
          zIndex={10}
          bg={'white'}
          top={'0'}
          borderBottom={'1px solid'}
          borderBottomColor={'gray.200'}
          p={'0.5rem 0'}
          justify={'space-between'}
          align={'center'}
        >
          <Flex align={'center'} gap={'0.5rem'}>
            <Heading size={'sm'}>All sheets</Heading>
          </Flex>
          <Button
            onClick={() => {
              resetActiveSheet();
              onOpen();
            }}
            colorScheme={'orange'}
            size={'xs'}
          >
            + New Sheet
          </Button>
        </Flex>
        <TableContainer pt={'1rem'}>
          {loading && (
            <Box m={'0 auto'}>
              <LoadingDiv id={'budget'} isLoading={loading} />
            </Box>
          )}
          {sheets && (
            <Table size={'sm'}>
              <Thead fontSize={'0.8rem'} color={'gray.500'}>
                <Tr>
                  <Th
                    px={'0.5rem'}
                    borderRight={'1px solid'}
                    borderColor={'gray.100'}
                    position={'sticky'}
                    left={0}
                    bg={'white'}
                  >
                    <DataTitle>Sheet name</DataTitle>
                  </Th>
                  <Th>
                    <DataTitle>Date range</DataTitle>
                  </Th>
                  <Th>
                    <DataTitle>Current</DataTitle>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {sheets.length > 0 ? (
                  sheets.map((sheet) => (
                    <Tr
                      cursor={'pointer'}
                      key={sheet.id}
                      onClick={() => {
                        setActiveSheet(sheet);
                        onOpen();
                      }}
                    >
                      <Td
                        px={'0.5rem'}
                        position={'sticky'}
                        left={0}
                        bg={'white'}
                      >
                        <DataText>{sheet.title}</DataText>
                      </Td>
                      <Td px={'0.5rem'} bg={'white'}>
                        <DataText>
                          {format(sheet.start_date, 'MMM d')} -
                          {format(sheet.end_date, 'MMM d')}
                        </DataText>
                      </Td>
                      <Td
                        px={'0.5rem'}
                        bg={'white'}
                        color={'green.500'}
                        isNumeric
                      >
                        <Flex w={'100%'} justify={'center'} align={'center'}>
                          {currentUserSheet.id === sheet.id && (
                            <CircleCheck size={17} />
                          )}
                        </Flex>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr color={'gray.600'}>
                    <Td position={'absolute'}>
                      <DataText>Empty. Add a sheet to get started.</DataText>
                    </Td>
                    <Td borderBottom={'none'} pb={'1.5rem'}></Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </Box>
  );
}

const DataTitle = ({ children }) => {
  return (
    <Text color={'gray.500'} fontWeight={500} fontSize={'0.65rem'}>
      {children}
    </Text>
  );
};

const DataText = ({ children }) => {
  return <Text fontSize={'0.8rem'}>{children}</Text>;
};
