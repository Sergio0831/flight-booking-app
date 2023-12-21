import { useSteps } from '@/hooks/useSteps';
import { Button } from '../ui/button';
import { useFetchOffers } from '@/hooks/useFetchOffers';
import { useOfferRequestId } from '@/hooks/useOfferRequestId';
import SingleOffer from './single-offer';
import { useAirportsCities } from '@/hooks/useAirportsCities';
import { ArrowRightIcon, ArrowRightLeftIcon } from 'lucide-react';

export default function OffersList() {
  const { goBackwards } = useSteps();
  const { offerRequestId } = useOfferRequestId();
  const { data, isLoading } = useFetchOffers(offerRequestId);
  const { airportCity } = useAirportsCities();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1 className="mb-5 font-medium text-xl">
        {airportCity.originCity}{' '}
        <span className="inline-block text-muted mx-1">
          {airportCity.tripType === 'return' ? (
            <ArrowRightLeftIcon size="1rem" strokeWidth={3} />
          ) : (
            <ArrowRightIcon size="1rem" strokeWidth={3} />
          )}
        </span>{' '}
        {airportCity.destinationCity}
      </h1>
      <ul className="grid gap-y-4 mb-3">
        {data &&
          data.offers.map((offer) => {
            return (
              <li key={offer.id}>
                <a
                  className="cursor-pointer group"
                  aria-label={`Offer price ${offer.totalAmount} ${offer.totalCurrency}`}>
                  <SingleOffer
                    offer={offer}
                    className="group-hover:border-blue-600 transition-colors"
                  />
                </a>
              </li>
            );
          })}
      </ul>

      <Button type="button" variant="link" onClick={() => goBackwards()}>
        Go Back
      </Button>
    </div>
  );
}
