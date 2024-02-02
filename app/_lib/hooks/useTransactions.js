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

export function useTransactions() {
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
        transactionId
          ? await updateTransactionAPI({ transactionId, transaction })
          : await updateTransactionAPI({ transaction });

        const updatedTransactions = await fetchTransactionsAPI();
        setTransactions(updatedTransactions);

        resetCurrentTxn(); // Reset current transaction state
      } catch (error) {
        console.error('Transaction update/create error:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [setTransactions, resetCurrentTxn]
  );

  const deleteTransaction = useCallback(
    async ({ transactionId }) => {
      try {
        await deleteTransactionAPI({ transactionId });

        const updatedTransactions = await fetchTransactionsAPI();
        setTransactions(updatedTransactions);
      } catch (error) {
        console.error('Transaction delete error:', error);
      }
    },
    [setTransactions]
  );

  return {
    createUpdateTransaction,
    deleteTransaction,
  };
}

export function useTransactionsDrawer() {
  const [isOpen, setIsOpen] = useRecoilState(transactionsDrawerState);
  // const resetCurrentTxn = useResetRecoilState(currentTxnState);

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
