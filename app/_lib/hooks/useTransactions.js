'use client';

// server
import { createClient } from '@/app/_lib/utils/supabase/client';

// recoil
import { atom, useRecoilState, useRecoilValue } from 'recoil';

// hooks
import { useEffect } from 'react';
import { useUser } from '@/app/_lib/hooks/useUser';

export const transactionsState = atom({
  key: 'transactionsState',
  default: null,
});

export function useTransactions() {
  const { userData } = useUser();
  const [transactions, setTransactions] = useRecoilState(transactionsState);

  useEffect(() => {
    const getTransactions = async () => {
      if (transactions === null) {
        const res = await fetch('/api/transactions/getTransactions');

        const { data, error } = await res.json();

        if (error) {
          console.error(error);
        }

        setTransactions(data);
      }
    };

    userData != null && getTransactions();
  }, [userData, setTransactions, transactions]);

  return { transactions };
}
