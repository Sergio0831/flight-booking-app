import { customFetch } from '@/lib/customFetch';
import { Offers } from '@/lib/definitions';
import { useQuery } from '@tanstack/react-query';

export const useFetchOffers = (offerRequestId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['offersList', offerRequestId],
    queryFn: async () => {
      const response = await customFetch<Offers>(`/offers/${offerRequestId}`);
      return response.data;
    },
  });
  return { data, isLoading };
};
