import { format, formatDistance, parse, parseISO, startOfDay } from 'date-fns';
import { differenceInDays } from 'date-fns';

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
    value
  );

export function formatToMidnight(dateString) {
  // Parse the date string into a Date object
  const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());

  // Set the time to midnight (00:00:00) using startOfDay
  const midnightDate = startOfDay(parsedDate);

  // Format the date to 'YYYY-MM-DD 00:00:00'
  return format(midnightDate, 'yyyy-MM-dd HH:mm:ss');
}

export function getNoOfDays(startDate, endDate){
  const d1 = new Date(startDate).getTime();
  const d2 = new Date(endDate).getTime();
  return d2 - d1
}

export function getTodayDate(){
 return  new Date().toISOString().split('T')[0]
}
