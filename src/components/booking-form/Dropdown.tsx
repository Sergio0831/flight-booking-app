import { Airport } from '@/lib/definitions';
import { FormControl } from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type DropdownProps = {
  onValueChange: (value: string) => void;
  defaultValue?: string;
  placeholder: string;
  options: Airport[];
};

/**
 * Dropdown component for selecting options.
 * @param onValueChange - Callback function when the selected value changes.
 * @param defaultValue - The default selected value.
 * @param placeholder - The placeholder text when no option is selected.
 * @param options - The array of options to display in the dropdown.
 */
export default function Dropdown({
  onValueChange,
  defaultValue,
  placeholder,
  options,
}: DropdownProps) {
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <FormControl>
        <SelectTrigger aria-label="Select Airport">
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
