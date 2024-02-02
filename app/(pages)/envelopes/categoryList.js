// hooks
import { useEnvelopeDrawer } from '@/app/_lib/hooks/useEnvelopes';

// chakra-ui
import {
  Box,
  Flex,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

// local components
import EnvelopeItem from './envelopeItem';

export default function CategoryList({ category, envelopes, color }) {
  const { onOpen } = useEnvelopeDrawer();
  return (
    <Box
      m={'0 auto'}
      mb={'1rem'}
      p={'1rem 0'}
      w={'max-content'}>
      <Flex
        mb={'1rem'}
        position={'sticky'}
        maxW={'fit-content'}
        left={'0'}
        align={'center'}
        gap={'1rem'}>
        <Tag
          size={'sm'}
          colorScheme={color}>
          {category}
        </Tag>
        <Text fontSize={'0.75rem'}>
          {envelopes.length} envelope
          {envelopes.length === 0 || envelopes.length > 1 ? 's' : ''}
        </Text>
      </Flex>
      <Table
        variant='simple'
        size={'sm'}>
        <Thead
          fontSize={'0.8rem'}
          color={'gray.500'}>
          <Tr>
            <Th>
              <DataTitle>Envelope name</DataTitle>
            </Th>
            <Th isNumeric>
              <DataTitle>Budget amount</DataTitle>
            </Th>
            <Th isNumeric>
              <DataTitle>Amount spent</DataTitle>
            </Th>
            <Th isNumeric>
              <DataTitle>Amount left</DataTitle>
            </Th>
            <Th>
              <DataTitle>Category</DataTitle>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {envelopes.length > 0 ? (
            envelopes.map((envelope) => {
              return (
                <EnvelopeItem
                  key={envelope.id}
                  envelope={envelope}
                  color={color}
                />
              );
            })
          ) : (
            <Tr color={'gray.600'}>
              <Td position={'absolute'}>
                <DataText>Empty. Click to add an envelope.</DataText>
              </Td>
              <Td
                borderBottom={'none'}
                pb={'1.5rem'}></Td>
            </Tr>
          )}
          <Tr onClick={() => onOpen(category)}>
            <Td
              color={'gray.500'}
              position={'sticky'}
              left={'0'}>
              <DataText>+ New</DataText>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
}

const DataTitle = ({ children }) => {
  return (
    <Text
      color={'gray.500'}
      fontWeight={500}
      fontSize={'0.65rem'}>
      {children}
    </Text>
  );
};

const DataText = ({ children }) => {
  return <Text fontSize={'0.8rem'}>{children}</Text>;
};
