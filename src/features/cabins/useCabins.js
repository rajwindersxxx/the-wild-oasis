import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabine';

export function useCabins(name) {
  const {
    isLoading,
    data: cabins = [],
    error,
  } = useQuery({
    queryKey: ['cabins'],
    queryFn:() => getCabins(name),
  });
  return {isLoading , error , cabins}
}
