import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constants';
export async function getGuests({ page }) {
  let query = supabase
    .from('guests')
    .select('*, bookings(status, id)', { count: 'exact' });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }
  const { data, error, count } = await query;
  if (error) {
    console.error(error);
    throw new Error('Guests could not be loaded');
  }
  return { data, count };
}

export async function createGuest(guestData) {
  const createGuestEntry = {
    ...guestData,
    countryFlag: `https://flagcdn.com/${guestData.countryCode.toLowerCase()}.svg`,
  };
  const { data, error } = await supabase.from('guests').insert([createGuestEntry]);
  if (error) {
    console.error(error);
    throw new Error('Guests could not be created');
  }
  return { data, error };
}
