// hooks
import { useRef, useEffect, useState } from 'react';
import {
  useEnvelopeDrawer,
  useEnvelopes,
  useEnvelopeWidths,
} from '@/app/_lib/hooks/useEnvelopes';

// utils
import { formatCurrency } from '@/app/_lib/utils/currencyFormater';
import { categories } from '@/app/_state/constants';

// chakra-ui
import { Select, Td, Text, Tr, useDisclosure } from '@chakra-ui/react';

// local components
import LoadingDiv from '@/app/_components/interactive/loadingDiv';

export default function EnvelopeItem({ envelope, color }) {
  const [isLoading, setIsLoading] = useState(false);

  const envelopeWidthRef = useRef();
  const noEnvelopeDataRef = useRef();
  const budgetAmountWidthRef = useRef();
  const amountSpentWidthRef = useRef();
  const amountLeftWidthRef = useRef();
  const categoryWidthRef = useRef();

  const {
    envelopeNameWidth,
    setEnvelopeNameWidth,
    budgetAmountWidth,
    setBudgetAmountWidth,
    amountSpentWidth,
    setAmountSpentWidth,
    amountLeftWidth,
    setAmountLeftWidth,
    categoryWidth,
    setCategoryWidth,
  } = useEnvelopeWidths();

  const { onOpen } = useEnvelopeDrawer();

  const { updateEnvelopeCategory, setCurrentEnvelope } = useEnvelopes();

  useEffect(() => {
    if (envelopeWidthRef.current) {
      if (envelopeWidthRef.current.offsetWidth > envelopeNameWidth) {
        setEnvelopeNameWidth(envelopeWidthRef.current.offsetWidth);
      }
    }
    if (noEnvelopeDataRef.current) {
      if (noEnvelopeDataRef.current.offsetWidth > envelopeNameWidth) {
        setEnvelopeNameWidth(noEnvelopeDataRef.current.offsetWidth);
      }
    }

    if (budgetAmountWidthRef.current) {
      if (budgetAmountWidthRef.current.offsetWidth > budgetAmountWidth) {
        setBudgetAmountWidth(budgetAmountWidthRef.current.offsetWidth);
      }
    }

    if (amountSpentWidthRef.current) {
      if (amountSpentWidthRef.current.offsetWidth > amountSpentWidth) {
        setAmountSpentWidth(amountSpentWidthRef.current.offsetWidth);
      }
    }

    if (amountLeftWidthRef.current) {
      if (amountLeftWidthRef.current.offsetWidth > amountLeftWidth) {
        setAmountLeftWidth(amountLeftWidthRef.current.offsetWidth);
      }
    }

    if (categoryWidthRef.current) {
      if (categoryWidthRef.current.offsetWidth > categoryWidth) {
        setCategoryWidth(categoryWidthRef.current.offsetWidth);
      }
    }
  }, [
    envelopeNameWidth,
    setEnvelopeNameWidth,
    budgetAmountWidth,
    setBudgetAmountWidth,
    amountSpentWidth,
    setAmountSpentWidth,
    amountLeftWidth,
    setAmountLeftWidth,
    categoryWidth,
    setCategoryWidth,
  ]);

  return (
    <Tr
      cursor={'pointer'}
      key={envelope.id}
      onClick={() => {
        setCurrentEnvelope(envelope);
      }}>
      <Td
        onClick={() => {
          setCurrentEnvelope(envelope);
          onOpen();
        }}
        ref={envelopeWidthRef}
        w={envelopeNameWidth}>
        <DataText>{envelope.envelope_name}</DataText>
      </Td>
      <Td
        onClick={() => {
          setCurrentEnvelope(envelope);
          onOpen();
        }}
        isNumeric
        ref={budgetAmountWidthRef}
        w={budgetAmountWidth}>
        <DataText>{formatCurrency(envelope.budget_amount)}</DataText>
      </Td>
      <Td
        onClick={() => {
          setCurrentEnvelope(envelope);
          onOpen();
        }}
        isNumeric
        ref={amountSpentWidthRef}
        w={amountSpentWidth}>
        <DataText>{formatCurrency(envelope.totalSpent)}</DataText>
      </Td>
      <Td
        onClick={() => {
          setCurrentEnvelope(envelope);
          onOpen();
        }}
        isNumeric
        ref={amountLeftWidthRef}
        w={amountLeftWidth}
        color={envelope.isOver ? 'red.500' : null}>
        <DataText>{formatCurrency(envelope.amountLeft)}</DataText>
      </Td>
      <Td
        ref={categoryWidthRef}
        w={categoryWidth}>
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
