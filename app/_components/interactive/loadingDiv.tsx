'use client';

// recoil
import { atomFamily, useRecoilState } from 'recoil';

// hooks
import { useEffect } from 'react';

// chakra-ui
import { Box, Flex } from '@chakra-ui/react';

// local components
import Lottie from 'lottie-react';
import logoAnimation from '@/app/_assets/lottie/penny-logo.json';

export const loadingDivStateFamily = atomFamily({
  key: 'loadingDivState',
  default: false,
});

export default function LoadingDiv({ id, isLoading }) {
  const [loadingDiv, setLoadingDiv] = useRecoilState(loadingDivStateFamily(id));

  useEffect(() => {
    setLoadingDiv(isLoading);
  }, [isLoading, setLoadingDiv]);

  return (
    <>
      {loadingDiv && (
        <Box m={'0 auto'} position={'relative'} maxW={'2rem'}>
          <Lottie animationData={logoAnimation} loop={true} />
        </Box>
      )}
    </>
  );
}
