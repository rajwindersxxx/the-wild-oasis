import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditBooking as createBookingApi } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const { mutate: createBooking, isLoading: isCreating } = useMutation({
    mutationFn: ({ finalData, id }) => createBookingApi(finalData, id),
    onSuccess: () => {
     
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { createBooking, isCreating };
}
