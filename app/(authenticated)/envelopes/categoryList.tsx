// hooks
import { useEnvelopeDrawer } from '@/app/_lib/hooks/envelopes';

// utils
import { formatCurrency } from '@/app/_lib/utils/currencyFormater';

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
  useColorModeValue,
} from '@chakra-ui/react';

// local components
import EnvelopeItem from './envelopeItem';

export default function CategoryList({ category }) {
  const envelopes = category.envelopes;
  const color = category.color;
  const name = category.name;

  const { onOpen } = useEnvelopeDrawer();
  const isIncome = name === 'Income';

  const bgColor = useColorModeValue('white', 'gray.800');
  const totalsBgColor = useColorModeValue('gray.50', 'blackAlpha.300');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.500', 'gray.300');

  return (
    <Box m={'0 auto'} mb={'1rem'} p={'1rem 0'} minW={'max-content'} w={'100%'}>
      <Flex
        mb={'1rem'}
        maxW={'fit-content'}
        left={'0'}
        align={'center'}
        gap={'1rem'}
        position={'sticky'}
      >
        <Tag size={'sm'} colorScheme={color}>
          {name}
        </Tag>
        <Text fontSize={'0.75rem'}>
          {envelopes.length} envelope
          {envelopes.length === 0 || envelopes.length > 1 ? 's' : ''}
        </Text>
      </Flex>
      <Table size={'sm'}>
        <Thead fontSize={'0.8rem'} color={textColor}>
          <Tr>
            <Th
              px={'0.5rem'}
              borderRight={'1px solid'}
              borderColor={borderColor}
              position={'sticky'}
              left={0}
              bg={bgColor}
            >
              <DataTitle>Envelope name</DataTitle>
            </Th>
            <Th isNumeric>
              <DataTitle>Budget amount</DataTitle>
            </Th>
            <Th isNumeric>
              <DataTitle>{isIncome ? 'Left to earn' : 'Amount left'}</DataTitle>
            </Th>
            <Th isNumeric>
              <DataTitle>Amount {isIncome ? 'earned' : 'spent'}</DataTitle>
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
                <DataText>Empty. Add an envelope to get started.</DataText>
              </Td>
              <Td borderBottom={'none'} pb={'1.5rem'}></Td>
            </Tr>
          )}
          {envelopes.length > 0 && (
            <Tr
              position={'relative'}
              minW={'100%'}
              fontWeight={500}
              bg={totalsBgColor}
            >
              <Td
                px={'0.5rem'}
                borderRight={'1px solid'}
                borderColor={borderColor}
                position={'sticky'}
                left={0}
                maxW={'35vw'}
                overflowX={'hidden'}
                bg={totalsBgColor}
              >
                <Text fontSize={'0.8rem'}>{name} Totals</Text>
              </Td>
              <Td isNumeric fontSize={'0.8rem'}>
                {formatCurrency(category.total)}
              </Td>
              <Td isNumeric fontSize={'0.8rem'}>
                {formatCurrency(category.amountLeft)}
              </Td>
              <Td isNumeric fontSize={'0.8rem'}>
                {formatCurrency(category.amountSpent)}
              </Td>
            </Tr>
          )}
          <Tr
            position={'relative'}
            cursor={'pointer'}
            minW={'100%'}
            onClick={() => onOpen(name)}
          >
            <Td position={'sticky'} left={'0'} color={'gray.500'}>
              <Text fontSize={'0.8rem'}>+ New</Text>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
}

const DataTitle = ({ children }) => {
  return (
    <Text color={'gray.500'} fontWeight={500} fontSize={'0.65rem'}>
      {children}
    </Text>
  );
};

const DataText = ({ children }) => {
  return <Text fontSize={'0.8rem'}>{children}</Text>;
};
