import { useForm } from 'react-hook-form';
import { add, format, isDate } from 'date-fns';
import { Loader2Icon } from 'lucide-react';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Button } from '../ui/button';

import airports from '../../data/airports.json';

import { useSteps } from '@/hooks/useSteps';
import { useSearchFlights } from '@/hooks/useSearchFlights';

import { BookingFormValues } from '@/lib/definitions';
import { bookingFormResolver } from '@/lib/resolvers';
import { handleDecrease, handleDepartDateChange, handleIncrease } from '@/lib/utils';

import DatePicker from './DatePicker';
import { useAirportsCities } from '@/hooks/useAirportsCities';
import Dropdown from './Dropdown';
import Counter from './Counter';

/**
 * Component for the Booking Form.
 * Manages a multi-step form for booking flights.
 *
 * @returns {JSX.Element}
 */
export default function BookingForm(): JSX.Element {
  const { goForwards } = useSteps();
  const { searchFlights, isPending } = useSearchFlights();
  const { setAirportCity } = useAirportsCities();

  const form = useForm<BookingFormValues>({
    resolver: bookingFormResolver,
    defaultValues: {
      from: 'DUB',
      tripType: 'return',
      adults: '1',
      children: '0',
    },
  });

  /**
   * Handles the form submission for the BookingForm component.
   *
   * @param {BookingFormValues} data
   */
  function onSubmit(data: BookingFormValues) {
    const { tripType, destination, from, departDate, returnDate, adults, children } = data;
    const formatedDepartDate = format(departDate, 'yyyy-MM-dd');
    const formatedReturnDate = returnDate && format(returnDate, 'yyyy-MM-dd');
    const originCity = airports.airports.find((airport) => airport.code === from);
    const destinationCity = airports.airports.find((airport) => airport.code === destination);

    searchFlights(
      { tripType, from, destination, formatedDepartDate, formatedReturnDate, adults, children },
      {
        onSuccess() {
          goForwards();
          setAirportCity({
            originCity: originCity ? originCity.city : '',
            destinationCity: destinationCity ? destinationCity.city : '',
            tripType,
          });
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 h-full justify-between gap-y-5">
        {/* Flight Trip Type start */}
        <FormField
          control={form.control}
          name="tripType"
          render={({ field }) => (
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue="return" className="gap-x-8 ">
                <FormItem className="flex grow-0 items-center space-x-3">
                  <FormControl>
                    <RadioGroupItem value="return" id="return" aria-label="Return Flight" />
                  </FormControl>
                  <FormLabel htmlFor="return" className="cursor-pointer">
                    Return Trip
                  </FormLabel>
                </FormItem>
                <FormItem className="flex grow-0 items-center space-x-3">
                  <FormControl>
                    <RadioGroupItem value="one way" id="one way" aria-label="One Way Flight" />
                  </FormControl>
                  <FormLabel htmlFor="one way" className="cursor-pointer">
                    One Way
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
          )}
        />
        {/* Flight Trip Type end */}
        <div>
          {/* Flight Airports start */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 mb-6">
            {/* Origin start */}
            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem id="origin-airport">
                  <FormLabel className="block mb-2">From:</FormLabel>
                  <Dropdown
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Select airport"
                    options={airports.airports.filter(
                      (airport) => airport.code !== form.getValues('destination'),
                    )}
                  />
                  <FormMessage className="mt-1" />
                </FormItem>
              )}
            />
            {/* Origin end */}
            {/* Destination start */}
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem id="destination-airport">
                  <FormLabel className="block mb-2">To:</FormLabel>
                  <Dropdown
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Select airport"
                    options={airports.airports.filter(
                      (airport) => airport.code !== form.getValues('from'),
                    )}
                  />
                  <FormMessage className="mt-2" />
                </FormItem>
              )}
            />
            {/* Destination end */}
          </div>
          {/* Flight Airports end */}

          {/* Flight Dates start */}
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {/* Depart date start */}
            <FormField
              control={form.control}
              name="departDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="departDate" className="block mb-2">
                    Depart:
                  </FormLabel>
                  <DatePicker
                    id="departDate"
                    dateValue={field.value}
                    placeholder="Choose Date"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date);
                      handleDepartDateChange(form, date);
                    }}
                    fromDate={add(new Date(), { days: 1 })}
                    toDate={add(new Date(), { years: 1 })}
                  />
                  <FormMessage className="mt-1" />
                </FormItem>
              )}
            />
            {/* Depart date end */}

            {/* Return date start */}
            {form.getValues('tripType') === 'return' && (
              <FormField
                control={form.control}
                name="returnDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="returnDate" className="block mb-2">
                      Return:
                    </FormLabel>
                    <DatePicker
                      id="returnDate"
                      dateValue={field.value}
                      placeholder="Choose Date"
                      selected={field.value}
                      onSelect={field.onChange}
                      fromDate={
                        isDate(form.getValues('departDate'))
                          ? form.getValues('departDate')
                          : add(new Date(), { days: 1 })
                      }
                      toDate={add(new Date(), { years: 1 })}
                    />
                    <FormMessage className="mt-1" />
                  </FormItem>
                )}
              />
            )}
            {/* Return date end */}
          </div>
          {/* Flight Dates end */}
        </div>
        {/* Passengers start */}
        <div className="w-44 mobile:mb-6">
          <FormLabel className="mb-4 block">Passengers:</FormLabel>
          {/* Adults start */}
          <FormField
            control={form.control}
            name="adults"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between mb-2">
                <FormLabel htmlFor={field.name}>Adult{Number(field.value) > 1 && 's'}</FormLabel>
                <Counter
                  minPassengers="1"
                  maxPassengers="3"
                  field={field}
                  onDecrease={handleDecrease}
                  onIncrease={handleIncrease}
                  form={form}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Adults end */}
          {/* Children start */}
          <FormField
            control={form.control}
            name="children"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel htmlFor={field.name}>Children</FormLabel>
                <Counter
                  minPassengers="0"
                  maxPassengers="3"
                  field={field}
                  onDecrease={handleDecrease}
                  onIncrease={handleIncrease}
                  form={form}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Children end */}
        </div>
        {/* Passengers end */}

        <Button
          type="submit"
          className="justify-self-end self-end row-auto gap-x-1 font-semi"
          disabled={isPending}>
          {isPending ? (
            <>
              Searching
              <Loader2Icon size={18} strokeWidth={3} className="animate-spin" />
            </>
          ) : (
            'Search'
          )}
        </Button>
      </form>
    </Form>
  );
}
