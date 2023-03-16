const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL,
  key: import.meta.env.VITE_SUPABASE_KEY
};

export default supabaseConfig;

if (!supabaseConfig.url || !supabaseConfig.key) throw new Error('Supabase credentials missing')
