'use client';

// recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  enrichedEnvelopesSelector,
  envelopeTotalsSelector,
} from '@/app/_state/selectors';
import { isloadingState } from '@/app/_state/atoms';

// hooks
import { useEffect } from 'react';
import { useEnvelopeDrawer } from '@/app/_lib/hooks/useEnvelopes';

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

export default function Envelopes() {
  const { onOpen } = useEnvelopeDrawer();
  const [isLoading, setIsLoading] = useRecoilState(isloadingState);
  const categoryList = useRecoilValue(enrichedEnvelopesSelector);
  const totals = useRecoilValue(envelopeTotalsSelector);

  useEffect(() => {
    if (categoryList) {
      setIsLoading(false);
    }
  }, [categoryList, setIsLoading]);

  return (
    <Box
      mt={'1rem'}
      mb={'5rem'}>
      <Container maxW={'900px'}>
        <Heading mb={'1rem'}>Envelopes</Heading>
        <Flex
          borderBottom={'1px solid'}
          borderBottomColor={'gray.200'}
          p={'0.5rem 0'}
          justify={'space-between'}
          align={'center'}>
          <Heading size={'sm'}>All envelopes</Heading>
          {categoryList && (
            <Button
              onClick={() => onOpen()}
              colorScheme={'blue'}
              size={'xs'}>
              + New Envelope
            </Button>
          )}
        </Flex>
        <TableContainer pt={'1rem'}>
          {isLoading && (
            <Box m={'0 auto'}>
              <LoadingDiv
                id={'budget'}
                isLoading={isLoading}
              />
            </Box>
          )}
          {categoryList &&
            categoryList.map((category) => {
              return (
                <CategoryList
                  key={category.name}
                  category={category.name}
                  envelopes={category.envelopes}
                  color={category.color}
                />
              );
            })}
          {totals && (
            <>
              <Totals
                totals={totals}
                title={'Budgeted'}
                color={'gray'}
              />
              <Totals
                totals={totals}
                title={'Actual'}
                color={'red'}
              />
            </>
          )}
        </TableContainer>
      </Container>
    </Box>
  );
}
