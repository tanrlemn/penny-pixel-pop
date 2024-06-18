// utils
import { formatCurrency } from '@/app/_lib/utils/currencyFormater';
import { formatDistance, subDays } from 'date-fns';

// recoil
import { useSetRecoilState } from 'recoil';
import { currentTransactionState } from '@/app/_state/atoms';
import { currentTransactionSelector } from '@/app/_state/selectors';

// hooks
import { useTransactionsDrawer } from '@/app/_lib/hooks/transactions';

// chakra-ui
import { Td, Text, Tr } from '@chakra-ui/react';

export default function TransactionItem({ transaction }) {
  const { onOpen } = useTransactionsDrawer();
  const setCurrentTransaction = useSetRecoilState(currentTransactionSelector);

  const handleClick = () => {
    setCurrentTransaction(transaction);
    onOpen();
  };
  return (
    <Tr key={transaction.id} onClick={handleClick} cursor={'pointer'}>
      <Td maxW={{ base: '45vw' }} whiteSpace={'pre-wrap'}>
        <DataText>{transaction.note}</DataText>
      </Td>
      <Td isNumeric>
        <DataText>{formatCurrency(transaction.amount)}</DataText>
      </Td>
      <Td>
        <DataText>
          {formatDistance(
            subDays(
              new Date(transaction.date),
              new Date(transaction.date).getTime() -
                new Date(transaction.date).getTime()
            ),
            new Date(),
            {
              addSuffix: true,
            }
          )}
        </DataText>
      </Td>
      <Td>
        <DataText>{transaction.envelope_name}</DataText>
      </Td>
    </Tr>
  );
}

const DataText = ({ children }) => {
  return <Text fontSize={'0.8rem'}>{children}</Text>;
};
