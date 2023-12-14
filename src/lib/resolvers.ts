import { Resolver } from 'react-hook-form';
import { BookingFormValues } from './definitions';

/**
 *  Resolver function for validating and handling errors in the booking form.
 *
 * @param {BookingFormValues} values
 * @returns {Resolver<BookingFormValues>}
 */
export const bookingFormResolver: Resolver<BookingFormValues> = async (values) => {
  const errors: Record<string, { type: string; message: string }> = {};

  if (!values.from) {
    errors.from = {
      type: 'required',
      message: 'Select from airport',
    };
  }

  if (!values.destination) {
    errors.destination = {
      type: 'required',
      message: 'Select destination airport',
    };
  }

  if (!values.departDate) {
    errors.departDate = {
      type: 'required',
      message: 'Choose departure date',
    };
  }

  if (values.tripType === 'return' && !values.returnDate) {
    errors.returnDate = {
      type: 'required',
      message: 'Choose departure date',
    };
  }

  if (!values.adults || parseInt(values.adults) < 1) {
    errors.adults = {
      type: 'required',
      message: 'Select at least one passenger',
    };
  }

  return {
    values,
    errors,
  };
};
