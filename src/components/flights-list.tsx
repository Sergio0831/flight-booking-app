import { useSteps } from '@/hooks/useSteps';
import { Button } from './ui/button';
import { useOfferId } from '@/hooks/useOfferId';
import { useFetchOffers } from '@/hooks/useFetchOffers';

export default function FlightsList() {
  const { goBackwards, goForwards } = useSteps();
  const { offerId } = useOfferId();
  const { data } = useFetchOffers(offerId);

  return (
    <>
      {data && data.offers.map((offer) => <h2 key={offer.id}>{offer.totalAmount}</h2>)}
      <Button type="button" variant="link" onClick={() => goBackwards()}>
        Go Back
      </Button>
      <Button type="button" variant="link" onClick={() => goForwards()}>
        Go Forward
      </Button>
    </>
  );
}
