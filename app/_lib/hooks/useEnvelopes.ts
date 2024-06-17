// recoil
import { useRecoilValue, useResetRecoilState, useRecoilState } from 'recoil';
import {
  envelopesState,
  envelopeDrawerState,
  currentEnvelopeState,
  userState,
  sheetsState,
  currentSheetState,
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
  const sheets = useRecoilValue(sheetsState);
  const currentSheet = useRecoilValue(currentSheetState);
  const [envelopes, setEnvelopes] = useRecoilState(envelopesState);

  const [currentEnvelope, setCurrentEnvelope] =
    useRecoilState(currentEnvelopeState);

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const fetchEnvelopes = async () => {
      if (!user || !sheets || !currentSheet) return;
      console.log('fetching envelopes');
      const data = await fetchEnvelopesAPI();
      const filteredEnvelopes = data.filter(
        (envelope) => envelope.sheet_id === currentSheet.id
      );
      setEnvelopes(filteredEnvelopes);

      const categorizedEnvelopes = categories.map((category) => ({
        ...category,
        envelopes: filteredEnvelopes.filter(
          (envelope) => envelope.category === category.name
        ),
      }));

      setCategoryList(categorizedEnvelopes);
    };

    !envelopes && fetchEnvelopes();
  }, [user, setEnvelopes, envelopes, sheets, currentSheet]);

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
    async ({ envelope, setIsLoading }) => {
      setIsLoading(true);
      const { id } = envelope;
      try {
        const newEnvelope = id
          ? new Promise((resolve, reject) => {
              createUpdateEnvelopeAPI({
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
            title: `Envelope ${id ? 'updated' : 'created'}`,
            duration: 3000,
            isClosable: true,
          },
          loading: {
            position: 'top',
            title: `Saving envelope...`,
          },
          error: {
            position: 'top',
            title: `Envelope ${id ? 'update' : 'create'} failed`,
            description: `There was an error ${
              id ? 'updating' : 'creating'
            } the envelope. Please try again.`,
            duration: 3000,
            isClosable: true,
          },
        });
      } catch (error) {
        console.error('Envelope update/create error:', error);
        toast({
          position: 'top',
          title: `Envelope ${id ? 'update' : 'create'} failed`,
          description: `There was an error ${
            id ? 'updating' : 'creating'
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
  const onOpen = (category = null) => {
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
