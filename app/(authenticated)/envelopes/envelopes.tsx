'use client';

// recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  envelopeCategoriesSelector,
  envelopeTotalsSelector,
} from '@/app/_state/selectors';
import { loadingEnvelopesState } from '@/app/_state/atoms';

// hooks
import { useEnvelopeDrawer } from '@/app/_lib/hooks/envelopes';

// chakra-ui
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  TableContainer,
} from '@chakra-ui/react';

// local components
import CategoryList from './categoryList';
import Totals from './totals';
import LoadingDiv from '@/app/_components/interactive/loadingDiv';
import SheetSelect from '../sheets/sheetSelect';

export default function Envelopes() {
  const { onOpen } = useEnvelopeDrawer();
  const loading = useRecoilValue(loadingEnvelopesState);
  const categoryList = useRecoilValue(envelopeCategoriesSelector);
  const totals = useRecoilValue(envelopeTotalsSelector);

  return (
    <Box h={'fit-content'} mt={'1rem'} mb={'5rem'}>
      <Container maxW={{ base: '100vw', md: '700px' }} p={'0.5rem'}>
        <SheetSelect />
        <Heading mb={'1rem'}>Envelopes</Heading>
        <Flex
          position={'sticky'}
          zIndex={10}
          bg={'white'}
          top={'0'}
          borderBottom={'1px solid'}
          borderBottomColor={'gray.200'}
          p={'0.5rem 0'}
          justify={'space-between'}
          align={'center'}
        >
          <Flex align={'center'} gap={'0.5rem'}>
            <Heading size={'sm'}>All envelopes</Heading>
          </Flex>
          {categoryList && (
            <Button onClick={() => onOpen()} colorScheme={'orange'} size={'xs'}>
              + New Envelope
            </Button>
          )}
        </Flex>
        <TableContainer pt={'1rem'} zIndex={100}>
          {loading && (
            <Box m={'0 auto'}>
              <LoadingDiv id={'budget'} isLoading={loading} />
            </Box>
          )}
          {categoryList &&
            categoryList.map((category) => {
              return <CategoryList key={category.name} category={category} />;
            })}
          {totals && (
            <>
              <Totals totals={totals} title={'Budgeted'} color={'gray'} />
              <Totals totals={totals} title={'Actual'} color={'red'} />
            </>
          )}
        </TableContainer>
      </Container>
    </Box>
  );
}
