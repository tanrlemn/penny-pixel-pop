export const fetchSheetsAPI = async () => {
  try {
    const res = await fetch('/api/sheets', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error('Sheet service fetch error:', error);
    throw new Error(error);
  }
};

export const fetchSingleSheetAPI = async ({ id }) => {
  if (!id) return null;
  try {
    const res = await fetch(`/api/sheets/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error('Sheet service fetch error:', error);
    throw new Error(error);
  }
};

export const createUpdateSheetAPI = async ({ id, sheet }) => {
  console.log('createUpdateSheetAPI', id, sheet);
  try {
    const { title, start_date, end_date } = sheet;
    const updated_at = new Date().toISOString();

    const res = id
      ? await fetch('/api/sheets/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id,
            title,
            start_date,
            end_date,
            updated_at,
          }),
        })
      : await fetch('/api/sheets/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            start_date,
            end_date,
            updated_at,
          }),
        });

    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error('Sheet service update/create error:', error);
    throw new Error(error);
  }
};

export const deleteSheetAPI = async ({ id }) => {
  try {
    await fetch('/api/sheets/delete', {
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
    console.error('Sheet service delete error:', error);
    throw new Error(error);
  }
};
