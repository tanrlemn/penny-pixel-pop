// Define a selector to derive a simplified user profile
import { selector } from 'recoil';
import {
  profileState,
  transactionsState,
  envelopesState,
  currentTransactionState,
  currentSheetState,
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

// sheet selectors
export const currentSheetStringSelector = selector({
  key: 'currentSheetStringSelector',
  get: ({ get }) => {
    const currentSheet = get(currentSheetState);

    return currentSheet?.id
      ? `${currentSheet.title}, ${format(
          currentSheet.start_date,
          'MMM d'
        )}-${format(currentSheet.end_date, 'MMM d')}`
      : null;
  },
});

// envelope selectors
export const enrichedEnvelopesSelector = selector({
  key: 'enrichedEnvelopesSelector',
  get: ({ get }) => {
    const transactions = get(enrichedTransactionsSelector);
    const envelopes = get(envelopesState);
    const currentSheet = get(currentSheetState);

    if (!transactions || !envelopes || !currentSheet) return null;

    const filteredEnvelopes = envelopes.filter(
      (env) => env.sheet_id === currentSheet.id
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
    const currentSheet = get(currentSheetState);

    if (!transactions || !envelopes || !currentSheet) return null;
    if (transactions.length === 0 || envelopes.length === 0) return [];

    const filteredTransactions = transactions.filter(
      (t) => t.sheet_id === currentSheet.id
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
    const currentSheet = get(currentSheetState);
    const currentTransaction = get(currentTransactionState);
    const envelopes = get(envelopesState);

    if (!currentTransaction || !envelopes || !currentSheet) return null;

    return {
      ...currentTransaction,
      envelope_id: envelopes.find(
        (env) => env.envelope_name === currentTransaction.envelope_name
      )?.id,
      sheet_id: currentSheet.id,
    };
  },
});
