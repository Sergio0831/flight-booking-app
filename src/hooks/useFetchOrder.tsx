import { customFetch } from '@/lib/customFetch';
import { Order } from '@/lib/definitions';
import { useQuery } from '@tanstack/react-query';

export const useFetchOrder = (orderId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      const response = await customFetch<{ order: Order }>(`/orders/${orderId}`);
      return response.data;
    },
  });
  return { data, isLoading };
};
