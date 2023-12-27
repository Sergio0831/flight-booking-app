import { type ClassValue, clsx } from 'clsx';
import { UseFormReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { BookingFormValues } from './definitions';

/**
 * Utility function for combining Tailwind CSS and clsx classNames.
 * @param inputs - Class names provided as argument.
 * @returns - Combined class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Handles the change of the departure date in a form and adjusts the return date if necessary.
 * @param form - The form object from react-hook-form.
 * @param newDepartDate - The new departure date.
 */
export function handleDepartDateChange(
  form: UseFormReturn<BookingFormValues>,
  newDepartDate: Date | undefined,
) {
  if (newDepartDate) {
    if (form.getValues('returnDate') && form.getValues('returnDate') < newDepartDate) {
      form.setValue('returnDate', form.getValues('departDate'));
    }
  }
}

/**
 * Handles the increase of the specified field value in a form.
 * @param value - The current value of the field.
 * @param form - The form object from react-hook-form.
 * @param field - The field identifier ('adults' or 'children').
 * @param min - The minimum value allowed for the field.
 */
export function handleIncrease(
  value: string,
  form: UseFormReturn<BookingFormValues>,
  field: 'adults' | 'children',
  max: number,
) {
  const numValue = parseInt(value, 10) || 0;
  form.setValue(field, Math.min(numValue + 1, max).toString());
}

/**
 * Handles the decrease of the specified field value in a form.
 * @param value - The current value of the field.
 * @param form - The form object from react-hook-form.
 * @param field - The field identifier ('adults' or 'children').
 * @param min - The minimum value allowed for the field.
 */
export function handleDecrease(
  value: string,
  form: UseFormReturn<BookingFormValues>,
  field: 'adults' | 'children',
  min: number,
) {
  const numValue = parseInt(value, 10) || 0;
  form.setValue(field, Math.max(numValue - 1, min).toString());
}

/**
 * Formats a duration string in ISO 8601 format to a human-readable format.
 * @param duration - The duration string in ISO 8601 format (e.g., 'PT2H30M').
 * @returns A human-readable formatted duration string (e.g., '2h 30m').
 */
export function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+)H(?:([\d]+)M)?/);

  if (match) {
    const hours = match[1];
    const minutes = match[2];

    return minutes ? `${hours}h ${minutes}m` : `${hours}h 0m`;
  } else {
    return 'Invalid duration format';
  }
}

/**
 * Converts a numeric value to a formatted currency string.
 * @param v - The numeric value to be formatted
 * @param currency - The currency code (e.g 'USD', 'EUR') for formatting
 * @returns A formatted curency string
 */
export function toCurrency(v: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    signDisplay: 'never',
  }).format(v);
}

/**
 * Capitalizes the first letter of a word.
 * @param word - The word to capitalize.
 * @returns The word with the first letter capitalized.
 */
export function capitalizeFirstLetter(word: string): string {
  // Check if the input word is not an empty string
  if (word.length === 0) {
    return word;
  }

  return word.charAt(0).toUpperCase() + word.slice(1);
}
