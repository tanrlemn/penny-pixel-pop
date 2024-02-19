// utils
import { formatCurrency } from '@/app/_lib/utils/currencyFormater';
import { formatDistance, subDays } from 'date-fns';

// recoil
import { useSetRecoilState } from 'recoil';
import { currentTxnState } from '@/app/_state/atoms';

// hooks
import { useTransactionsDrawer } from '@/app/_lib/hooks/useTransactions';

// chakra-ui
import { Td, Text, Tr } from '@chakra-ui/react';

export default function TransactionItem({ txn }) {
  const { onOpen } = useTransactionsDrawer();
  const setCurrentTxn = useSetRecoilState(currentTxnState);

  return (
    <Tr
      cursor={'pointer'}
      key={txn.id}
      onClick={() => {
        setCurrentTxn(txn);
        onOpen();
      }}>
      <Td
        py={'0.75rem'}
        px={'0.5rem'}>
        <DataText>{txn.envelope_name}</DataText>
      </Td>
      <Td isNumeric>
        <DataText>{formatCurrency(txn.amount)}</DataText>
      </Td>
      <Td>
        <DataText>
          {formatDistance(
            subDays(
              new Date(txn.date),
              new Date(txn.date) - new Date(txn.date)
            ),
            new Date(),
            {
              addSuffix: true,
            }
          )}
        </DataText>
      </Td>
      <Td
        maxW={{ base: '250px' }}
        whiteSpace={'pre-wrap'}>
        <DataText>{txn.note}</DataText>
      </Td>
    </Tr>
  );
}

const DataText = ({ children }) => {
  return <Text fontSize={'0.8rem'}>{children}</Text>;
};
