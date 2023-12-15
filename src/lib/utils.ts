import { type ClassValue, clsx } from 'clsx';
import { UseFormReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { BookingFormValues } from './definitions';

/**
 * Utility function for combining Tailwind CSS and clsx classNames.
 *
 * @param {...ClassValue[]} inputs - Class names provided as argument.
 * @returns {string} - Combined class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Handles the change of the depart date in a booking form.
 * If the return date is set and it's before the new depart date, reset it to the depart date.
 *
 * @param {UseFormReturn<BookingFormValues>} form - The form object from React Hook Form.
 * @param {Date | undefined} newDepartDate - The new depart date.
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
 * Function to increase passenger
 *
 * @param {string} value
 * @param {UseFormReturn<BookingFormValues>} form
 * @param {string} field
 * @param {number} max
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
 *  Function to decrease passenger
 *
 * @param {string} value
 * @param {UseFormReturn<BookingFormValues>} form
 * @param {string} field
 * @param {number} min
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
