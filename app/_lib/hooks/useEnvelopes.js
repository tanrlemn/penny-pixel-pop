import { useEffect, useState, useCallback } from 'react';
import { useRecoilValue, useResetRecoilState, useRecoilState } from 'recoil';
import {
  envelopesState,
  envelopeNameWidthState,
  budgetAmountWidthState,
  amountSpentWidthState,
  amountLeftWidthState,
  categoryWidthState,
  envelopeDrawerState,
  currentEnvelopeState,
  userState,
} from '@/app/_state/atoms';
import { categories } from '@/app/_state/constants';
import {
  createUpdateEnvelopeAPI,
  deleteEnvelopeAPI,
  updateEnvelopeCategoryAPI,
  fetchEnvelopesAPI,
} from '../services/envelopeService';

export function useEnvelopes() {
  const user = useRecoilValue(userState);
  const [envelopes, setEnvelopes] = useRecoilState(envelopesState);

  const [currentEnvelope, setCurrentEnvelope] =
    useRecoilState(currentEnvelopeState);

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const fetchEnvelopes = async () => {
      if (!user) return;
      const data = await fetchEnvelopesAPI();
      setEnvelopes(data);

      const categorizedEnvelopes = categories.map((category) => ({
        ...category,
        envelopes: data.filter(
          (envelope) => envelope.category === category.name
        ),
      }));

      setCategoryList(categorizedEnvelopes);
    };

    envelopes === null && fetchEnvelopes();
  }, [user, setEnvelopes, envelopes]);

  const resetCurrentEnvelope = useResetRecoilState(currentEnvelopeState);

  const updateEnvelopeCategory = useCallback(
    async ({ envelopeId, category, setIsLoading }) => {
      setIsLoading(true);
      try {
        await updateEnvelopeCategoryAPI({
          envelopeId,
          category,
        });

        const data = await fetchEnvelopesAPI();
        setEnvelopes(data);

        resetCurrentEnvelope();
      } catch (error) {
        console.error('Envelope update category error:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [resetCurrentEnvelope, setEnvelopes]
  );

  const createUpdateEnvelope = useCallback(
    async ({ envelopeId, envelope, setIsLoading }) => {
      setIsLoading(true);
      try {
        envelopeId
          ? await createUpdateEnvelopeAPI({
              envelopeId,
              envelope,
              setIsLoading,
            })
          : await createUpdateEnvelopeAPI({ envelope, setIsLoading });

        const data = await fetchEnvelopesAPI();
        setEnvelopes(data);

        resetCurrentEnvelope();
      } catch (error) {
        console.error('Envelope update/create error:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [resetCurrentEnvelope, setEnvelopes]
  );

  const deleteEnvelope = useCallback(
    async ({ envelopeId }) => {
      try {
        await deleteEnvelopeAPI({ envelopeId });

        const updateEnvelopes = await fetchEnvelopesAPI();
        setEnvelopes(updateEnvelopes);

        resetCurrentEnvelope();
      } catch (error) {
        console.error('Envelope delete error:', error);
      }
    },
    [resetCurrentEnvelope, setEnvelopes]
  );

  return {
    categoryList,
    updateEnvelopeCategory,
    createUpdateEnvelope,
    deleteEnvelope,
    currentEnvelope,
    setCurrentEnvelope,
    resetCurrentEnvelope,
  };
}

export function useEnvelopeWidths() {
  const [envelopeNameWidth, setEnvelopeNameWidth] = useRecoilState(
    envelopeNameWidthState
  );
  const [budgetAmountWidth, setBudgetAmountWidth] = useRecoilState(
    budgetAmountWidthState
  );
  const [amountSpentWidth, setAmountSpentWidth] = useRecoilState(
    amountSpentWidthState
  );
  const [amountLeftWidth, setAmountLeftWidth] =
    useRecoilState(amountLeftWidthState);
  const [categoryWidth, setCategoryWidth] = useRecoilState(categoryWidthState);

  return {
    envelopeNameWidth,
    setEnvelopeNameWidth,
    budgetAmountWidth,
    setBudgetAmountWidth,
    amountSpentWidth,
    setAmountSpentWidth,
    amountLeftWidth,
    setAmountLeftWidth,
    categoryWidth,
    setCategoryWidth,
  };
}

export function useEnvelopeDrawer() {
  const [isOpen, setIsOpen] = useRecoilState(envelopeDrawerState);
  const resetCurrentEnvelope = useResetRecoilState(currentEnvelopeState);
  const [currentEnvelope, setCurrentEnvelope] =
    useRecoilState(currentEnvelopeState);

  const onClose = () => {
    setIsOpen(false);
    resetCurrentEnvelope();
  };
  const onOpen = (category) => {
    if (category) {
      setCurrentEnvelope({ ...currentEnvelope, category });
    }
    setIsOpen(true);
  };

  return {
    isOpen,
    onClose,
    onOpen,
  };
}
