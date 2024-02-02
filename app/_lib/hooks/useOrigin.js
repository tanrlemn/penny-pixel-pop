'use client';

export function useOrigin() {
  const origin = typeof window !== 'undefined' && window.location.origin;
  const pathname = typeof window !== 'undefined' && window.location.pathname;
  const href = typeof window !== 'undefined' && window.location.href;

  return { origin, pathname, href };
}
