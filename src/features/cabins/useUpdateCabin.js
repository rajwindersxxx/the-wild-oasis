import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabine';
import toast from 'react-hot-toast';

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success(' cabin successfully edited');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (err) => toast.error(err.message),
  });
  return {isUpdating , updateCabin}
}
