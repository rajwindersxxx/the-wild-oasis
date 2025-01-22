import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabine';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useCabins() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get('discount');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : {
          field: 'discount',
          value: 0,
          method: filterValue === 'no-discount' ? 'eq' : 'gt',
        };

  const sortByRaw = searchParams.get('sortBy') || 'id-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const {
    isLoading,
    data: { data: cabins, count } = {},
    error,
  } = useQuery({
    queryKey: ['cabins', filter, sortBy, page],
    queryFn: () => getCabins({ filter, sortBy, page }),
  });
  // Pre-fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getCabins({ filter, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getCabins({ filter, sortBy, page: page - 1 }),
    });
  return { isLoading, error, cabins, count };
}
