import { supabase } from './supabase.utils'


export const getAuthToken = () => {
  const session = supabase.auth.session()
  return session?.access_token ?? ''
}
