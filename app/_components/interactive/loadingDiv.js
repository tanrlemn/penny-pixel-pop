'use client';

// recoil
import { atomFamily, useRecoilState } from 'recoil';

// hooks
import { useEffect } from 'react';

// chakra-ui
import { Box, Flex } from '@chakra-ui/react';

// local components
import Lottie from 'lottie-react';
import gooeyBalls from '@/app/_assets/lottie/gooeyBalls.json';

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
        <Box
          position={'relative'}
          maxW={'3rem'}>
          <Lottie
            animationData={gooeyBalls}
            loop={true}
          />
        </Box>
      )}
    </>
  );
}
