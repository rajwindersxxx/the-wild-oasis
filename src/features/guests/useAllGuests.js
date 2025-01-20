import { useQuery } from '@tanstack/react-query';
import { getGuests } from '../../services/apiGuests';
export function useAllGuests() {
  const {
    isLoading,
    data: { data: guests } = {},
    error,
  } = useQuery({
    queryKey: ['guests'],
    queryFn: () => getGuests(),
  });
  return { isLoading, guests, error };
}
