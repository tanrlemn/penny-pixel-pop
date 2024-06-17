'use client';

// recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import { sheetsState } from '@/app/_state/atoms';

// hooks
import { useEffect } from 'react';
import { useSheets, useSheetDrawer } from '@/app/_lib/hooks/useSheets';

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
import { Layers3 } from 'lucide-react';

export default function Sheets() {
  const { loading, sheets, setCurrentSheet } = useSheets();
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
            <Layers3 size={17} />
            <Heading size={'sm'}>All sheets</Heading>
          </Flex>
          <Button onClick={onOpen} colorScheme={'orange'} size={'xs'}>
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
                </Tr>
              </Thead>
              <Tbody>
                {sheets.length > 0 ? (
                  sheets.map((sheet) => (
                    <Tr
                      cursor={'pointer'}
                      key={sheet.id}
                      onClick={() => {
                        setCurrentSheet(sheet);
                      }}
                    >
                      <Td
                        px={'0.5rem'}
                        position={'sticky'}
                        left={0}
                        bg={'white'}
                        onClick={() => {
                          setCurrentSheet(sheet);
                          onOpen();
                        }}
                      >
                        <DataText>{sheet.title}</DataText>
                      </Td>
                      <Td
                        px={'0.5rem'}
                        position={'sticky'}
                        left={0}
                        bg={'white'}
                        onClick={() => {
                          setCurrentSheet(sheet);
                          onOpen();
                        }}
                      >
                        <DataText>
                          {format(sheet.start_date, 'MMM d')} -
                          {format(sheet.end_date, 'MMM d')}
                        </DataText>
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
