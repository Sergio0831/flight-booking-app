import { customFetch } from '@/lib/customFetch';
import { SearchFlightsParams } from '@/lib/definitions';
import { useMutation } from '@tanstack/react-query';
import { useOfferRequestId } from './useOfferRequestId';

export const useSearchFlights = () => {
  const { setOfferRequestId } = useOfferRequestId();

  const { mutate: searchFlights, isPending } = useMutation({
    mutationKey: ['offers'],
    mutationFn: ({
      tripType,
      destination,
      from,
      formatedDepartDate,
      formatedReturnDate,
      adults,
      children,
    }: SearchFlightsParams) =>
      customFetch.post('/offers', {
        tripType,
        destination,
        from,
        formatedDepartDate,
        formatedReturnDate,
        adults,
        children,
      }),
    onSuccess: (data) => {
      console.log('slice created');
      setOfferRequestId(data.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { searchFlights, isPending };
};
