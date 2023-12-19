import { Airport } from '@/lib/definitions';
import { FormControl } from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type DropdownProps = {
  onValueChange: (value: string) => void;
  defaultValue?: string;
  placeholder: string;
  options: Airport[];
};

export default function Dropdown({
  onValueChange,
  defaultValue,
  placeholder,
  options,
}: DropdownProps) {
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {options.map((airport) => (
          <SelectItem key={airport.code} value={airport.code}>
            {airport.city} ({airport.code})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
