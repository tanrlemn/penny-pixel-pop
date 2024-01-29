'use client';

// server
import { createClient } from '@/app/_lib/utils/supabase/client';

// recoil
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from 'recoil';

// hooks
import { useEffect, useState } from 'react';
import { useUser } from '@/app/_lib/hooks/useUser';
import { envelopesState } from './useEnvelopes';

export const transactionsState = atom({
  key: 'transactionsState',
  default: null,
});

export const currentTxnState = atom({
  key: 'currentTxnState',
  default: {
    id: null,
    envelope_id: null,
    envelope_name: '',
    amount: 0,
    note: '',
    date: '',
  },
});

export const transactionsDrawerState = atom({
  key: 'transactionsDrawerState',
  default: false,
});

export function useTransactions() {
  const { userData } = useUser();
  const [transactions, setTransactions] = useRecoilState(transactionsState);
  const envelopes = useRecoilValue(envelopesState);
  const [currentTxn, setCurrentTxn] = useRecoilState(currentTxnState);
  const resetTxn = useResetRecoilState(currentTxnState);

  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const getTransactions = async () => {
      if (transactions === null) {
        const res = await fetch('/api/transactions/getTransactions');

        const { data, error } = await res.json();

        if (error) {
          console.error(error);
        }

        setTransactions(data);
        addEnvelopeNames(data);
      }
    };

    const addEnvelopeNames = (data) => {
      if (data !== null && envelopes !== null) {
        const updatedTransactions = data.map((transaction) => {
          const envelope = envelopes.find(
            (envelope) => envelope.id === transaction.envelope_id
          );

          return {
            ...transaction,
            envelope_name: envelope.envelope_name,
          };
        });

        setTransactions(updatedTransactions);
      }
    };

    userData != null && envelopes !== null && getTransactions();

    console.log('currentTxn', currentTxn);
    if (trigger) {
      setTrigger(false);
      setTransactions(null);
    }
  }, [userData, setTransactions, transactions, envelopes, currentTxn, trigger]);

  const createUpdateTxn = async (id, txn, setIsLoading) => {
    console.log(txn);
    const { envelope_name, amount, note, date } = txn;

    const envelope_id = envelopes.find(
      (envelope) => envelope.envelope_name === envelope_name
    ).id;

    id
      ? await fetch('/api/transactions/updateTransaction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id,
            envelope_id,
            amount,
            note,
            date,
          }),
        })
      : await fetch('/api/transactions/createTransaction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            envelope_id,
            amount,
            note,
            date,
          }),
        });

    setTrigger(true);
    setIsLoading(false);
  };

  const deleteTxn = async (id) => {
    await fetch('/api/transactions/deleteTransaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    });

    setTrigger(true);
  };

  return {
    transactions,
    currentTxn,
    setCurrentTxn,
    resetTxn,
    createUpdateTxn,
    deleteTxn,
  };
}

export function useTransactionsDrawer() {
  const [isTxnOpen, setIsTxnOpen] = useRecoilState(transactionsDrawerState);

  const onTxnClose = () => setIsTxnOpen(false);
  const onTxnOpen = () => {
    setIsTxnOpen(true);
  };

  return {
    isTxnOpen,
    onTxnClose,
    onTxnOpen,
  };
}
