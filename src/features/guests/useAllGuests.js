import { useQuery } from '@tanstack/react-query';
import { getAllGuests } from '../../services/apiGuests';
export function useAllGuests() {
  const {
    isLoading,
    data: { data: guests } = {},
    error,
  } = useQuery({
    queryKey: ['allGuests'],
    queryFn: () => getAllGuests(),
  });
  return { isLoading, guests, error };
}
