// hooks
import { useEnvelopeDrawer } from '@/app/_lib/hooks/envelopes';

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
import { formatCurrency } from '@/app/_lib/utils/currencyFormater';

export default function Totals({ title, totals, color }) {
  const {
    totalBudgetedIncome,
    totalBudgetedExpenses,
    totalDifference,
    totalSpent,
    totalIncome,
    totalLeft,
    budgetIsNegative,
    actualIsNegative,
  } = totals;

  const isBudgeted = title === 'Budgeted';

  const negativeColor = useColorModeValue('red.500', 'red.300');
  const positiveColor = useColorModeValue('green.500', 'green.300');
  const textColor = useColorModeValue('gray.700', 'gray.300');

  const formattedTotals = {
    income: {
      title: isBudgeted ? 'Total Budgeted Income:' : 'Total Income:',
      value: formatCurrency(isBudgeted ? totalBudgetedIncome : totalIncome),
    },
    expenses: {
      title: isBudgeted ? 'Total Budgeted Expenses:' : 'Total Expenses:',
      value: formatCurrency(isBudgeted ? totalBudgetedExpenses : totalSpent),
    },
    difference: {
      title: isBudgeted ? 'Total Budgeted Difference:' : 'Total Left:',
      value: formatCurrency(isBudgeted ? totalDifference : totalLeft),
      color: isBudgeted
        ? budgetIsNegative
          ? negativeColor
          : positiveColor
        : actualIsNegative
        ? negativeColor
        : positiveColor,
    },
  };

  return (
    <Box
      position={'sticky'}
      m={'0 auto'}
      maxW={'900px'}
      left={'0'}
      mb={'1rem'}
      p={'1rem 0'}
      pt={'2rem'}
    >
      <Flex mb={'1rem'} align={'center'} gap={'1rem'}>
        <Tag size={'sm'} colorScheme={color}>
          {title} Totals
        </Tag>
      </Flex>
      <Table variant='simple' size={'sm'}>
        <Tbody fontSize={'0.8rem'} color={textColor}>
          <Tr>
            <Th>
              <DataTitle>{formattedTotals.income.title}</DataTitle>
            </Th>
            <Td isNumeric>
              <DataText>{formattedTotals.income.value}</DataText>
            </Td>
          </Tr>
          <Tr>
            <Th>
              <DataTitle>{formattedTotals.expenses.title}</DataTitle>
            </Th>
            <Td isNumeric>
              <DataText>{formattedTotals.expenses.value}</DataText>
            </Td>
          </Tr>
          <Tr>
            <Th>
              <DataTitle>{formattedTotals.difference.title}</DataTitle>
            </Th>
            <Td isNumeric color={formattedTotals.difference.color}>
              <DataText>{formattedTotals.difference.value}</DataText>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
}

const DataTitle = ({ children }) => {
  return (
    <Text fontWeight={500} fontSize={'0.65rem'}>
      {children}
    </Text>
  );
};

const DataText = ({ children }) => {
  return <Text fontSize={'0.8rem'}>{children}</Text>;
};
