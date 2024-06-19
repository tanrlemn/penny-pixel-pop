// supabase
import { createClient } from '../utils/supabase/client';

export const updateUserProfileAPI = async ({ profile }) => {
  const { full_name, avatar_url, family_id, current_sheet_id } = profile;
  const updated_at = new Date().toISOString();

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('profiles')
      .update({
        full_name,
        avatar_url,
        family_id,
        current_sheet_id,
        updated_at,
      })
      .eq('id', profile.id)
      .select('*')
      .single();

    if (error) {
      console.error('updateUserProfileAPI error:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('User service fetch error:', error);
    throw error;
  }
};
