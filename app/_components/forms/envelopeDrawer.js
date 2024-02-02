'use client';

// hooks
import { useState } from 'react';
import { useEnvelopeDrawer, useEnvelopes } from '@/app/_lib/hooks/useEnvelopes';

// chakra-ui
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  FormControl,
  Input,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import { categories } from '@/app/_state/constants';

export default function EnvelopeDrawer() {
  const {
    currentEnvelope,
    createUpdateEnvelope,
    setCurrentEnvelope,
    resetCurrentEnvelope,
  } = useEnvelopes();

  const { isOpen, onClose } = useEnvelopeDrawer();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Drawer
      isOpen={isOpen}
      placement='bottom'
      size={'lg'}
      onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent minH={'80vh'}>
        <DrawerCloseButton />

        <DrawerBody pt={'4rem'}>
          <FormControl>
            <Stack spacing={3}>
              <Input
                border={'none'}
                _placeholder={{ color: 'gray.300' }}
                transition={'all 0.2s ease-in-out'}
                _focus={{
                  padding: '0.5rem 1rem',
                }}
                focusBorderColor='green.300'
                placeholder='Untitled'
                fontSize={'2rem'}
                p={'0.5rem 0'}
                mb={'1rem'}
                h={'auto'}
                fontWeight={500}
                value={currentEnvelope.envelope_name}
                onChange={(e) => {
                  setCurrentEnvelope({
                    ...currentEnvelope,
                    envelope_name: e.target.value,
                  });
                }}
              />
              <Flex
                align={'center'}
                gap={'1rem'}>
                <Text minW={'fit-content'}>Budget amount:</Text>
                <Input
                  placeholder='$0.00'
                  size='md'
                  value={currentEnvelope.budget_amount}
                  type='number'
                  onChange={(e) =>
                    setCurrentEnvelope({
                      ...currentEnvelope,
                      budget_amount: e.target.value,
                    })
                  }
                />
              </Flex>
              <Flex
                align={'center'}
                gap={'1rem'}>
                <Text minW={'fit-content'}>Category:</Text>
                <Select
                  onChange={(e) => {
                    setCurrentEnvelope({
                      ...currentEnvelope,
                      category: e.target.value,
                    });
                  }}
                  variant={'filled'}
                  iconColor='gray.400'
                  color={'gray.700'}
                  defaultValue={currentEnvelope.category || 'Necessities'}
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
              </Flex>
            </Stack>
          </FormControl>
          <Box mt={'3rem'}>
            <Button
              onClick={() => {
                setIsLoading(true);
                createUpdateEnvelope({
                  envelopeId: currentEnvelope.id,
                  envelope: currentEnvelope,
                  setIsLoading,
                });
                resetCurrentEnvelope();
                onClose();
              }}
              isLoading={isLoading}
              colorScheme={'purple'}
              size={'sm'}>
              Save envelope
            </Button>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
