// hooks
import { useState } from 'react';
import { useEnvelopeDrawer, useEnvelopes } from '@/app/_lib/hooks/useEnvelopes';

// utils
import { formatCurrency } from '@/app/_lib/utils/currencyFormater';
import { categories } from '@/app/_state/constants';

// chakra-ui
import { Select, Td, Text, Tr } from '@chakra-ui/react';

// local components
import LoadingDiv from '@/app/_components/interactive/loadingDiv';

export default function EnvelopeItem({ envelope, color }) {
  const [isLoading, setIsLoading] = useState(false);

  const { onOpen } = useEnvelopeDrawer();

  const { updateEnvelopeCategory, setCurrentEnvelope } = useEnvelopes();

  return (
    <Tr
      cursor={'pointer'}
      key={envelope.id}
      onClick={() => {
        setCurrentEnvelope(envelope);
      }}>
      <Td
        px={'0.5rem'}
        borderRight={'1px solid'}
        borderColor={'gray.100'}
        position={'sticky'}
        left={0}
        bg={'gray.50'}
        onClick={() => {
          setCurrentEnvelope(envelope);
          onOpen();
        }}>
        <DataText>{envelope.envelope_name}</DataText>
      </Td>
      <Td
        onClick={() => {
          setCurrentEnvelope(envelope);
          onOpen();
        }}
        isNumeric>
        <DataText>{formatCurrency(envelope.budget_amount)}</DataText>
      </Td>
      <Td
        onClick={() => {
          setCurrentEnvelope(envelope);
          onOpen();
        }}
        isNumeric>
        <DataText>{formatCurrency(envelope.totalSpent)}</DataText>
      </Td>
      <Td
        onClick={() => {
          setCurrentEnvelope(envelope);
          onOpen();
        }}
        isNumeric
        color={envelope.isOver ? 'red.500' : null}>
        <DataText>{formatCurrency(envelope.amountLeft)}</DataText>
      </Td>
      <Td>
        {isLoading ? (
          <LoadingDiv
            id={envelope.id}
            isLoading={isLoading}
          />
        ) : (
          <Select
            onChange={(e) => {
              setIsLoading(true);
              updateEnvelopeCategory({
                envelopeId: envelope.id,
                category: e.target.value,
                setIsLoading,
              });
            }}
            variant={'filled'}
            bg={`${color}.100`}
            iconColor='gray.400'
            color={'gray.700'}
            defaultValue={envelope.category}
            size={'xs'}
            minW={'max-content'}>
            {categories.map((category) => {
              return (
                <option
                  key={category.name}
                  value={category.name}>
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
