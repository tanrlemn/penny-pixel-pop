'use client';

// server
import { createClient } from '@/app/_lib/utils/supabase/client';

// recoil
import { atom, useRecoilState, useRecoilValue } from 'recoil';

// hooks
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export const userState = atom({
  key: 'userState',
  default: null,
});

export const profileState = atom({
  key: 'profileState',
  default: null,
});

export function useUser() {
  const [userData, setUserData] = useRecoilState(userState);
  const router = useRouter();
  const pathname = usePathname();

  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      if (userData === null) {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        setUserData(user);
      }
    };

    getUser();
  }, [userData, supabase, router, pathname, setUserData]);

  return { userData };
}

export function useProfile() {
  const user = useRecoilValue(userState);
  const [profile, setProfile] = useRecoilState(profileState);

  useEffect(() => {
    const getProfile = async () => {
      if (profile === null) {
        const res = await fetch('/api/supabase/getProfile');

        const { data, error } = await res.json();

        if (error) {
          console.error(error);
        }

        setProfile(data[0]);
      }
    };

    user != null && getProfile();
  }, [profile, setProfile, user]);

  return { profile, setProfile };
}
