// recoil
import { useSetRecoilState, useRecoilState } from 'recoil';
import {
  currentEnvelopeState,
  loadingSingleEnvelopeState,
} from '@/app/_state/atoms';

// hooks
import { useEnvelopeDrawer, useEnvelopes } from '@/app/_lib/hooks/envelopes';

// utils
import { formatCurrency } from '@/app/_lib/utils/currencyFormater';
import { categories } from '@/app/_state/constants';

// chakra-ui
import { Select, Td, Text, Tr } from '@chakra-ui/react';

// local components
import LoadingDiv from '@/app/_components/interactive/loadingDiv';

export default function EnvelopeItem({ envelope, color }) {
  const [loadingEnvelope, setLoadingEnvelope] = useRecoilState(
    loadingSingleEnvelopeState
  );

  const { onOpen } = useEnvelopeDrawer();

  const setCurrentEnvelope = useSetRecoilState(currentEnvelopeState);
  const { updateEnvelopeCategory } = useEnvelopes();

  const handleClick = () => {
    setCurrentEnvelope(envelope);
    onOpen();
  };

  return (
    <Tr
      cursor={'pointer'}
      key={envelope.id}
      onClick={() => {
        setCurrentEnvelope(envelope);
      }}
      bg={envelope.isOver ? 'red.50' : 'white'}
    >
      <Td
        px={'0.5rem'}
        borderRight={'1px solid'}
        borderColor={'gray.100'}
        position={'sticky'}
        left={0}
        bg={envelope.isOver ? 'red.50' : 'white'}
        maxW={'35vw'}
        overflowX={'hidden'}
        onClick={handleClick}
      >
        <DataText>{envelope.envelope_name}</DataText>
      </Td>
      <Td onClick={handleClick} isNumeric>
        <DataText>{formatCurrency(envelope.budget_amount)}</DataText>
      </Td>
      <Td onClick={handleClick} isNumeric>
        <DataText>{formatCurrency(envelope.totalSpent)}</DataText>
      </Td>
      <Td
        onClick={handleClick}
        isNumeric
        color={envelope.isOver ? 'red.500' : null}
      >
        <DataText>{formatCurrency(envelope.amountLeft)}</DataText>
      </Td>
      <Td>
        {loadingEnvelope === envelope.id ? (
          <LoadingDiv id={envelope.id} isLoading={loadingEnvelope} />
        ) : (
          <Select
            onChange={(e) => {
              setLoadingEnvelope(envelope.id);
              updateEnvelopeCategory({
                id: envelope.id,
                category: e.target.value,
              });
            }}
            variant={'filled'}
            bg={`${color}.100`}
            iconColor='gray.400'
            color={'gray.700'}
            defaultValue={envelope.category}
            size={'xs'}
            minW={'max-content'}
          >
            {categories.map((category) => {
              return (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              );
            })}
          </Select>
        )}
      </Td>
    </Tr>
  );
}

const DataText = ({ children }) => {
  return <Text fontSize={'0.8rem'}>{children}</Text>;
};
