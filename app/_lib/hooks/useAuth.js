'use client';

import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { userState, profileState } from '@/app/_state/atoms';
import { createClient } from '@/app/_lib/utils/supabase/client';

export const useAuth = () => {
  const setUser = useSetRecoilState(userState);
  const setProfile = useSetRecoilState(profileState);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchProfile = async (userId) => {
      const res = await fetch(`/api/auth/getProfile?userId=${userId}`);
      const { data, error } = await res.json();

      if (!error && data) {
        setProfile(data[0]);
      } else {
        console.error(error);
        setProfile(null);
      }
    };

    supabase.auth.onAuthStateChange(async (event, session) => {
      const user = session?.user ?? null;
      setUser(user);

      if (user) {
        await fetchProfile(user.id);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });
  }, [setUser, setProfile, supabase.auth]);

  return { loading };
};
