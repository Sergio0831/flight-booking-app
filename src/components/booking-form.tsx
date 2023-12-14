import { useForm } from 'react-hook-form';
import { add, format, isDate } from 'date-fns';
import { CalendarDaysIcon, MinusCircleIcon, PlusCircleIcon } from 'lucide-react';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Calendar } from './ui/calendar';
import { Button } from './ui/button';

import data from '../data/airports.json';

import { useSteps } from '@/hooks/useSteps';
import { BookingFormValues } from '@/lib/definitions';
import { bookingFormResolver } from '@/lib/resolvers';
import { handleDepartDateChange } from '@/lib/utils';
import { Input } from './ui/input';

/**
 * Component for the Booking Form.
 * Manages a multi-step form for booking flights.
 *
 * @returns {JSX.Element}
 */
export function BookingForm(): JSX.Element {
  const { goForwards } = useSteps();

  const form = useForm<BookingFormValues>({
    resolver: bookingFormResolver,
    defaultValues: {
      tripType: 'return',
      from: 'LHR',
      adults: '1',
    },
  });

  /**
   * Handles the form submission for the BookingForm component.
   *
   * @param {BookingFormValues} data
   */
  function onSubmit(data: BookingFormValues) {
    const { departDate, returnDate, adults } = data;
    const formatedDepartDate = format(departDate, 'yyyy-MM-dd');
    const formatedReturnDate = returnDate ? format(returnDate, 'yyyy-MM-dd') : '';
    const adultsNumber = Number(adults);

    console.log(`Departure date ${formatedDepartDate}`);
    console.log(`Return date ${formatedReturnDate}`);
    console.log(`Adults ${adultsNumber}`);
    console.log(`Typeof adult ${typeof adults}`);

    goForwards();
  }

  /**
   *
   * @param {string} value
   */
  function handleIncrease(value: string) {
    const numValue = parseInt(value, 10) || 0;
    form.setValue('adults', Math.min(numValue + 1, 5).toString());
  }

  /**
   *
   * @param {string} value
   */
  function handleDecrease(value: string) {
    const numValue = parseInt(value, 10) || 0;
    form.setValue('adults', Math.max(numValue - 1, 1).toString());
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 justify-between">
        <FormItem className="">
          {/* Flight Trip Type start */}
          <FormField
            control={form.control}
            name="tripType"
            render={({ field }) => (
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue="return"
                  className="gap-x-8 mb-8">
                  <FormItem className="flex grow-0 items-center space-x-3">
                    <FormControl>
                      <RadioGroupItem value="return" id="return" />
                    </FormControl>
                    <FormLabel htmlFor="return" className="cursor-pointer">
                      Return Trip
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex grow-0 items-center space-x-3">
                    <FormControl>
                      <RadioGroupItem value="one way" id="one way" />
                    </FormControl>
                    <FormLabel htmlFor="one way" className="cursor-pointer">
                      One Way
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            )}
          />
          {/* Flight Trip Type start */}

          {/* Flight Destinations start */}
          <FormItem id="destinations" className="flex flex-wrap gap-x-8    gap-y-4 mb-6">
            {/* Destinations from start */}
            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem className="basis-44">
                  <FormLabel className="block mb-2" htmlFor="destFrom">
                    From:
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={data.airports[0].code}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select airport" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data.airports
                        .filter((airport) => airport.code !== form.getValues('destination'))
                        .map((airport) => (
                          <SelectItem key={airport.code} value={airport.code}>
                            {airport.city} ({airport.code})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="mt-1" />
                </FormItem>
              )}
            />
            {/* Destinations from end */}

            {/* Destinations to start */}
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem className="basis-44">
                  <FormLabel className="block mb-2">To:</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select airport" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data.airports
                        .filter((airport) => airport.code !== form.getValues('from'))
                        .map((airport) => (
                          <SelectItem key={airport.code} value={airport.code}>
                            {airport.city} ({airport.code})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="mt-2" />
                </FormItem>
              )}
            />
            {/* Destinations to end */}
          </FormItem>
          {/* Flight Destinations end */}

          {/* Flight Dates start */}
          <FormItem id="dates" className="flex flex-wrap gap-x-8    gap-y-4 mb-6">
            {/* Depart date start */}
            <FormField
              control={form.control}
              name="departDate"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel htmlFor="departDate" className="block mb-2">
                    Depart:
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          id="departDate"
                          aria-label="Open/Close Calendar"
                          variant="outline"
                          className="bg-transparent hover:bg-inherit w-full px-3 justify-between">
                          {field.value ? (
                            format(field.value, 'yyyy-MM-dd')
                          ) : (
                            <span>Choose Date</span>
                          )}
                          <CalendarDaysIcon strokeWidth={1} />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          handleDepartDateChange(form, date);
                        }}
                        fromDate={add(new Date(), { days: 1 })}
                        toDate={add(new Date(), { years: 1 })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
                  <FormItem className="">
                    <FormLabel htmlFor="returnDate" className="block mb-2">
                      Return:
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            id="returnDate"
                            aria-label="Open/Close Calendar"
                            variant="outline"
                            className="bg-transparent hover:bg-inherit w-full px-3 justify-between">
                            {field.value ? (
                              format(field.value, 'yyyy-MM-dd')
                            ) : (
                              <span>Choose Date</span>
                            )}
                            <CalendarDaysIcon strokeWidth={1} />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          fromDate={
                            isDate(form.getValues('departDate'))
                              ? form.getValues('departDate')
                              : add(new Date(), { days: 1 })
                          }
                          toDate={add(new Date(), { years: 1 })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="mt-1" />
                  </FormItem>
                )}
              />
            )}

            {/* Return date end */}
          </FormItem>
          {/* Flight Dates end */}

          {/* Add passengers start */}
          <FormItem id="passengers">
            <FormLabel className="mb-3 block">Passengers:</FormLabel>
            <FormItem>
              <FormField
                control={form.control}
                name="adults"
                render={({ field }) => (
                  <FormItem id="adults" className="flex items-center gap-x-5">
                    <FormLabel htmlFor="adultsPass">Adults</FormLabel>
                    <FormItem id="adultsTriggers" className="flex items-center gap-x-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        aria-label="Increase adults passangers"
                        className="bg-transparent border-none hover:bg-inherit group h-7 w-7"
                        onClick={() => handleDecrease(field.value)}>
                        <MinusCircleIcon className="group-hover:stroke-muted transition-colors" />
                      </Button>
                      <FormControl>
                        <Input type="hidden" id="adultsPass" {...field} readOnly tabIndex={-1} />
                      </FormControl>
                      <span className="font-semi text-md">{field.value}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="bg-transparent border-none hover:bg-inherit h-7 w-7 group"
                        onClick={() => handleIncrease(field.value)}>
                        <PlusCircleIcon className="group-hover:stroke-muted transition-colors" />
                      </Button>
                    </FormItem>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormItem>
          </FormItem>
          {/* Add passengers end */}
        </FormItem>
        <Button type="submit" className="justify-self-end self-end row-auto  font-semi">
          Submit
        </Button>
      </form>
    </Form>
  );
}
