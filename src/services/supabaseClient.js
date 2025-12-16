import { createClient } from '@supabase/supabase-js';

// Substitua com suas credenciais do Supabase
const supabaseUrl = 'https://uteqgwvnujqoqxxsqwro.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0ZXFnd3ZudWpxb3F4eHNxd3JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NDIwNzcsImV4cCI6MjA4MTIxODA3N30.K0XAr6SXG4_SuNlAYe5LVHsDO2KyiQuohppg5a35Y8g';

export const supabase = createClient(supabaseUrl, supabaseKey);
