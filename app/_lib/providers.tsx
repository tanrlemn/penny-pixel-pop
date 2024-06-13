'use client';

// state
import { RecoilRoot } from 'recoil';
import { ChakraProvider } from '@chakra-ui/react';

export default function Providers({ children }) {
  return (
    <RecoilRoot>
      <ChakraProvider>{children}</ChakraProvider>
    </RecoilRoot>
  );
}
