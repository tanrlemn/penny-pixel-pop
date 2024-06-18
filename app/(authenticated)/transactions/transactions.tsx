'use client';

// recoil
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';
import { enrichedTransactionsSelector } from '@/app/_state/selectors';
import {
  currentTransactionState,
  loadingTransactionsState,
} from '@/app/_state/atoms';

// hooks
import { useTransactionsDrawer } from '@/app/_lib/hooks/transactions';

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
import SheetSelect from '../sheets/sheetSelect';

export default function Transactions() {
  const transactions = useRecoilValue(enrichedTransactionsSelector);
  const resetCurrentTransaction = useResetRecoilState(currentTransactionState);
  const loading = useRecoilValue(loadingTransactionsState);

  const { onOpen } = useTransactionsDrawer();

  return (
    <Box mt={'1rem'} mb={'5rem'}>
      <Container maxW={'700px'}>
        <SheetSelect />
        <Heading mb={'1rem'}>Transactions</Heading>
        <Flex
          position={'sticky'}
          zIndex={1000}
          bg={'white'}
          top={'0'}
          borderBottom={'1px solid'}
          borderBottomColor={'gray.200'}
          p={'0.5rem 0'}
          justify={'space-between'}
          align={'center'}
        >
          <Flex align={'center'} gap={'0.5rem'}>
            <Heading size={'sm'}>All transactions</Heading>
          </Flex>
          {transactions && (
            <Button
              onClick={() => {
                resetCurrentTransaction;
                onOpen();
              }}
              colorScheme={'orange'}
              size={'xs'}
            >
              + New Transaction
            </Button>
          )}
        </Flex>
        <TableContainer pt={'1rem'}>
          {loading && (
            <Box m={'0 auto'}>
              <LoadingDiv id={'budget'} isLoading={loading} />
            </Box>
          )}
          {transactions && <TransactionsList transactions={transactions} />}
        </TableContainer>
      </Container>
    </Box>
  );
}
