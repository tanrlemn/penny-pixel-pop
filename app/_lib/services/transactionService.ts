export const fetchTransactionsAPI = async () => {
  try {
    const res = await fetch('/api/transactions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error('Transaction fetch error:', error);
    throw new Error(error);
  }
};

export const createUpdateTransactionAPI = async ({ transaction }) => {
  const { envelope_id, amount, note, date, sheet_id, id } = transaction;

  try {
    const updatedTransactions = id
      ? await fetch('/api/transactions/update', {
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
            sheet_id,
          }),
        })
      : await fetch('/api/transactions/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            envelope_id,
            amount,
            note,
            date,
            sheet_id,
          }),
        });

    return updatedTransactions.json();
  } catch (error) {
    console.error('Transaction update/create error:', error);
    throw new Error(error);
  }
};

export const deleteTransactionAPI = async ({ id }) => {
  try {
    const data = await fetch('/api/transactions/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    });

    return data.json();
  } catch (error) {
    console.error('Transaction delete error:', error);
    throw new Error(error);
  }
};
