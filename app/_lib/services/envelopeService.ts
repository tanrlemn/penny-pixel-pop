export const fetchEnvelopesAPI = async () => {
  try {
    const res = await fetch('/api/envelopes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error('Envelope service fetch error:', error);
    throw new Error(error);
  }
};

export const updateEnvelopeCategoryAPI = async ({ id, category }) => {
  try {
    const res = await fetch('/api/envelopes/update/category', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, category }),
    });

    const { data } = await res.json();

    return data;
  } catch (error) {
    console.error('Envelope service update category error:', error);
    throw new Error(error);
  }
};

export const createUpdateEnvelopeAPI = async ({ envelope }) => {
  try {
    const { envelope_name, budget_amount, category, sheet_id, id } = envelope;

    id
      ? await fetch('/api/envelopes/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id,
            envelope_name,
            budget_amount,
            category,
            sheet_id,
          }),
        })
      : await fetch('/api/envelopes/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            envelope_name,
            budget_amount,
            category,
            sheet_id,
          }),
        });
  } catch (error) {
    console.error('Envelope service update/create error:', error);
    throw new Error(error);
  }
};

export const deleteEnvelopeAPI = async ({ id }) => {
  try {
    await fetch('/api/envelopes/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    });

    return id;
  } catch (error) {
    console.error('Envelope service delete error:', error);
    throw new Error(error);
  }
};
