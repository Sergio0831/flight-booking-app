import { customFetch } from '@/lib/customFetch';
import { Passenger } from '@/lib/definitions';
import { useQuery } from '@tanstack/react-query';

export const useFetchOffer = (offerId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['offer', offerId],
    queryFn: async () => {
      const response = await customFetch<{ passengers: Passenger[] }>(`/offer/${offerId}`);
      return response.data;
    },
  });
  return { data, isLoading };
};
