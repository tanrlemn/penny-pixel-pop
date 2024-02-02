'use client';

// recoil
import { useRecoilValue, useRecoilState } from 'recoil';
import { enrichedTransactionsSelector } from '@/app/_state/selectors';
import { isloadingState } from '@/app/_state/atoms';

// hooks
import { useEffect } from 'react';
import { useTransactionsDrawer } from '@/app/_lib/hooks/useTransactions';

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
  const transactions = useRecoilValue(enrichedTransactionsSelector);
  const [isLoading, setIsLoading] = useRecoilState(isloadingState);

  const { onOpen } = useTransactionsDrawer();

  useEffect(() => {
    if (transactions) {
      setIsLoading(false);
    }
  }, [transactions, setIsLoading]);

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
          {transactions && (
            <Button
              onClick={() => onOpen()}
              colorScheme={'purple'}
              size={'xs'}>
              + New Transaction
            </Button>
          )}
        </Flex>
      </Container>
      <Container
        maxW={'1100px'}
        p={0}>
        <TableContainer
          pt={'1rem'}
          pl={{ base: '1rem', md: 0 }}>
          {isLoading && (
            <Box m={'0 auto'}>
              <LoadingDiv
                id={'budget'}
                isLoading={isLoading}
              />
            </Box>
          )}
          {transactions && <TransactionsList transactions={transactions} />}
        </TableContainer>
      </Container>
    </Box>
  );
}
