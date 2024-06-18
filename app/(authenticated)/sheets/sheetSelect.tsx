'use client';

// recoil
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { sheetsState, currentSheetState } from '@/app/_state/atoms';
import { currentSheetStringSelector } from '@/app/_state/selectors';

// hooks
import { useSheets } from '@/app/_lib/hooks/useSheets';

// utils
import { format } from 'date-fns';

// chakra-ui
import { Flex, Select, Skeleton, Tag, Text } from '@chakra-ui/react';

export default function SheetSelect() {
  const sheets = useRecoilValue(sheetsState);
  const { setCurrentUserSheet } = useSheets();
  const setCurrentSheet = useSetRecoilState(currentSheetState);
  const currentSheetString = useRecoilValue(currentSheetStringSelector);

  return (
    <>
      <Flex align={'center'} gap={'0.2rem'}>
        <Text fontSize={'0.8rem'} fontWeight={500}>
          Sheet:
        </Text>{' '}
        <Skeleton
          isLoaded={sheets}
          h={'2rem'}
          w={'7rem'}
          minH={'fit-content'}
          minW={'fit-content'}
          borderRadius={'md'}
          speed={1.5}
          startColor={'gray.50'}
          endColor={'gray.200'}
        >
          {sheets && (
            <Tag size={'sm'} colorScheme={'purple'} maxW={'fit-content'} p={0}>
              <Select
                borderRadius={'md'}
                size={'sm'}
                onChange={(e) => {
                  setCurrentSheet(sheets.find((s) => s.id === e.target.value));
                  setCurrentUserSheet({ id: e.target.value });
                }}
                defaultValue={currentSheetString || 'Select a sheet'}
                maxW={'fit-content'}
                border={'none'}
              >
                <option value={'Select a sheet'} disabled={true}>
                  Select a sheet
                </option>
                {sheets.map((s) => {
                  const sheetString = `${s.title}, ${format(
                    s.start_date,
                    'MMM d'
                  )}-${format(s.end_date, 'MMM d')}`;
                  return (
                    <option key={s.title} value={s.id}>
                      {sheetString}
                    </option>
                  );
                })}
              </Select>
            </Tag>
          )}
        </Skeleton>
      </Flex>
    </>
  );
}
