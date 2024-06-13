// recoil
import { atom } from 'recoil';

// auth atoms
export const userState = atom({
  key: 'userState',
  default: null,
});

export const profileState = atom({
  key: 'profileState',
  default: null,
});

// budget atoms
export const envelopesState = atom({
  key: 'envelopesState',
  default: null,
});

export const categoryListState = atom({
  key: 'categoryListState',
  default: null,
});

export const currentEnvelopeState = atom({
  key: 'currentEnvelopeState',
  default: {
    id: null,
    envelope_name: '',
    budget_amount: 0,
    category: 'Necessities',
  },
});

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
    date: new Date(),
  },
});

// ui atoms
export const isloadingState = atom({
  key: 'isLoadingState',
  default: true,
});

export const transactionsDrawerState = atom({
  key: 'transactionsDrawerState',
  default: false,
});

export const envelopeDrawerState = atom({
  key: 'newEnvelopeDrawerState',
  default: false,
});
