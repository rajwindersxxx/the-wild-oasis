import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createEditGuest } from '../../services/apiGuests';

export function useUpdateGuest() {
  const queryClient = useQueryClient();

  const { mutate: updateGuest, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newGuestData, id }) => createEditGuest(newGuestData, id),
    onSuccess: () => {
      toast.success(' cabin successfully edited');
      queryClient.invalidateQueries({ queryKey: ['guests'] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isUpdating, updateGuest };
}
