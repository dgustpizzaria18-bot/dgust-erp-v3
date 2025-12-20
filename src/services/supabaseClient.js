import { createClient } from '@supabase/supabase-js';

// Environment variables are required - configure in .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase environment variables. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  );
}

// Create Supabase client with error handling
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});

// Test connection using a real table instead of _test
supabase.from('produtos').select('count', { count: 'exact', head: true })
  .then(() => console.log('✅ Supabase connected successfully'))
  .catch((error) => {
    console.error('⚠️ Supabase connection issue:', error.message);
    console.log('Please check if your Supabase project is active at:', supabaseUrl);
  });

