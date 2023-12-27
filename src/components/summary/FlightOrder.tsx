import { Order } from '@/lib/definitions';
import OfferSlice from '../offers/OfferSlice';

type OrderProps = {
  order: Order;
};

export default function FlightOrder({ order }: OrderProps) {
  return (
    <div className="border-2 border-gray-300 rounded-md py-3 px-6 max-w-xs m-auto">
      {order.slices.map((slice) => (
        <OfferSlice key={slice.sliceId} slice={slice} />
      ))}
    </div>
  );
}
