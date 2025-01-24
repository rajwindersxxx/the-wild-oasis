import { PAGE_SIZE } from '../utils/constants';
import { getToday } from '../utils/helpers';
import supabase from './supabase';

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from('bookings')
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests, status , totalPrice, guestId,hasBreakfast, isPaid , observations,cabins(name, id) , guests(fullName, email)',
      { count: 'exact' }
    );
  // filter
  if (filter) query = query[filter.method || 'eq'](filter.field, filter.value);
  // Sorting
  if (sortBy)
    query = query.order(sortBy.field, {
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
    throw new Error('Bookings could not be loaded');
  }
  return { data, count };
}

export async function getFilteredBooking(id) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('cabinId', id)
      .neq('status', 'checked-out');
    if (error) {
      console.error('Error fetching booking:', error);
      throw new Error('Booking not found');
    }

    return data;
  } catch (err) {
    return { message: 'select cabin' };
  }
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking not found');
  }

  return data;
}
export async function createEditBooking(newBooking, id) {
  let query = supabase.from('bookings');

  if (!id) query = query.insert(newBooking);

  if (id) {
    delete newBooking.startDate;
    delete newBooking.endDate;
    query = query.update(newBooking).eq('id', id);
  }
  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error('Bookings could not added');
  }
  return { data, error };
}
// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// date: should be iso
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    .select('created_at, totalPrice, extrasPrice')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName)')
    .gte('startDate', date)
    .lte('endDate', getToday());

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order('created_at');

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
  return data;
}

export async function updateBooking(id, obj) {
  console.log(id, obj);
  const { data, error } = await supabase
    .from('bookings')
    .update(obj)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}

export async function getBookingHistory(id) {
  let query = supabase
    .from('bookings')
    .select('*, cabins(*) , guests(*)', { count: 'exact' })
    .eq('guestId', id);

  const { data, error, count } = await query;

  if (error) {
    throw new Error('Bookings history could not be loaded');
  }
  return { data, count };
}
