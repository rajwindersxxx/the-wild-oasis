import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditGuest as createEditGuestApi } from '../../services/apiGuests';
import toast from 'react-hot-toast';

export function useCreateGuest() {
  const queryClient = useQueryClient();
  const { mutate: createGuest, isLoading: isCreating } = useMutation({
    mutationFn: createEditGuestApi,
    onSuccess: () => {
      toast.success('New guest successfully created');
      queryClient.invalidateQueries({ queryKey: ['guests'] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { createGuest, isCreating };
}
