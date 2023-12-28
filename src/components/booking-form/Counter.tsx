import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { FormControl } from '../ui/form';
import { Input } from '../ui/input';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import { BookingFormValues } from '@/lib/definitions';

type CounterProps = {
  field:
    | ControllerRenderProps<BookingFormValues, 'adults'>
    | ControllerRenderProps<BookingFormValues, 'children'>;
  minPassengers: string;
  maxPassengers: string;
  form: UseFormReturn<BookingFormValues>;
  onDecrease: (
    value: string,
    form: UseFormReturn<BookingFormValues>,
    field: 'adults' | 'children',
    min: number,
  ) => void;
  onIncrease: (
    value: string,
    form: UseFormReturn<BookingFormValues>,
    field: 'adults' | 'children',
    max: number,
  ) => void;
};

/**
 * Counter component for adjusting passenger counts.
 * @param field - The form field object.
 * @param maxPassengers - The maximum number of passengers allowed.
 * @param minPassengers - The minimum number of passengers allowed.
 * @param form - The form object from react-hook-form.
 * @param onDecrease - Callback function for decreasing passenger count.
 * @param onIncrease - Callback function for increasing passenger count.
 */
export default function Counter({
  field,
  maxPassengers,
  minPassengers,
  form,
  onDecrease,
  onIncrease,
}: CounterProps) {
  return (
    <div className="flex items-center justify-end gap-x-3">
      <Button
        disabled={field.value === minPassengers}
        type="button"
        variant="outline"
        size="icon"
        aria-label={`Remove ${field.name} passangers`}
        className="bg-transparent border-none hover:bg-inherit group h-7 w-7"
        onClick={() => onDecrease(field.value, form, field.name, +minPassengers)}>
        <MinusCircleIcon className="group-hover:stroke-muted transition-colors" />
      </Button>
      <FormControl>
        <Input type="hidden" id={field.name} {...field} readOnly tabIndex={-1} />
      </FormControl>
      <span className="font-semi text-md select-none">{field.value}</span>
      <Button
        disabled={field.value === maxPassengers}
        aria-label={`Add ${field.name} passangers`}
        type="button"
        variant="outline"
        size="icon"
        className="bg-transparent border-none hover:bg-inherit h-7 w-7 group"
        onClick={() => onIncrease(field.value, form, field.name, +maxPassengers)}>
        <PlusCircleIcon className="group-hover:stroke-muted transition-colors" />
      </Button>
    </div>
  );
}
