'use client';

// state
import { RecoilRoot } from 'recoil';

export function RecoilRootProvider({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
