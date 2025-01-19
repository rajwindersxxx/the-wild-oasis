import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getGuests } from '../../services/apiGuests';
import { PAGE_SIZE } from '../../utils/constants';
import { useSearchParams } from 'react-router-dom';
export function useGuests() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const {
    isLoading,
    data: { data: guests, count } = {},
    error,
  } = useQuery({
    queryKey: ['guests', page],
    queryFn: () => getGuests(page),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['guests', page + 1],
      queryFn: () => getGuests(page + 1),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['guest', page - 1],
      queryFn: () => getGuests(page - 1),
    });
  return { isLoading, guests, count, error };
}
