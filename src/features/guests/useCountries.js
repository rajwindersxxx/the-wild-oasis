import { useQuery } from '@tanstack/react-query';
import { getCountries } from '../../services/apiOther';

export function useCountries() {
  const {
    data: {data: countriesList = []} = {},
    isLoading,
    error,
  } = useQuery({
    queryFn: getCountries,
    queryKey: ['countries'],
  });
  return { countriesList, isLoading, error };
}
