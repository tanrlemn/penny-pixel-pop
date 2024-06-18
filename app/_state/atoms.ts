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
export const sheetsState = atom({
  key: 'sheetsState',
  default: null,
});

export const activeSheetState = atom({
  key: 'activeSheetState',
  default: {
    id: null,
    title: '',
    start_date: null,
    end_date: null,
  },
});

export const currentUserSheetState = atom({
  key: 'currentUserSheetState',
  default: {
    id: null,
    title: '',
    start_date: null,
    end_date: null,
  },
});

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
    sheet_id: null,
  },
});

export const transactionsState = atom({
  key: 'transactionsState',
  default: null,
});

export const currentTransactionState = atom({
  key: 'currentTransactionState',
  default: {
    id: null,
    envelope_id: null,
    envelope_name: '',
    amount: 0,
    note: '',
    date: new Date(),
    sheet_id: null,
  },
});

// ui atoms
export const loadingAuthState = atom({
  key: 'loadingAuthState',
  default: true,
});

export const loadingSheetsState = atom({
  key: 'loadingSheetsState',
  default: false,
});

export const loadingEnvelopesState = atom({
  key: 'loadingEnvelopesState',
  default: true,
});

export const loadingSingleEnvelopeState = atom({
  key: 'loadingSingleEnvelopeState',
  default: null,
});

export const loadingTransactionsState = atom({
  key: 'loadingTransactionsState',
  default: true,
});

export const sheetDrawerState = atom({
  key: 'sheetDrawerState',
  default: false,
});

export const transactionDrawerState = atom({
  key: 'transactionDrawerState',
  default: false,
});

export const envelopeDrawerState = atom({
  key: 'envelopeDrawerState',
  default: false,
});
