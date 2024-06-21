'use client';

// state
import { RecoilRoot } from 'recoil';
import {
  ChakraProvider,
  cookieStorageManagerSSR,
  localStorageManager,
} from '@chakra-ui/react';

export default function Providers({ cookies, children }) {
  const colorModeManager =
    typeof cookies === 'string'
      ? cookieStorageManagerSSR(cookies)
      : localStorageManager;

  return (
    <RecoilRoot>
      <ChakraProvider colorModeManager={colorModeManager}>
        {children}
      </ChakraProvider>
    </RecoilRoot>
  );
}
