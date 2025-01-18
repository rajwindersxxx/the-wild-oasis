import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://jmqspgxmomqtfvttimnj.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptcXNwZ3htb21xdGZ2dHRpbW5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxODMzMTMsImV4cCI6MjA1MTc1OTMxM30.JpK7tEkx3dGjSQG6TaOThpAy0gZjNXMu2CfW2f0apeI';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
