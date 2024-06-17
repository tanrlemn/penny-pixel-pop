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
  }
};

export const updateEnvelopeCategoryAPI = async ({ envelopeId, category }) => {
  try {
    const res = await fetch('/api/envelopes/update/category', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ envelopeId, category }),
    });

    const { data } = await res.json();

    return data;
  } catch (error) {
    console.error('Envelope service update category error:', error);
  }
};

export const createUpdateEnvelopeAPI = async ({
  envelopeId,
  envelope,
  setIsLoading,
}) => {
  try {
    const { envelope_name, budget_amount, category } = envelope;

    envelopeId
      ? await fetch('/api/envelopes/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            envelopeId,
            envelope_name,
            budget_amount,
            category: category,
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
            category: category,
          }),
        });

    setIsLoading(false);
  } catch (error) {
    console.error('Envelope service update/create error:', error);
  } finally {
    setIsLoading(false);
  }
};

export const deleteEnvelopeAPI = async ({ envelopeId }) => {
  try {
    await fetch('/api/envelopes/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        envelopeId,
      }),
    });

    return envelopeId;
  } catch (error) {
    console.error('Envelope service delete error:', error);
    return error;
  }
};
