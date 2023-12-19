import { customFetch } from '@/lib/customFetch';
import { Offers } from '@/lib/definitions';
import { useQuery } from '@tanstack/react-query';

export const useFetchOffers = (offerId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['offersList', offerId],
    queryFn: async () => {
      const response = await customFetch<Offers>(`/offers/${offerId}`);
      return response.data;
    },
  });
  return { data, isLoading };
};
