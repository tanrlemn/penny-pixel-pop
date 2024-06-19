'use client';

// recoil
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';
import {
  transactionsState,
  currentTransactionState,
  userState,
  transactionDrawerState,
  sheetsState,
  currentUserSheetState,
  loadingTransactionsState,
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
  const currentUserSheet = useRecoilValue(currentUserSheetState);
  const [transactions, setTransactions] = useRecoilState(transactionsState);
  const [loading, setLoading] = useRecoilState(loadingTransactionsState);
  const resetCurrentTransaction = useResetRecoilState(currentTransactionState);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user || !sheets) return;
      console.log('fetching transactions');
      const data = await fetchTransactionsAPI();

      setTransactions(data);
      setLoading(false);
    };

    !transactions && fetchTransactions();
  }, [
    user,
    transactions,
    setTransactions,
    sheets,
    currentUserSheet,
    setLoading,
  ]);

  const createUpdateTransaction = useCallback(
    async ({ transaction }) => {
      setLoading(true);
      const { id } = transaction;
      console.log('createUpdateTransaction', transaction);
      try {
        const newTransaction = new Promise((resolve, reject) => {
          resolve(createUpdateTransactionAPI({ transaction }));
        });

        newTransaction
          .then(async () => {
            const updatedTransactions = await fetchTransactionsAPI();
            setTransactions(updatedTransactions);
          })
          .catch((error) => {
            console.error('Transaction update/create error:', error);
            throw error;
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
        setLoading(false);
      }
    },
    [setTransactions, resetCurrentTransaction, toast, setLoading]
  );

  const deleteTransaction = useCallback(
    async ({ id }) => {
      try {
        setLoading(true);
        const deletedTransaction = new Promise((resolve, reject) => {
          resolve(deleteTransactionAPI({ id }));
        });

        deletedTransaction
          .then(async () => {
            const updatedTransactions = await fetchTransactionsAPI();
            setTransactions(updatedTransactions);
          })
          .catch((error) => {
            console.error('Transaction delete error:', error);
            throw error;
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
        setLoading(false);
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
    [setTransactions, toast, resetCurrentTransaction, setLoading]
  );

  return {
    createUpdateTransaction,
    deleteTransaction,
    loading,
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
