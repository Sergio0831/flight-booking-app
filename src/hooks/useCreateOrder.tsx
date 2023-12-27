import { customFetch } from '@/lib/customFetch';
import { useMutation } from '@tanstack/react-query';
import { useOrderId } from './useOrderId';

export const useCreateOrder = () => {
  const { setOrderId } = useOrderId();

  const { mutate: createOrder, isPending } = useMutation({
    mutationKey: ['orders'],
    mutationFn: (requestData: {
      selectedOffer: string;
      passengers: {
        id: string | undefined;
        bornOn: string;
        title: 'mr' | 'ms' | 'mrs' | 'MR' | 'MS' | 'MRS';
        gender: 'm' | 'f';
        firstName: string;
        familyName: string;
      }[];
    }) => customFetch.post('/orders', requestData),
    onSuccess: (data) => {
      setOrderId(data.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { createOrder, isPending };
};
