import { createClient } from '@supabase/supabase-js';

// Use environment variables for better security
// In production, these should come from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uteqgwvnujqoqxxsqwro.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0ZXFnd3ZudWpxb3F4eHNxd3JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NDIwNzcsImV4cCI6MjA4MTIxODA3N30.K0XAr6SXG4_SuNlAYe5LVHsDO2KyiQuohppg5a35Y8g';

export const supabase = createClient(supabaseUrl, supabaseKey);
