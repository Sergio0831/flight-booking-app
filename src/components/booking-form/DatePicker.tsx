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

/**
 * DatePicker component for selecting dates.
 * @param dateValue - The selected date value.
 * @param placeholder - The placeholder text when no date is selected.
 * @param selected - The selected date or dates.
 * @param captionLayout - The layout for the calendar caption.
 * @param onSelect - Callback function when a date is selected.
 * @param fromDate - The earliest selectable date.
 * @param toDate - The latest selectable date.
 * @param id - The unique identifier for the DatePicker component.
 */
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
