'use client';

import { useEffect, useState } from 'react';

export function useOrigin() {
  const [origin, setOrigin] = useState(null);
  const [pathname, setPathname] = useState(null);
  const [href, setHref] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
      setPathname(window.location.pathname);
      setHref(window.location.href);
    }
  }, []);

  return { origin, pathname, href };
}
