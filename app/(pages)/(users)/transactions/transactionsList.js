// hooks
import { useTransactionsDrawer } from '@/app/_lib/hooks/useTransactions';

// chakra-ui
import {
  Box,
  Flex,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

// local components
import TransactionItem from './transactionItem';

export default function TransactionsList({ transactions }) {
  const { onOpen } = useTransactionsDrawer();
  return (
    <Box
      mb={'1rem'}
      p={'1rem 0'}
      w={'max-content'}>
      <Table
        variant='simple'
        size={'sm'}>
        <Thead
          fontSize={'0.8rem'}
          color={'gray.500'}>
          <Tr>
            <Th>
              <DataTitle>Envelope name</DataTitle>
            </Th>
            <Th isNumeric>
              <DataTitle>Amount spent</DataTitle>
            </Th>
            <Th>
              <DataTitle>Date</DataTitle>
            </Th>
            <Th>
              <DataTitle>Note</DataTitle>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.length > 0 ? (
            transactions.map((txn) => {
              return (
                <TransactionItem
                  key={txn.id}
                  txn={txn}
                />
              );
            })
          ) : (
            <Tr color={'gray.600'}>
              <Td position={'absolute'}>
                <DataText>Empty. Click to add a transaction.</DataText>
              </Td>
              <Td
                borderBottom={'none'}
                pb={'1.5rem'}></Td>
            </Tr>
          )}
          <Tr onClick={onOpen}>
            <Td
              color={'gray.500'}
              position={'sticky'}
              left={'0'}>
              <DataText>+ New</DataText>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
}

const DataTitle = ({ children }) => {
  return (
    <Text
      color={'gray.500'}
      fontWeight={500}
      fontSize={'0.65rem'}>
      {children}
    </Text>
  );
};

const DataText = ({ children }) => {
  return <Text fontSize={'0.8rem'}>{children}</Text>;
};
