import { useLocalStorage } from '@uidotdev/usehooks';

export const useOfferId = () => {
  const [offerId, setOfferId] = useLocalStorage('offerId', '');

  return { offerId, setOfferId };
};
