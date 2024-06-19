// recoil
import { useRecoilValue, useResetRecoilState, useRecoilState } from 'recoil';
import {
  sheetsState,
  currentUserSheetState,
  userState,
  sheetDrawerState,
  loadingSheetsState,
  envelopesState,
  transactionsState,
  activeSheetState,
} from '@/app/_state/atoms';
import { userProfileSelector } from '@/app/_state/selectors';

// hooks
import { useEffect, useState, useCallback } from 'react';

// services
import {
  createUpdateSheetAPI,
  deleteSheetAPI,
  fetchSheetsAPI,
  fetchSingleSheetAPI,
} from '../services/sheetsService';
import {
  fetchEnvelopesAPI,
  createUpdateEnvelopeAPI,
} from '../services/envelopeService';
import {
  fetchTransactionsAPI,
  createUpdateTransactionAPI,
} from '../services/transactionService';
import { updateUserProfileAPI } from '../services/userService';

// chakra-ui
import { useToast } from '@chakra-ui/react';

export function useSheets() {
  const toast = useToast();

  const user = useRecoilValue(userState);
  const profile = useRecoilValue(userProfileSelector);
  const [sheets, setSheets] = useRecoilState(sheetsState);

  const [currentUserSheet, setCurrentUserSheet] = useRecoilState(
    currentUserSheetState
  );
  const resetEnvelopes = useResetRecoilState(envelopesState);
  const resetTransactions = useResetRecoilState(transactionsState);

  const [loading, setLoading] = useRecoilState(loadingSheetsState);

  const updateCurrentUserSheet = useCallback(
    async ({ id }) => {
      console.log('updating user current sheet', id);
      const updatedProfile = {
        ...profile,
        current_sheet_id: id,
      };

      try {
        const updated = await updateUserProfileAPI({
          profile: updatedProfile,
        });

        return updated.current_sheet_id;
      } catch (error) {
        console.error('Error setting user current sheet:', error);
      }
    },
    [profile]
  );

  useEffect(() => {
    const handleNoSheets = async () => {
      if (user && !sheets && !loading) {
        console.log('no sheets, creating');

        const today = new Date();
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(today.getDate() + 30);

        const data = await createUpdateSheetAPI({
          sheet: {
            title: 'Untitled Sheet',
            start_date: today.toISOString(),
            end_date: thirtyDaysFromNow.toISOString(),
          },
        });
        setCurrentUserSheet(await updateCurrentUserSheet({ id: data[0].id }));
        setSheets(data);

        const envelopes = await fetchEnvelopesAPI();
        const transactions = await fetchTransactionsAPI();

        for (const e of envelopes) {
          await createUpdateEnvelopeAPI({
            envelope: {
              ...e,
              sheet_id: data[0].id,
            },
          });
        }

        for (const t of transactions) {
          await createUpdateTransactionAPI({
            transaction: {
              ...t,
              sheet_id: data[0].id,
            },
          });
        }

        return data;
      }
    };

    const fetchSheets = async () => {
      if (!user || !profile || loading) return;
      console.log('fetching sheets');
      setLoading(true);
      const data = await fetchSheetsAPI();

      setCurrentUserSheet(
        data.length > 0
          ? await fetchSingleSheetAPI({
              id: profile.current_sheet_id
                ? profile.current_sheet_id
                : await updateCurrentUserSheet({ id: data[0].id }),
            })
          : await handleNoSheets()
      );
      setSheets(data);
      setLoading(false);
    };

    !sheets && fetchSheets();
  }, [
    user,
    setSheets,
    sheets,
    profile,
    setCurrentUserSheet,
    updateCurrentUserSheet,
    loading,
    setLoading,
  ]);

  const resetCurrentUserSheet = useResetRecoilState(currentUserSheetState);

  const createUpdateSheet = useCallback(
    async ({ id, sheet }) => {
      setLoading(true);
      try {
        const sheetPromise = new Promise((resolve, reject) => {
          resolve(
            createUpdateSheetAPI({
              sheet,
            })
          );
        });

        sheetPromise.then(async (data) => {
          const updateSheets = await fetchSheetsAPI();
          setSheets(updateSheets);

          if (id) {
            const updatedSheet = await fetchSingleSheetAPI({ id });
            setCurrentUserSheet(updatedSheet);
          } else {
            const updatedSheet = await fetchSingleSheetAPI({
              id: await updateCurrentUserSheet({ id: data[0].id }),
            });
            setCurrentUserSheet(updatedSheet);
          }
        });

        resetCurrentUserSheet();

        toast.promise(sheetPromise, {
          success: {
            position: 'top',
            title: `Sheet ${id ? 'updated' : 'created'}`,
            duration: 3000,
            isClosable: true,
          },
          loading: {
            position: 'top',
            title: `Saving sheet...`,
          },
          error: {
            position: 'top',
            title: `Sheet ${id ? 'update' : 'creation'} failed`,
            description: `There was an error ${
              id ? 'updating' : 'creating'
            } the sheet. Please try again.`,
            duration: null,
            isClosable: true,
          },
        });

        setLoading(false);
      } catch (error) {
        console.error('Sheet update/create error:', error);
        toast({
          position: 'top',
          title: `Sheet ${id ? 'update' : 'creation'} failed`,
          description: `There was an error ${
            id ? 'updating' : 'creating'
          } the sheet. Please try again.`,
          status: 'error',
          duration: null,
          isClosable: true,
        });
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    [
      resetCurrentUserSheet,
      setSheets,
      toast,
      updateCurrentUserSheet,
      setLoading,
      setCurrentUserSheet,
    ]
  );

  const deleteSheet = useCallback(
    async ({ id }) => {
      try {
        if (sheets.length === 1) {
          toast({
            position: 'top',
            title: 'Sheet delete failed',
            description:
              'You cannot delete the last sheet. Please create a new sheet before deleting this one.',
            status: 'error',
            duration: null,
            isClosable: true,
          });
          return;
        }
        if (currentUserSheet.id === id) {
          const updatedSheetId = await updateCurrentUserSheet({
            id: sheets.filter((s) => s.id !== currentUserSheet.id)[0].id,
          });
          setCurrentUserSheet(
            await fetchSingleSheetAPI({ id: updatedSheetId })
          );
        }
        const deletedSheet = new Promise((resolve, reject) => {
          resolve(deleteSheetAPI({ id }));
        });

        deletedSheet
          .then(async () => {
            const updateSheets = await fetchSheetsAPI();
            setSheets(updateSheets);
          })
          .catch((error) => {
            console.error('Sheet delete error:', error);
            throw error;
          });

        toast.promise(deletedSheet, {
          success: {
            position: 'top',
            title: 'Sheet deleted',
            duration: 3000,
            isClosable: true,
          },
          loading: {
            position: 'top',
            title: 'Deleting sheet...',
          },
          error: {
            position: 'top',
            title: 'Sheet delete failed',
            description:
              'There was an error deleting the sheet. Please try again.',
            duration: null,
            isClosable: true,
          },
        });

        setLoading(false);
      } catch (error) {
        console.error('Sheet delete error:', error);

        toast({
          position: 'top',
          title: 'Sheet delete failed',
          description:
            'There was an error deleting the sheet. Please try again.',
          status: 'error',
          duration: null,
          isClosable: true,
        });
      }
    },
    [
      setSheets,
      toast,
      updateCurrentUserSheet,
      currentUserSheet,
      sheets,
      setLoading,
      setCurrentUserSheet,
    ]
  );

  const handleChangeCurrentUserSheet = async (sheet) => {
    setCurrentUserSheet(sheet);
    updateCurrentUserSheet({ id: sheet.id });
    resetEnvelopes();
    resetTransactions();
  };

  return {
    createUpdateSheet,
    deleteSheet,
    updateCurrentUserSheet,
    handleChangeCurrentUserSheet,
    loading,
  };
}

export function useSheetDrawer() {
  const [isOpen, setIsOpen] = useRecoilState(sheetDrawerState);
  const resetActiveSheet = useResetRecoilState(activeSheetState);

  const onClose = () => {
    setIsOpen(false);
    resetActiveSheet();
  };
  const onOpen = () => {
    setIsOpen(true);
  };

  return {
    isOpen,
    onClose,
    onOpen,
  };
}
