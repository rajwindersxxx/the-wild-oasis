import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking as updateBookingApi } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useUpdateBooking() {
  const queryClient = useQueryClient();
  const {
    mutate: updateBooking,
    isLoading: isCreating,
  } = useMutation({
    mutationFn:(id, obj) => updateBookingApi(id , obj),
    onSuccess: () => {
      toast.success('New Booking has created successfully');
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateBooking, isCreating };
}
