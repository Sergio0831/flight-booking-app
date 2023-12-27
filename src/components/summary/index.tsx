import { useSteps } from '@/hooks/useSteps';
import { Button } from '../ui/button';
import { useFetchOrder } from '@/hooks/useFetchOrder';
import { useOrderId } from '@/hooks/useOrderId';
import { CheckIcon } from 'lucide-react';
import { toCurrency } from '@/lib/utils';
import FlightOrder from './FlightOrder';
import PassengersTable from './PassengersTable';
import Loader from '../loader';

export default function Summary() {
  const { goBackwards, goToSection } = useSteps();
  const { orderId } = useOrderId();
  const { data, isLoading } = useFetchOrder(orderId);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="h-full grid">
      <div>
        <div className="text-center">
          <span className="inline-block border-sidebar rounded-full border-8 p-2 w-14 h-14">
            <CheckIcon strokeWidth="3" />
          </span>
          <h1 className="mb-5 font-medium text-xl">Order Created</h1>
        </div>
        {data && (
          <>
            <p className="text-right font-medium text-xl mb-4">
              {toCurrency(Number(data.order.totalAmount), data.order.totalCurrency)}
            </p>
            <FlightOrder order={data.order} />
            <PassengersTable passengers={data.order.passengers} />
          </>
        )}
      </div>
      <div className="flex mt-auto">
        <Button type="button" variant="link" onClick={() => goBackwards()}>
          Go Back
        </Button>
        <Button type="button" className="ml-auto gap-x-1" onClick={() => goToSection(1)}>
          Confirm
        </Button>
      </div>
    </div>
  );
}
