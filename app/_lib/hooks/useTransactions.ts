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
  currentTxnState,
  userState,
  transactionsDrawerState,
} from '../../_state/atoms';

// services
import {
  fetchTransactionsAPI,
  updateTransactionAPI,
  deleteTransactionAPI,
} from '../services/transactionService'; // Assuming these are implemented

// hooks
import { useCallback, useEffect } from 'react';

// chakra-ui
import { useToast } from '@chakra-ui/react';

export function useTransactions() {
  const toast = useToast();

  const user = useRecoilValue(userState);
  const setTransactions = useSetRecoilState(transactionsState);
  const resetCurrentTxn = useResetRecoilState(currentTxnState);

  // Fetch Transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return;
      const data = await fetchTransactionsAPI();
      setTransactions(data);
    };

    fetchTransactions();
  }, [user, setTransactions]);

  const createUpdateTransaction = useCallback(
    async ({ transactionId, transaction, setIsLoading }) => {
      setIsLoading(true);
      try {
        const newTransaction = transactionId
          ? new Promise((resolve, reject) => {
              updateTransactionAPI({ transactionId, transaction })
                .then(() => setTimeout(() => resolve(200), 500))
                .then(async () => {
                  const updatedTransactions = await fetchTransactionsAPI();
                  setTransactions(updatedTransactions);
                })
                .catch((error) => reject(error));
            })
          : new Promise((resolve, reject) => {
              updateTransactionAPI({ transaction })
                .then(() =>
                  setTimeout(() => {
                    resolve(200);
                  }, 500)
                )
                .then(async () => {
                  const updatedTransactions = await fetchTransactionsAPI();
                  setTransactions(updatedTransactions);
                })
                .catch((error) => reject(error));
            });

        resetCurrentTxn();

        toast.promise(newTransaction, {
          success: {
            position: 'top',
            title: `Transaction ${transactionId ? 'updated' : 'created'}`,
            duration: 3000,
            isClosable: true,
          },
          loading: {
            position: 'top',
            title: `Saving transaction...`,
          },
          error: {
            position: 'top',
            title: `Transaction ${transactionId ? 'update' : 'create'} failed`,
            description: `There was an error ${
              transactionId ? 'updating' : 'creating'
            } the transaction. Please try again.`,
            duration: 3000,
            isClosable: true,
          },
        });
      } catch (error) {
        console.error('Transaction update/create error:', error);
        toast({
          position: 'top',
          title: `Transaction ${transactionId ? 'update' : 'create'} failed`,
          description: `There was an error ${
            transactionId ? 'updating' : 'creating'
          } the transaction. Please try again.`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [setTransactions, resetCurrentTxn, toast]
  );

  const deleteTransaction = useCallback(
    async ({ transactionId, setIsLoading }) => {
      try {
        const deletedTransaction = new Promise((resolve, reject) => {
          deleteTransactionAPI({ transactionId })
            .then(() => setTimeout(() => resolve(200), 500))
            .then(async () => {
              const updatedTransactions = await fetchTransactionsAPI();
              setTransactions(updatedTransactions);
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

        resetCurrentTxn();
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
    [setTransactions, toast, resetCurrentTxn]
  );

  return {
    createUpdateTransaction,
    deleteTransaction,
    resetCurrentTxn,
  };
}

export function useTransactionsDrawer() {
  const [isOpen, setIsOpen] = useRecoilState(transactionsDrawerState);

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
