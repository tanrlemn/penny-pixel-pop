// recoil
import {
  useRecoilValue,
  useResetRecoilState,
  useRecoilState,
  useSetRecoilState,
} from 'recoil';
import {
  envelopesState,
  envelopeDrawerState,
  currentEnvelopeState,
  userState,
  sheetsState,
  currentUserSheetState,
  loadingEnvelopesState,
  loadingSingleEnvelopeState,
} from '@/app/_state/atoms';

// hooks
import { useEffect, useCallback } from 'react';

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
  const currentUserSheet = useRecoilValue(currentUserSheetState);
  const [envelopes, setEnvelopes] = useRecoilState(envelopesState);

  const [loading, setLoading] = useRecoilState(loadingEnvelopesState);
  const setLoadingSingleEnvelope = useSetRecoilState(
    loadingSingleEnvelopeState
  );

  useEffect(() => {
    const fetchEnvelopes = async () => {
      if (!user || !sheets || !currentUserSheet) return;
      setLoading(true);
      console.log('fetching envelopes');
      const data = await fetchEnvelopesAPI();
      const filteredEnvelopes = data.filter(
        (envelope) => envelope.sheet_id === currentUserSheet.id
      );
      setEnvelopes(filteredEnvelopes);
      setLoading(false);
    };

    !envelopes && fetchEnvelopes();
  }, [user, setEnvelopes, envelopes, sheets, currentUserSheet, setLoading]);

  const resetCurrentEnvelope = useResetRecoilState(currentEnvelopeState);

  const updateEnvelopeCategory = useCallback(
    async ({ id, category }) => {
      setLoading(true);
      try {
        const updatedEnvelope = new Promise((resolve, reject) => {
          updateEnvelopeCategoryAPI({
            id,
            category,
          });
        });

        updatedEnvelope
          .then(async () => {
            const data = await fetchEnvelopesAPI();
            setEnvelopes(data);
          })
          .catch((error) => {
            console.error('Envelope update category error:', error);
            throw error;
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
        setLoading(false);
        setLoadingSingleEnvelope(null);
      }
    },
    [
      resetCurrentEnvelope,
      setEnvelopes,
      toast,
      setLoading,
      setLoadingSingleEnvelope,
    ]
  );

  const createUpdateEnvelope = useCallback(
    async ({ envelope }) => {
      setLoading(true);
      const { id } = envelope;
      try {
        const newEnvelope = id
          ? new Promise((resolve, reject) => {
              resolve(
                createUpdateEnvelopeAPI({
                  envelope,
                })
              );
            })
          : new Promise((resolve, reject) => {
              resolve(
                createUpdateEnvelopeAPI({
                  envelope,
                })
              );
            });

        newEnvelope
          .then(async () => {
            const data = await fetchEnvelopesAPI();
            setEnvelopes(data);
          })
          .catch((error) => {
            console.error('Envelope update/create error:', error);
            throw error;
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
        setLoading(false);
      }
    },
    [resetCurrentEnvelope, setEnvelopes, toast, setLoading]
  );

  const deleteEnvelope = useCallback(
    async ({ id }) => {
      try {
        setLoading(true);
        const deletedEnvelope = new Promise((resolve, reject) => {
          resolve(deleteEnvelopeAPI({ id }));
        });

        deletedEnvelope
          .then(async () => {
            const updateEnvelopes = await fetchEnvelopesAPI();
            setEnvelopes(updateEnvelopes);

            resetCurrentEnvelope();
          })
          .catch((error) => {
            console.error('Envelope delete error:', error);
            throw error;
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

        setLoading(false);
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
    [resetCurrentEnvelope, setEnvelopes, toast, setLoading]
  );

  return {
    updateEnvelopeCategory,
    createUpdateEnvelope,
    deleteEnvelope,
    loading,
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
