// recoil
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

// hooks
import { useEffect, useState, useCallback } from 'react';

// services
import {
  createUpdateEnvelopeAPI,
  deleteEnvelopeAPI,
  updateEnvelopeCategoryAPI,
  fetchEnvelopesAPI,
} from '../services/envelopeService';

// chakra-ui
import { useToast } from '@chakra-ui/react';

export function useEnvelopes() {
  const toast = useToast();

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

        toast({
          title: 'Category updated',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Envelope update category error:', error);

        toast({
          title: 'Category updated failed',
          description:
            'There was an error updating the envelope category. Please try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [resetCurrentEnvelope, setEnvelopes, toast]
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

        toast({
          title: `Envelope ${envelopeId ? 'updated' : 'created'}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Envelope update/create error:', error);
        toast({
          title: `Envelope ${envelopeId ? 'update' : 'create'} failed`,
          description: `There was an error ${
            envelopeId ? 'updating' : 'creating'
          } the envelope. Please try again.`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [resetCurrentEnvelope, setEnvelopes, toast]
  );

  const deleteEnvelope = useCallback(
    async ({ envelopeId }) => {
      try {
        await deleteEnvelopeAPI({ envelopeId });

        const updateEnvelopes = await fetchEnvelopesAPI();
        setEnvelopes(updateEnvelopes);

        resetCurrentEnvelope();

        toast({
          title: 'Envelope deleted',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Envelope delete error:', error);

        toast({
          title: 'Envelope delete failed',
          description:
            'There was an error deleting the envelope. Please try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    },
    [resetCurrentEnvelope, setEnvelopes, toast]
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
