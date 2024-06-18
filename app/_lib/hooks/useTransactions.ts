'use client';

// recoil
import {
  useRecoilValue,
  useSetRecoilState,
  useRecoilState,
  useResetRecoilState,
} from 'recoil';
import {
  transactionsState,
  currentTransactionState,
  userState,
  transactionDrawerState,
  sheetsState,
  currentSheetState,
} from '@/app/_state/atoms';

// services
import {
  fetchTransactionsAPI,
  createUpdateTransactionAPI,
  deleteTransactionAPI,
} from '../services/transactionService'; // Assuming these are implemented

// hooks
import { useCallback, useEffect } from 'react';

// chakra-ui
import { useToast } from '@chakra-ui/react';

export function useTransactions() {
  const toast = useToast();

  const user = useRecoilValue(userState);
  const sheets = useRecoilValue(sheetsState);
  const currentSheet = useRecoilValue(currentSheetState);
  const [transactions, setTransactions] = useRecoilState(transactionsState);
  const resetCurrentTransaction = useResetRecoilState(currentTransactionState);

  // Fetch Transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user || !sheets) return;
      console.log('fetching transactions');
      const data = await fetchTransactionsAPI();

      setTransactions(data);
    };

    !transactions && fetchTransactions();
  }, [user, transactions, setTransactions, sheets, currentSheet]);

  const createUpdateTransaction = useCallback(
    async ({ transaction, setIsLoading }) => {
      setIsLoading(true);
      const { id } = transaction;
      try {
        const newTransaction = new Promise((resolve, reject) => {
          createUpdateTransactionAPI({ transaction })
            .then(async () => {
              const updatedTransactions = await fetchTransactionsAPI();
              setTransactions(updatedTransactions);
              resolve(updatedTransactions);
            })
            .catch((error) => reject(error));
        });

        resetCurrentTransaction();

        toast.promise(newTransaction, {
          success: {
            position: 'top',
            title: `Transaction ${id ? 'updated' : 'created'}`,
            duration: 3000,
            isClosable: true,
          },
          loading: {
            position: 'top',
            title: `Saving transaction...`,
          },
          error: {
            position: 'top',
            title: `Transaction ${id ? 'update' : 'create'} failed`,
            description: `There was an error ${
              id ? 'updating' : 'creating'
            } the transaction. Please try again.`,
            duration: 3000,
            isClosable: true,
          },
        });
      } catch (error) {
        console.error('Transaction update/create error:', error);
        toast({
          position: 'top',
          title: `Transaction ${id ? 'update' : 'create'} failed`,
          description: `There was an error ${
            id ? 'updating' : 'creating'
          } the transaction. Please try again.`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [setTransactions, resetCurrentTransaction, toast]
  );

  const deleteTransaction = useCallback(
    async ({ id, setIsLoading }) => {
      try {
        const deletedTransaction = new Promise((resolve, reject) => {
          deleteTransactionAPI({ id })
            .then(async () => {
              const updatedTransactions = await fetchTransactionsAPI();
              setTransactions(updatedTransactions);
              resolve(updatedTransactions);
            })
            .catch((error) => reject(error));
        });

        toast.promise(deletedTransaction, {
          success: {
            position: 'top',
            title: 'Transaction deleted',
            duration: 3000,
            isClosable: true,
          },
          loading: {
            position: 'top',
            title: 'Deleting transaction...',
          },
          error: {
            position: 'top',
            title: 'Transaction delete failed',
            description:
              'There was an error deleting the transaction. Please try again.',
            duration: 3000,
            isClosable: true,
          },
        });

        resetCurrentTransaction();
        setIsLoading(false);
      } catch (error) {
        console.error('Transaction delete error:', error);

        toast({
          position: 'top',
          title: 'Transaction delete failed',
          description:
            'There was an error deleting the transaction. Please try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    },
    [setTransactions, toast, resetCurrentTransaction]
  );

  return {
    createUpdateTransaction,
    deleteTransaction,
    resetCurrentTransaction,
  };
}

export function useTransactionsDrawer() {
  const [isOpen, setIsOpen] = useRecoilState(transactionDrawerState);

  const onClose = () => {
    setIsOpen(false);
  };
  const onOpen = () => setIsOpen(true);

  return {
    isOpen,
    onClose,
    onOpen,
  };
}
