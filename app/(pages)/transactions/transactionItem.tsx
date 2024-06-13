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

// local components
import { MoreHorizontal } from 'lucide-react';

export default function TransactionItem({ txn }) {
  const { onOpen } = useTransactionsDrawer();
  const setCurrentTxn = useSetRecoilState(currentTxnState);

  return (
    <Tr key={txn.id}>
      <Td>
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
              new Date(txn.date).getTime() - new Date(txn.date).getTime()
            ),
            new Date(),
            {
              addSuffix: true,
            }
          )}
        </DataText>
      </Td>
      <Td maxW={{ base: '250px' }} whiteSpace={'pre-wrap'}>
        <DataText>{txn.note}</DataText>
      </Td>
      <Td
        cursor={'pointer'}
        color={'gray.500'}
        onClick={() => {
          setCurrentTxn(txn);
          onOpen();
        }}
      >
        <MoreHorizontal />
      </Td>
    </Tr>
  );
}

const DataText = ({ children }) => {
  return <Text fontSize={'0.8rem'}>{children}</Text>;
};
