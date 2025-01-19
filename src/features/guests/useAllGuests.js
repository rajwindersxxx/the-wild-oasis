import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getGuests } from '../../services/apiGuests';
import { useSearchParams } from 'react-router-dom';
export function useAllGuests() {

  const {
    isLoading,
    data: { data: guests } = {},
    error,
  } = useQuery({
    queryKey: ['guests'],
    queryFn: () => getGuests(),
  });
  console.log(guests)
  return { isLoading, guests, error };
}
