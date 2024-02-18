// Define a selector to derive a simplified user profile
import { selector } from 'recoil';
import {
  profileState,
  transactionsState,
  envelopesState,
  currentTxnState,
} from './atoms';
import { categories } from './constants';

// auth selectors
export const userProfileSelector = selector({
  key: 'userProfileSelector',
  get: ({ get }) => {
    const profile = get(profileState);
    return profile ? { name: profile.name, email: profile.email } : null;
  },
});

// envelope selectors
export const enrichedEnvelopesSelector = selector({
  key: 'enrichedEnvelopesSelector',
  get: ({ get }) => {
    const transactions = get(transactionsState);
    const envelopes = get(envelopesState);

    if (!transactions || !envelopes) return null;

    const enrichedEnvelopes = envelopes
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

    if (!transactions || !envelopes) return null;
    if (transactions.length === 0 || envelopes.length === 0)
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
      .filter((txn) => !txn.isIncome)
      .reduce((acc, cur) => acc + cur.amount, 0);

    const totalIncome = transactions
      .filter((txn) => txn.isIncome)
      .reduce((acc, cur) => acc + cur.amount, 0);

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

    if (!transactions || !envelopes) return null;
    if (transactions.length === 0 || envelopes.length === 0) return [];

    const incomeEnvelopes = envelopes.filter(
      (env) => env.category === 'Income'
    );

    return transactions
      .map((txn) => ({
        ...txn,
        envelope_name:
          envelopes.find((env) => env.id === txn.envelope_id)?.envelope_name ||
          'Unknown',
        isIncome: incomeEnvelopes.some((env) => env.id === txn.envelope_id),
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  },
});

export const currentTransactionSelector = selector({
  key: 'currentTransactionSelector',
  get: ({ get }) => {
    const currentTxn = get(currentTxnState);
    const envelopes = get(envelopesState);

    if (!currentTxn || !envelopes) return null;

    return {
      ...currentTxn,
      envelope_id: envelopes.find(
        (env) => env.envelope_name === currentTxn.envelope_name
      )?.id,
    };
  },
});
