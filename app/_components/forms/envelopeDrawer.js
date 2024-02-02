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
  DrawerFooter,
  DrawerHeader,
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
      placement={{ base: 'bottom', md: 'right' }}
      size={{ base: 'lg', md: 'sm' }}
      onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent minH={'80vh'}>
        <DrawerCloseButton />

        <DrawerHeader>
          <Text fontSize={'1.5rem'}>Envelope</Text>
        </DrawerHeader>

        <DrawerBody pt={'2rem'}>
          <FormControl>
            <Stack spacing={3}>
              <Input
                border={'none'}
                borderBottom={'1px solid'}
                borderColor={'gray.200'}
                borderRadius={0}
                _placeholder={{ color: 'gray.300' }}
                transition={'all 0.2s ease-in-out'}
                _focus={{
                  borderRadius: '9px',
                  borderBottom: 'none',
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
        </DrawerBody>
        <DrawerFooter
          borderTop={'1px solid'}
          borderTopColor={'gray.200'}>
          <Box>
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
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
