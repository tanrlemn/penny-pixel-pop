'use client';

// hooks
import {
  useTransactions,
  useTransactionsDrawer,
} from '@/app/_lib/hooks/useTransactions';

// chakra-ui
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  TableContainer,
} from '@chakra-ui/react';

// local components
import TransactionsList from './transactionsList';
import LoadingDiv from '@/app/_components/interactive/loadingDiv';

export default function Transactions() {
  const { transactions } = useTransactions();
  const { onTxnOpen } = useTransactionsDrawer();

  return (
    <Box
      mt={'1rem'}
      mb={'5rem'}>
      <Container>
        <Heading mb={'1rem'}>Transactions</Heading>
        <Flex
          borderBottom={'1px solid'}
          borderBottomColor={'gray.200'}
          p={'0.5rem 0'}
          justify={'space-between'}
          align={'center'}>
          <Heading size={'sm'}>All transactions</Heading>
          <Button
            onClick={() => onTxnOpen()}
            colorScheme={'purple'}
            size={'xs'}>
            + New Transaction
          </Button>
        </Flex>
      </Container>
      <TableContainer
        pt={'1rem'}
        pl={'1rem'}>
        {transactions ? (
          <TransactionsList transactions={transactions} />
        ) : (
          <LoadingDiv />
        )}
      </TableContainer>
    </Box>
  );
}
