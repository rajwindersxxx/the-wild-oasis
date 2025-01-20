import { useQueryClient } from "@tanstack/react-query";

export function useGetFetchQuery(name) {
  const queryClient = useQueryClient();
  return queryClient.getQueryData(name);
}
