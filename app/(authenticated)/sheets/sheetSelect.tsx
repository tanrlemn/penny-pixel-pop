'use client';

// recoil
import { useRecoilValue } from 'recoil';
import { sheetsState, currentUserSheetState } from '@/app/_state/atoms';

// hooks
import { useSheets } from '@/app/_lib/hooks/sheets';

// chakra-ui
import { Flex, Select, Tag, Text } from '@chakra-ui/react';

export default function SheetSelect() {
  const sheets = useRecoilValue(sheetsState);
  const { handleChangeCurrentUserSheet } = useSheets();
  const currentUserSheet = useRecoilValue(currentUserSheetState);

  return (
    <>
      <Flex align={'center'} gap={'0.5rem'} mb={'1rem'}>
        <Text fontSize={'0.8rem'} fontWeight={500}>
          Sheet:
        </Text>
        {sheets && (
          <>
            {sheets.length > 0 && (
              <Tag
                size={'xs'}
                colorScheme={'orange'}
                maxW={'fit-content'}
                p={0}
              >
                <Select
                  borderRadius={'md'}
                  size={'xs'}
                  onChange={(e) => {
                    handleChangeCurrentUserSheet(
                      sheets.find((s) => s.id === e.target.value)
                    );
                  }}
                  value={currentUserSheet.id}
                  maxW={'fit-content'}
                  border={'none'}
                >
                  <option value={'Select a sheet'} disabled={true}>
                    Select a sheet
                  </option>
                  {sheets.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </Select>
              </Tag>
            )}
          </>
        )}
      </Flex>
    </>
  );
}
