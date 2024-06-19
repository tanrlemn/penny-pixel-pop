// hooks
import { useTransactionsDrawer } from '@/app/_lib/hooks/transactions';

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
    <Box m={'0 auto'} mb={'1rem'} p={'1rem 0'} minW={'max-content'} w={'100%'}>
      <Table variant='simple' size={'sm'}>
        <Thead fontSize={'0.8rem'} color={'gray.500'}>
          <Tr>
            <Th>
              <DataTitle>Note</DataTitle>
            </Th>
            <Th isNumeric>
              <DataTitle>Amount</DataTitle>
            </Th>
            <Th>
              <DataTitle>Envelope name</DataTitle>
            </Th>
            <Th>
              <DataTitle>Date</DataTitle>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.length > 0 ? (
            transactions.map((t) => {
              return <TransactionItem key={t.id} transaction={t} />;
            })
          ) : (
            <Tr color={'gray.600'}>
              <Td position={'absolute'}>
                <DataText>Empty. Add a transaction to get started.</DataText>
              </Td>
              <Td borderBottom={'none'} pb={'1.5rem'}></Td>
            </Tr>
          )}
          <Tr onClick={onOpen} cursor={'pointer'}>
            <Td color={'gray.500'} position={'sticky'} left={'0'}>
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
    <Text color={'gray.500'} fontWeight={500} fontSize={'0.65rem'}>
      {children}
    </Text>
  );
};

const DataText = ({ children }) => {
  return <Text fontSize={'0.8rem'}>{children}</Text>;
};
