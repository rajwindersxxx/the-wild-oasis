import { useQuery } from '@tanstack/react-query';
import { getBookingHistory } from '../../services/apiBookings';
import { useParams } from 'react-router-dom';

export function useGuestHistory() {
  const { guestId } = useParams();
  // Filter
  const {
    isLoading,
    data: { data: bookingHistory, count } = {},
    error,
  } = useQuery({
    queryKey: ['bookingHistory', guestId],
    queryFn: () => getBookingHistory(guestId),
  });

  return { isLoading, error, bookingHistory, count };
}
