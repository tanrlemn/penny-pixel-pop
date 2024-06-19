// Define a selector to derive a simplified user profile
import { selector } from 'recoil';
import {
  profileState,
  transactionsState,
  envelopesState,
  currentTransactionState,
  activeSheetState,
  currentUserSheetState,
  currentEnvelopeState,
} from './atoms';
import { categories } from './constants';

// utils
import { format } from 'date-fns';

// auth selectors
export const userProfileSelector = selector({
  key: 'userProfileSelector',
  get: ({ get }) => {
    const profile = get(profileState);
    return profile ? profile : null;
  },
});

// envelope selectors

export const currentEnvelopeSelector = selector({
  key: 'currentEnvelopeSelector',
  get: ({ get }) => {
    const currentUserSheet = get(currentUserSheetState);
    const currentEnvelope = get(currentEnvelopeState);
    const envelopes = get(envelopesState);

    if (!currentEnvelope || !envelopes || !currentUserSheet) return null;

    return {
      ...currentEnvelope,
      sheet_id: currentUserSheet.id,
    };
  },
  set: ({ set, get }, newEnvelope) => {
    const currentUserSheet = get(currentUserSheetState);

    set(currentEnvelopeState, {
      ...newEnvelope,
      sheet_id: currentUserSheet.id,
    });
  },
});

export const enrichedEnvelopesSelector = selector({
  key: 'enrichedEnvelopesSelector',
  get: ({ get }) => {
    const transactions = get(enrichedTransactionsSelector);
    const envelopes = get(envelopesState);
    const currentUserSheet = get(currentUserSheetState);

    if (!transactions || !envelopes || !currentUserSheet) return null;

    const filteredEnvelopes = envelopes.filter(
      (env) => env.sheet_id === currentUserSheet.id
    );

    const enrichedEnvelopes = filteredEnvelopes
      .map((envelope) => {
        const envelopeTransactions = transactions.filter(
          (t) => t.envelope_id === envelope.id
        );
        const totalSpent = envelopeTransactions.reduce(
          (acc, cur) => acc + cur.amount,
          0
        );
        return {
          ...envelope,
          totalSpent,
          amountLeft: envelope.budget_amount - totalSpent,
          isOver: envelope.budget_amount < totalSpent,
        };
      })
      .sort((a, b) => b.amountLeft - a.amountLeft);

    const categorizedEnvelopes = categories.map((category) => ({
      ...category,
      envelopes: enrichedEnvelopes.filter(
        (envelope) => envelope.category === category.name
      ),
      total: enrichedEnvelopes
        .filter((envelope) => envelope.category === category.name)
        .reduce((acc, cur) => acc + cur.budget_amount, 0),
      amountSpent: enrichedEnvelopes
        .filter((envelope) => envelope.category === category.name)
        .reduce((acc, cur) => acc + Number(cur.totalSpent), 0),
      amountLeft: enrichedEnvelopes
        .filter((envelope) => envelope.category === category.name)
        .reduce((acc, cur) => acc + Number(cur.amountLeft), 0),
    }));

    return categorizedEnvelopes;
  },
});

export const envelopeTotalsSelector = selector({
  key: 'envelopeTotalsSelector',
  get: ({ get }) => {
    const transactions = get(enrichedTransactionsSelector);
    const envelopes = get(envelopesState);

    if (!envelopes) return null;
    if (envelopes.length === 0)
      return {
        totalBudgetedIncome: 0,
        totalBudgetedExpenses: 0,
        totalDifference: 0,
        budgetIsNegative: false,
        totalSpent: 0,
        totalIncome: 0,
        totalLeft: 0,
        actualIsNegative: false,
      };

    const incomeEnvelopes = envelopes.filter(
      (env) => env.category === 'Income'
    );

    const totalBudgetedIncome =
      incomeEnvelopes.length > 0
        ? incomeEnvelopes
            .map((env) => env.budget_amount)
            .reduce((a, b) => a + b)
        : 0;

    const expenseEnvelopes = envelopes.filter(
      (env) => env.category !== 'Income'
    );

    const totalBudgetedExpenses = expenseEnvelopes
      ? expenseEnvelopes.map((env) => env.budget_amount).reduce((a, b) => a + b)
      : 0;

    const totalSpent = transactions
      ? transactions
          .filter((t) => !t.isIncome)
          .reduce((acc, cur) => acc + cur.amount, 0)
      : 0;

    const totalIncome = transactions
      ? transactions
          .filter((t) => t.isIncome)
          .reduce((acc, cur) => acc + cur.amount, 0)
      : 0;

    return {
      totalBudgetedIncome,
      totalBudgetedExpenses,
      totalDifference: totalBudgetedIncome - totalBudgetedExpenses,
      budgetIsNegative: totalBudgetedIncome < totalBudgetedExpenses,
      totalSpent,
      totalIncome,
      totalLeft: totalIncome - totalSpent,
      actualIsNegative: totalIncome < totalSpent,
    };
  },
});

// transaction selectors
export const enrichedTransactionsSelector = selector({
  key: 'enrichedTransactions',
  get: ({ get }) => {
    const transactions = get(transactionsState);
    const envelopes = get(envelopesState);
    const currentUserSheet = get(currentUserSheetState);

    if (!transactions || !envelopes || !currentUserSheet) return null;
    if (transactions.length === 0 || envelopes.length === 0) return [];

    const filteredTransactions = transactions.filter(
      (t) => t.sheet_id === currentUserSheet.id
    );

    const incomeEnvelopes = envelopes.filter(
      (env) => env.category === 'Income'
    );

    return filteredTransactions
      .map((t) => ({
        ...t,
        envelope_name:
          envelopes.find((env) => env.id === t.envelope_id)?.envelope_name ||
          'Unknown',
        isIncome: incomeEnvelopes.some((env) => env.id === t.envelope_id),
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },
});

export const currentTransactionSelector = selector({
  key: 'currentTransactionSelector',
  get: ({ get }) => {
    const currentUserSheet = get(currentUserSheetState);
    const currentTransaction = get(currentTransactionState);
    const envelopes = get(envelopesState);

    if (!currentTransaction || !envelopes || !currentUserSheet) return null;

    return {
      ...currentTransaction,
      envelope_id: envelopes.find(
        (env) => env.envelope_name === currentTransaction.envelope_name
      )?.id,
      sheet_id: currentUserSheet.id,
    };
  },
  set: ({ set, get }, newTransaction) => {
    const currentUserSheet = get(currentUserSheetState);

    set(currentTransactionState, {
      ...newTransaction,
      sheet_id: currentUserSheet.id,
    });
  },
});
