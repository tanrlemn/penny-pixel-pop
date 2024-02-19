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
        const updatedEnvelope = new Promise((resolve, reject) => {
          updateEnvelopeCategoryAPI({
            envelopeId,
            category,
          })
            .then(() => setTimeout(() => resolve(200), 1000))
            .then(async () => {
              const data = await fetchEnvelopesAPI();
              setEnvelopes(data);
            })
            .catch((error) => reject(error));
        });

        resetCurrentEnvelope();

        toast.promise(updatedEnvelope, {
          success: {
            position: 'top',
            title: 'Category updated',
            duration: 3000,
            isClosable: true,
          },
          loading: {
            position: 'top',
            title: 'Updating category...',
          },
          error: {
            position: 'top',
            title: 'Category updated failed',
            description:
              'There was an error updating the envelope category. Please try again.',
            duration: 3000,
            isClosable: true,
          },
        });
      } catch (error) {
        console.error('Envelope update category error:', error);

        toast({
          position: 'top',
          title: 'Category updated failed',
          description:
            'There was an error updating the envelope category. Please try again.',
          status: 'error',
          duration: 3000,
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
        const newEnvelope = envelopeId
          ? new Promise((resolve, reject) => {
              createUpdateEnvelopeAPI({
                envelopeId,
                envelope,
                setIsLoading,
              })
                .then(() => setTimeout(() => resolve(200), 1000))
                .then(async () => {
                  const data = await fetchEnvelopesAPI();
                  setEnvelopes(data);
                })
                .catch((error) => reject(error));
            })
          : new Promise((resolve, reject) => {
              createUpdateEnvelopeAPI({
                envelope,
                setIsLoading,
              })
                .then(() =>
                  setTimeout(() => {
                    resolve(200);
                  }, 1000)
                )
                .then(async () => {
                  const data = await fetchEnvelopesAPI();
                  setEnvelopes(data);
                })
                .catch((error) => reject(error));
            });

        resetCurrentEnvelope();

        toast.promise(newEnvelope, {
          success: {
            position: 'top',
            title: `Envelope ${envelopeId ? 'updated' : 'created'}`,
            duration: 3000,
            isClosable: true,
          },
          loading: {
            position: 'top',
            title: `Saving envelope...`,
          },
          error: {
            position: 'top',
            title: `Envelope ${envelopeId ? 'update' : 'create'} failed`,
            description: `There was an error ${
              envelopeId ? 'updating' : 'creating'
            } the envelope. Please try again.`,
            duration: 3000,
            isClosable: true,
          },
        });
      } catch (error) {
        console.error('Envelope update/create error:', error);
        toast({
          position: 'top',
          title: `Envelope ${envelopeId ? 'update' : 'create'} failed`,
          description: `There was an error ${
            envelopeId ? 'updating' : 'creating'
          } the envelope. Please try again.`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [resetCurrentEnvelope, setEnvelopes, toast]
  );

  const deleteEnvelope = useCallback(
    async ({ envelopeId, setIsLoading }) => {
      try {
        const deletedEnvelope = new Promise((resolve, reject) => {
          deleteEnvelopeAPI({ envelopeId })
            .then(() => setTimeout(() => resolve(200), 1000))
            .then(async () => {
              const updateEnvelopes = await fetchEnvelopesAPI();
              setEnvelopes(updateEnvelopes);

              resetCurrentEnvelope();
            })
            .catch((error) => reject(error));
        });

        toast.promise(deletedEnvelope, {
          success: {
            position: 'top',
            title: 'Envelope deleted',
            duration: 3000,
            isClosable: true,
          },
          loading: {
            position: 'top',
            title: 'Deleting envelope...',
          },
          error: {
            position: 'top',
            title: 'Envelope delete failed',
            description:
              'There was an error deleting the envelope. Please try again.',
            duration: 3000,
            isClosable: true,
          },
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Envelope delete error:', error);

        toast({
          position: 'top',
          title: 'Envelope delete failed',
          description:
            'There was an error deleting the envelope. Please try again.',
          status: 'error',
          duration: 3000,
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
