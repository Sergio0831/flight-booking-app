import { FormControl } from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { CaptionLayout, SelectSingleEventHandler } from 'react-day-picker';
import { format } from 'date-fns';
import { useState } from 'react';
import { CalendarDaysIcon } from 'lucide-react';

type DatePickerProps = {
  dateValue: Date;
  placeholder: string;
  selected: Date;
  captionLayout?: CaptionLayout;
  onSelect: SelectSingleEventHandler;
  fromDate: Date;
  toDate: Date;
  id: string;
};

export default function DatePicker({
  dateValue,
  placeholder,
  selected,
  captionLayout,
  onSelect,
  fromDate,
  toDate,
  id,
}: DatePickerProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            id={id}
            aria-label="Open/Close Calendar"
            variant="outline"
            className="bg-transparent hover:bg-inherit w-full px-3 justify-between">
            {dateValue ? format(dateValue, 'yyyy-MM-dd') : <span>{placeholder}</span>}
            <CalendarDaysIcon strokeWidth={1} />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent align="end">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(day, selectedDay, activeModifiers, e) => {
            onSelect(day, selectedDay, activeModifiers, e);
            setCalendarOpen(false);
          }}
          fromDate={fromDate}
          toDate={toDate}
          captionLayout={captionLayout}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
