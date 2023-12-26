import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useFetchOffer } from '@/hooks/useFetchOffer';
import { useOfferId } from '@/hooks/useOfferId';
import { useSteps } from '@/hooks/useSteps';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { PassengersFormValues, passengerFormValuesSchema } from '@/lib/definitions';
import DatePicker from '../booking-form/date-picker';
import { sub } from 'date-fns';

export default function PassengersForm() {
  const { goBackwards, goToSection } = useSteps();
  const { offerId } = useOfferId();
  const { data, isLoading } = useFetchOffer(offerId);

  const counts = {
    adult: 0,
    child: 0,
  };

  const form = useForm<PassengersFormValues>({
    resolver: zodResolver(passengerFormValuesSchema),
  });

  function onSubmit(data: PassengersFormValues) {
    console.log(data.passengers);
  }

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (!data || !data.passengers || data.passengers.length === 0) {
    // If data is not available or there are no passengers, go to section 1
    goToSection(1);
    return null;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid content-between gap-y-10">
        <div className="grid gap-y-7">
          {data &&
            data.passengers.map((pass, index, array) => {
              const typeCount = array.filter((item) => item.type === pass.type).length;
              let passengerLabel = '';

              if (pass.type === 'adult') {
                counts.adult++;
                passengerLabel = typeCount > 1 ? `Adult ${counts.adult}:` : 'Adult:';
              } else if (pass.type === 'child') {
                counts.child++;
                passengerLabel = typeCount > 1 ? `Child ${counts.child}:` : 'Child:';
              }

              return (
                <div key={pass.id}>
                  <h2 className="mb-2 font-semi text-md">{passengerLabel}</h2>
                  <div className="flex flex-wrap mb-3 gap-4">
                    {/* Passenger gender start */}
                    <FormField
                      control={form.control}
                      name={`passengers.${index}.gender`}
                      render={({ field }) => (
                        <FormItem className="space-y-1 flex-1">
                          <FormLabel htmlFor={`${index}-gender`}>Gender*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="m">Male</SelectItem>
                              <SelectItem value="f">Female</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Passenger gender end */}

                    {/* Passenger title start */}
                    <FormField
                      control={form.control}
                      name={`passengers.${index}.title`}
                      render={({ field }) => (
                        <FormItem className="space-y-1 flex-1">
                          <FormLabel htmlFor={`${index}-title`}>Title*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select title" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="mr">Mr.</SelectItem>
                              {pass.type === 'adult' && (
                                <>
                                  <SelectItem value="ms">Ms.</SelectItem>
                                  <SelectItem value="mrs">Mrs.</SelectItem>
                                </>
                              )}
                              <SelectItem value="miss">Miss.</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Passenger title end */}

                    {/* Passenger date of birth start */}
                    <FormField
                      control={form.control}
                      name={`passengers.${index}.dob`}
                      render={({ field }) => (
                        <FormItem className="space-y-1 flex-1">
                          <FormLabel htmlFor="dob" className="">
                            Date of birth*
                          </FormLabel>
                          <DatePicker
                            id="departDate"
                            captionLayout="dropdown"
                            dateValue={field.value}
                            placeholder="Choose Date"
                            selected={field.value}
                            onSelect={field.onChange}
                            fromDate={new Date('1950-12-12')}
                            toDate={sub(new Date(), { days: 1 })}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Passenger date of birth end */}
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {/* Passenger first name start */}
                    <FormField
                      control={form.control}
                      name={`passengers.${index}.firstName`}
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel htmlFor={`${index}-firstName`}>First name*</FormLabel>
                          <FormControl>
                            <Input
                              className="bg-transparent"
                              type="text"
                              id={`${index}-firstName`}
                              placeholder="Enter first name"
                              {...form.register(`passengers.${index}.firstName`, {
                                value: field.value,
                              })}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Passenger first name end */}
                    {/* Passenger family name start */}
                    <FormField
                      control={form.control}
                      name={`passengers.${index}.familyName`}
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel htmlFor={`${index}-familyName`}>Family name*</FormLabel>
                          <FormControl>
                            <Input
                              className="bg-transparent"
                              type="text"
                              id={`${index}-familyName`}
                              placeholder="Enter family name"
                              {...form.register(`passengers.${index}.familyName`, {
                                value: field.value,
                              })}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Passenger family name end */}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="flex">
          <Button type="button" variant="link" onClick={() => goBackwards()}>
            Go Back
          </Button>
          <Button type="submit" className="ml-auto">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
