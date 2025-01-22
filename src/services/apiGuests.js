import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constants';
export async function getGuests({ filter, sortBy, page }) {
  let query = supabase
    .from('guests')
    .select('*, bookings(status, id)', { count: 'exact' });
  // filter
  if (filter) query = query[filter.method || 'eq'](filter.field, filter.value);

  // Sorting
  if (sortBy)
    query = query.order(`${sortBy.field}`, {
      ascending: sortBy.direction === 'asc',
    });

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

export async function createEditGuest(guestData) {
  const createGuestEntry = {
    ...guestData,
    countryFlag: `https://flagcdn.com/${guestData.countryCode.toLowerCase()}.svg`,
  };
  const { data, error } = await supabase
    .from('guests')
    .insert([createGuestEntry]);
  if (error) {
    console.error(error);
    throw new Error('Guests could not be created');
  }
  return { data, error };
}
export async function getAllGuests() {
  const { data, error } = await supabase.from('guests').select('*');
  return { data, error };
}

export async function deleteGuest(id) {
  const { data, error } = await supabase.from('guests').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted');
  }
  return data;
}
