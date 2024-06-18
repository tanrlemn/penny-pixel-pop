'use client';

// hooks
import { useEffect, useState, useSyncExternalStore } from 'react';

export function useWindow() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function subscribe(callback) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

function getSnapshot() {
  return window.innerWidth;
}

function getServerSnapshot() {
  return 0;
}

export function useWindowSize() {
  const width = useWindow();
  const [height, setHeight] = useState(null);

  useEffect(() => {
    setHeight(window.innerHeight);
  }, [width]);

  return {
    width,
    height,
  };
}

export function useIsMobile() {
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState(width < 992);

  useEffect(() => {
    setIsMobile(width < 992);
  }, [width]);

  return isMobile;
}

const MODE = process.env.NEXT_PUBLIC_MODE;

export function useOrigin() {
  if (typeof window === 'undefined') {
    return { pathname: '', callbackUrl: '', fullPagePath: '' };
  }

  const origin = window.location.origin;
  const pathname = window.location.pathname;

  const port = window.location.port;
  const removePort = port !== '' ? origin.replace(`:${port}`, '') : origin;

  const callbackUrl = MODE === 'production' ? removePort : origin;
  const fullPagePath = `${callbackUrl}${pathname}`;

  return { pathname, callbackUrl, fullPagePath };
}
