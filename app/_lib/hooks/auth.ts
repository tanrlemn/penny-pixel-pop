'use client';

import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState, profileState } from '@/app/_state/atoms';
import { createClient } from '@/app/_lib/utils/supabase/client';

export const useAuth = () => {
  const [user, setUser] = useRecoilState(userState);
  const [profile, setProfile] = useRecoilState(profileState);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchProfile = async (userId: string) => {
      setLoadingProfile(true);
      console.log('fetching profile');
      const res = await fetch(`/api/auth/getProfile?userId=${userId}`);
      const { data, error } = await res.json();

      if (data) {
        setProfile(data);
      } else {
        error && console.error(error);
        setProfile(null);
      }

      setLoading(false);
      setLoadingProfile(false);
    };

    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);

        return;
      } else if (event === 'INITIAL_SESSION' && !session) {
        setLoading(false);
        return;
      } else if (
        (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') &&
        !user &&
        session
      ) {
        const sessionUser = session?.user ?? null;
        setUser(sessionUser);

        return;
      }
    });

    if (user && !profile && !loadingProfile) {
      fetchProfile(user.id);
    }
  }, [user, setUser, profile, setProfile, supabase.auth, loadingProfile]);

  return { loading };
};
