// recoil
import { useRecoilValue, useResetRecoilState, useRecoilState } from 'recoil';
import {
  sheetsState,
  currentSheetState,
  userState,
  sheetDrawerState,
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

// chakra-ui
import { useToast } from '@chakra-ui/react';
import { updateUserProfileAPI } from '../services/userService';

export function useSheets() {
  const toast = useToast();

  const user = useRecoilValue(userState);
  const profile = useRecoilValue(userProfileSelector);
  const [sheets, setSheets] = useRecoilState(sheetsState);

  const [currentSheet, setCurrentSheet] = useRecoilState(currentSheetState);

  const [loading, setLoading] = useState(true);

  const setCurrentUserSheet = useCallback(
    async ({ id }) => {
      console.log('setting user current sheet', id);
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
    const fetchSheets = async () => {
      if (!user || !profile) return;
      console.log('fetching sheets');
      const data = await fetchSheetsAPI();

      setCurrentSheet(
        await fetchSingleSheetAPI({
          id: profile.current_sheet_id
            ? profile.current_sheet_id
            : await setCurrentUserSheet({ id: data[0].id }),
        })
      );
      setSheets(data);

      setLoading(false);
    };

    !sheets && fetchSheets();
  }, [user, setSheets, sheets, profile, setCurrentSheet, setCurrentUserSheet]);

  const resetCurrentSheet = useResetRecoilState(currentSheetState);

  const createUpdateSheet = useCallback(
    async ({ id, sheet }) => {
      setLoading(true);
      try {
        const newSheet = new Promise((resolve, reject) => {
          createUpdateSheetAPI({
            id,
            sheet,
          })
            .then(async () => {
              const data = await fetchSheetsAPI();
              setSheets(data);
              resolve(data);
            })
            .catch((error) => reject(error))
            .finally(() => setLoading(false));
        });

        resetCurrentSheet();

        toast.promise(newSheet, {
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

        await setCurrentUserSheet({ id: sheet.id });

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
    [resetCurrentSheet, setSheets, toast, setCurrentUserSheet]
  );

  const deleteSheet = useCallback(
    async ({ id }) => {
      try {
        const deletedSheet = new Promise((resolve, reject) => {
          deleteSheetAPI({ id })
            .then(async () => {
              const updateSheets = await fetchSheetsAPI();
              setSheets(updateSheets);

              resetCurrentSheet();
              resolve(updateSheets);
            })
            .catch((error) => reject(error));
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

        if (currentSheet.id === id) {
          await setCurrentUserSheet({ id: sheets[0].id });
        }

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
      resetCurrentSheet,
      setSheets,
      toast,
      setCurrentUserSheet,
      currentSheet,
      sheets,
    ]
  );

  return {
    sheets,
    currentSheet,
    setCurrentSheet,
    createUpdateSheet,
    deleteSheet,
    loading,
    setCurrentUserSheet,
  };
}

export function useSheetDrawer() {
  const [isOpen, setIsOpen] = useRecoilState(sheetDrawerState);
  const resetCurrentSheet = useResetRecoilState(currentSheetState);

  const onClose = () => {
    setIsOpen(false);
    resetCurrentSheet();
  };
  const onOpen = () => {
    console.log('opening sheet drawer');
    setIsOpen(true);
  };

  return {
    isOpen,
    onClose,
    onOpen,
  };
}
