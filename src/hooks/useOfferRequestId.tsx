import { useLocalStorage } from '@uidotdev/usehooks';

export const useOfferRequestId = () => {
  const [offerRequestId, setOfferRequestId] = useLocalStorage('offerRequestId', '');

  return { offerRequestId, setOfferRequestId };
};
