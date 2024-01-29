// utils
import { formatCurrency } from '@/app/_lib/utils/currencyFormater';
import { formatDistance, subDays } from 'date-fns';

// chakra-ui
import { Td, Text, Tr } from '@chakra-ui/react';

// local components
import LoadingDiv from '@/app/_components/interactive/loadingDiv';
import TransactionPopover from '@/app/_components/interactive/transactionPopover';

export default function TransactionItem({ txn }) {
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
              new Date(txn.date) - new Date(txn.date)
            ),
            new Date(),
            {
              addSuffix: true,
            }
          )}
        </DataText>
      </Td>
      <Td>
        <DataText>{txn.note}</DataText>
      </Td>
      <Td color={'gray.500'}>
        <TransactionPopover txn={txn} />
      </Td>
    </Tr>
  );
}

const DataText = ({ children }) => {
  return <Text fontSize={'0.8rem'}>{children}</Text>;
};
