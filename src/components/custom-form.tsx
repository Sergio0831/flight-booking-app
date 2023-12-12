import { valibotResolver } from '@hookform/resolvers/valibot';
import { useForm } from 'react-hook-form';
import * as v from 'valibot';
import { toast } from './ui/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import data from '../data/airports.json';
import { Button } from './ui/button';

const FormSchema = v.object({
  from: v.string('Select from airport'),
  destination: v.string('Select destination airport'),
});

export function CustomForm() {
  const form = useForm<v.Input<typeof FormSchema>>({
    resolver: valibotResolver(FormSchema),
    defaultValues: {
      from: 'LHR',
    },
  });

  function onSubmit(data: v.Input<typeof FormSchema>) {
    const { destination, from } = data;

    toast({
      title: 'Your flight',
      description: (
        <p>
          You fly from: {from}, To: {destination}
        </p>
      ),
    });
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 py-3 mx-auto">
        <div className="flex flex-wrap gap-3">
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From:</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={data.airports[0].code}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select airport" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data.airports.map((airport) => (
                      <SelectItem key={airport.code} value={airport.code}>
                        {airport.city} ({airport.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}></FormField>
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>To:</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select airport" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data.airports.map((airport) => (
                      <SelectItem key={airport.code} value={airport.code}>
                        {airport.city} ({airport.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}></FormField>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
