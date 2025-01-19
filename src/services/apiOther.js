import supabase from './supabase';

export async function getCountries() {
  const { data, error } = await supabase.from('countries').select('*');
  if (error) throw new Error('could not get Country data ');
  return { data, error };
}
