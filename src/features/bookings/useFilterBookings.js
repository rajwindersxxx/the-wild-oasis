import { useQuery } from '@tanstack/react-query';
import { getFilteredBooking } from '../../services/apiBookings';

export function useFilteredBookings(cabinId) {
  const {
    isLoading,
    data: filteredBookings = [],
    error,
  } = useQuery({
    queryKey: ['filteredBookings'],
    queryFn: () => getFilteredBooking(cabinId),
    enabled: !!cabinId && !Number.isNaN(Number(cabinId)), // Only run query if cabinId is valid
    retry: false,
  });
  return { isLoading, error, filteredBookings };
}
