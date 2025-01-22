import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getGuests } from '../../services/apiGuests';
import { PAGE_SIZE } from '../../utils/constants';
import { useSearchParams } from 'react-router-dom';
export function useGuests() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filter
  const filterValue = searchParams.get('search');

  const filter =
    !filterValue || filterValue === ''
      ? null
      : {
          field: isNaN(Number(filterValue)) ? 'fullName' : 'id',
          value: isNaN(Number(filterValue)) ? `%${filterValue}%` : filterValue,
          method: isNaN(Number(filterValue)) ? 'ilike' : 'eq',
        };
  // Sort by

  const sortByRaw = searchParams.get('sortBy') || 'id-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const {
    isLoading,
    data: { data: guests, count } = {},
    error,
  } = useQuery({
    queryKey: ['guests', filter, sortBy, page],
    queryFn: () => getGuests({ filter, sortBy, page }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['guests', filter, sortBy, page + 1],
      queryFn: () => getGuests({ filter, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['guest', filter, sortBy, page - 1],
      queryFn: () => getGuests({ filter, sortBy, page: page - 1 }),
    });
  return { isLoading, guests, count, error };
}
