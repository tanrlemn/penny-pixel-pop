'use client';

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
import { useTransactions } from '@/app/_lib/hooks/useTransactions';

export const envelopesState = atom({
  key: 'envelopesState',
  default: null,
});

export const categoryListState = atom({
  key: 'categoryListState',
  default: null,
});

const currentEnvelopeState = atom({
  key: 'currentEnvelopeState',
  default: {
    id: null,
    envelope_name: '',
    budget_amount: 0,
    category: 'Necessities',
  },
});

export const categories = [
  { name: 'Necessities', color: 'yellow' },
  { name: 'Pressing', color: 'orange' },
  { name: 'Savings', color: 'purple' },
  { name: 'Discretionary', color: 'blue' },
  { name: 'Income', color: 'green' },
];

export function useEnvelopes() {
  const { userData } = useUser();
  const { transactions } = useTransactions();
  const [envelopes, setEnvelopes] = useRecoilState(envelopesState);
  const [categoryList, setCategoryList] = useRecoilState(categoryListState);
  const [currentEnvelope, setCurrentEnvelope] =
    useRecoilState(currentEnvelopeState);
  const resetEnvelope = useResetRecoilState(currentEnvelopeState);

  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const getEnvelopes = async () => {
      if (envelopes === null) {
        const res = await fetch('/api/envelopes/getEnvelopes');

        const { data, error } = await res.json();

        if (error) {
          console.error(error);
        }

        const formattedData = data.map((envelope) => {
          return {
            ...envelope,
            transactions: [],
            totalSpent: 0,
            amountLeft: envelope.budget_amount,
          };
        });

        setEnvelopes(formattedData);
      }
    };

    const getCategoryList = async () => {
      const envelopesWithTransactions = envelopes.map((envelope) => {
        if (transactions === null) {
          return {
            ...envelope,
            transactions: [],
            totalSpent: 0,
            amountLeft: envelope.budget_amount,
          };
        }

        const transactionsForEnvelope = transactions.filter(
          (transaction) => transaction.envelope_id === envelope.id
        );

        const totalSpent = transactionsForEnvelope.reduce(
          (acc, transaction) => acc + transaction.amount,
          0
        );

        const amountLeft = envelope.budget_amount - totalSpent;

        return {
          ...envelope,
          transactions: transactionsForEnvelope,
          totalSpent,
          amountLeft,
        };
      });

      const list = categories.map((category) => {
        return {
          name: category.name,
          envelopes: envelopesWithTransactions.filter(
            (envelope) => envelope.category === category.name
          ),
          color: category.color,
        };
      });
      setCategoryList(
        list.sort(
          (a, b) => (a.envelopes.length === 0) - (b.envelopes.length === 0)
        )
      );
    };

    userData !== null && envelopes === null && getEnvelopes();
    envelopes !== null &&
      transactions !== null &&
      categoryList === null &&
      getCategoryList();

    if (trigger) {
      setTrigger(false);
      setEnvelopes(null);
      setCategoryList(null);
    }
  }, [
    currentEnvelope,
    envelopes,
    setEnvelopes,
    userData,
    setCategoryList,
    transactions,
    categoryList,
    trigger,
  ]);

  const updateEnvelopeCategory = async (envelopeId, category) => {
    await fetch('/api/envelopes/updateEnvelopeCategory', {
      method: 'POST',
      body: JSON.stringify({
        envelopeId,
        category,
      }),
    });

    setTrigger(true);
  };

  const createUpdateNewEnvelope = async (id, newEnvelope, setIsLoading) => {
    const { envelope_name, budget_amount } = newEnvelope;

    id
      ? await fetch('/api/envelopes/updateEnvelope', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id,
            envelope_name,
            budget_amount,
            category: currentEnvelope.category,
          }),
        })
      : await fetch('/api/envelopes/createEnvelope', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            envelope_name,
            budget_amount,
            category: currentEnvelope.category,
          }),
        });

    setTrigger(true);
    setIsLoading(false);
  };

  const deleteEnvelope = async (id) => {
    await fetch('/api/envelopes/deleteEnvelope', {
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
    envelopes,
    categoryList,
    updateEnvelopeCategory,
    createUpdateNewEnvelope,
    deleteEnvelope,
    currentEnvelope,
    setCurrentEnvelope,
    resetEnvelope,
  };
}

export const envelopeNameWidthState = atom({
  key: 'envelopeNameWidthState',
  default: 0,
});

export const budgetAmountWidthState = atom({
  key: 'budgetAmountWidthState',
  default: 0,
});

export const amountSpentWidthState = atom({
  key: 'amountSpentWidthState',
  default: 0,
});

export const amountLeftWidthState = atom({
  key: 'amountLeftWidthState',
  default: 0,
});

export const categoryWidthState = atom({
  key: 'categoryWidthState',
  default: 0,
});

export function useEnvelopeWidths() {
  const [envelopeNameWidth, setEnvelopeNameWidth] = useRecoilState(
    envelopeNameWidthState
  );
  const [budgetAmountWidth, setBudgetAmountWidth] = useRecoilState(
    budgetAmountWidthState
  );
  const [amountSpentWidth, setAmountSpentWidth] = useRecoilState(
    amountSpentWidthState
  );
  const [amountLeftWidth, setAmountLeftWidth] =
    useRecoilState(amountLeftWidthState);
  const [categoryWidth, setCategoryWidth] = useRecoilState(categoryWidthState);

  return {
    envelopeNameWidth,
    setEnvelopeNameWidth,
    budgetAmountWidth,
    setBudgetAmountWidth,
    amountSpentWidth,
    setAmountSpentWidth,
    amountLeftWidth,
    setAmountLeftWidth,
    categoryWidth,
    setCategoryWidth,
  };
}

export const newEnvelopeDrawerState = atom({
  key: 'newEnvelopeDrawerState',
  default: false,
});

export function useEnvelopeDrawer() {
  const [isOpen, setIsOpen] = useRecoilState(newEnvelopeDrawerState);

  const onClose = () => setIsOpen(false);
  const onOpen = () => {
    setIsOpen(true);
  };

  return {
    isOpen,
    onClose,
    onOpen,
  };
}
