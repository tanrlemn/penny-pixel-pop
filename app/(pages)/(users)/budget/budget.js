'use client';

// recoil
import { atom, useRecoilState } from 'recoil';

// hooks
import { useEffect } from 'react';
import { useEnvelopes, useEnvelopeDrawer } from '@/app/_lib/hooks/useEnvelopes';

// chakra-ui
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Table,
  TableContainer,
} from '@chakra-ui/react';

// local components
import CategoryList from './categoryList';
import LoadingDiv from '../../../_components/interactive/loadingDiv';

const isloadingState = atom({
  key: 'isLoadingState',
  default: true,
});

export default function Budget() {
  const { onOpen } = useEnvelopeDrawer();
  const [isLoading, setIsLoading] = useRecoilState(isloadingState);
  const { categoryList } = useEnvelopes();

  useEffect(() => {
    if (categoryList) {
      setIsLoading(false);
    }
  }, [categoryList, setIsLoading]);

  return (
    <Box mt={'1rem'}>
      <Container>
        <Heading mb={'1rem'}>Budget</Heading>
        <Flex
          borderBottom={'1px solid'}
          borderBottomColor={'gray.200'}
          p={'0.5rem 0'}
          justify={'space-between'}
          align={'center'}>
          <Heading size={'sm'}>All envelopes</Heading>
          <Button
            onClick={() => onOpen()}
            colorScheme={'blue'}
            size={'xs'}>
            + New Envelope
          </Button>
        </Flex>
      </Container>
      <TableContainer
        pt={'1rem'}
        pl={'1rem'}>
        {isLoading && (
          <LoadingDiv
            id={'budget'}
            isLoading={isLoading}
          />
        )}
        {categoryList &&
          categoryList.map((category) => {
            return (
              <CategoryList
                key={category.name}
                name={category.name}
                envelopes={category.envelopes}
                color={category.color}
              />
            );
          })}
      </TableContainer>
    </Box>
  );
}
