import { ArrowRightIcon } from 'lucide-react';
import { Offer } from '@/lib/definitions';
import { cn, toCurrency } from '@/lib/utils';
import { Button } from '../ui/button';
import OfferSlice from './OfferSlice';

type OfferProps = {
  offer: Offer;
  className?: string;
};

/**
 * SingleOffer component for displaying a single offer.
 * @param {Object} props - Component props
 * @param {Object} props.offer - Offer data
 * @param {string} props.className - Additional class names for styling
 */
export default function SingleOffer({ offer, className }: OfferProps) {
  const { slices, totalAmount, totalCurrency } = offer;

  return (
    <div
      className={cn(
        'flex flex-wrap justify-between gap-y-4 border-2 border-gray-300 rounded-md py-3 px-6',
        className,
      )}>
      <div className="grid gap-y-3 flex-auto">
        {slices.map((slice) => {
          return <OfferSlice key={slice.sliceId} slice={slice} />;
        })}
      </div>
      <div className="flex xs:flex-auto gap-y-4 flex-col xs:flex-row xs:justify-between items-center">
        <span className="block text-lg font-bold">
          {toCurrency(Number(totalAmount), totalCurrency)}
        </span>
        <Button
          size="sm"
          className="font-semi"
          aria-label={`Offer price ${totalAmount} ${totalCurrency}`}>
          Select
          <ArrowRightIcon size={18} strokeWidth={3} className="ml-1" />
        </Button>
      </div>
    </div>
  );
}
