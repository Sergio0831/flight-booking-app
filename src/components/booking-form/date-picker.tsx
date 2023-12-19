import { FormControl } from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { SelectSingleEventHandler } from 'react-day-picker';
import { format } from 'date-fns';
import { useState } from 'react';

type DatePickerProps = {
  dateValue: Date;
  placeholder: string;
  icon: React.ReactNode;
  selected: Date;
  onSelect: SelectSingleEventHandler;
  fromDate: Date;
  toDate: Date;
  id: string;
};

export default function DatePicker({
  dateValue,
  placeholder,
  icon,
  selected,
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
            {icon}
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(day, selectedDay, activeModifiers, e) => {
            onSelect(day, selectedDay, activeModifiers, e);
            setCalendarOpen(false);
          }}
          fromDate={fromDate}
          toDate={toDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
