import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://soljlsbnphrdkomldckh.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvbGpsc2JucGhyZGtvbWxkY2toIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4ODUzNzksImV4cCI6MjA5ODQ2MTM3OX0.AyzZBvs7O_nWRDhH4nuITp0iWnovNOCrwlTqW9MM_8Y';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
