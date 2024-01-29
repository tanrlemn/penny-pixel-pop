'use client';

// chakra-ui
import { ChakraProvider } from '@chakra-ui/react';

export function ThemeProvider({ children }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
