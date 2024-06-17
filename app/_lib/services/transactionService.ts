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
  }
};

export const updateTransactionAPI = async ({ transactionId, transaction }) => {
  const { envelope_id, amount, note, date } = transaction;

  try {
    const updatedTransactions = transactionId
      ? await fetch('/api/transactions/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            transactionId,
            envelope_id,
            amount,
            note,
            date,
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
          }),
        });

    return updatedTransactions.json();
  } catch (error) {
    console.error('Transaction update/create error:', error);
  }
};

export const deleteTransactionAPI = async ({ transactionId }) => {
  try {
    const data = await fetch('/api/transactions/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transactionId,
      }),
    });

    return data.json();
  } catch (error) {
    console.error('Transaction delete error:', error);
  }
};
