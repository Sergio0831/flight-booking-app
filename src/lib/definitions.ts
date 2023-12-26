import { z } from 'zod';

// Booking form types
export type BookingFormValues = {
  tripType: 'return' | 'one way';
  from: string;
  destination: string;
  departDate: Date;
  returnDate: Date;
  adults: string;
  children: string;
};

export type SearchFlightsParams = Omit<BookingFormValues, 'departDate' | 'returnDate'> & {
  formatedDepartDate: string;
  formatedReturnDate: string;
};

// Passenger form types
const passengerSchema = z.object({
  title: z
    .string({
      required_error: 'Select title',
    })
    .trim(),
  gender: z
    .string({
      required_error: 'Select gender',
    })
    .trim(),
  dob: z.date({
    required_error: 'Select date of birth',
  }),
  firstName: z
    .string({
      required_error: 'First name is required',
    })
    .trim()
    .min(2, { message: 'First name must be at least 2 characters.' }),
  familyName: z
    .string({
      required_error: 'Family name is required',
    })
    .min(2, { message: 'Family name must be at least 2 characters.' })
    .trim(),
});

export const passengerFormValuesSchema = z.object({
  passengers: z.array(passengerSchema),
});

export type PassengersFormValues = z.infer<typeof passengerFormValuesSchema>;

// Airport type
export type Airport = {
  code: string;
  name: string;
  city: string;
  country: string;
};

// Passenger type
export type PassengerType = 'adult' | 'child';

// Flights offers types
export type Passenger = {
  id: string;
  type: PassengerType;
};

export type Segment = {
  segmentId: string;
  departingAt: string;
  arrivingAt: string;
  airlineLogo: string;
};

export type Slice = {
  sliceId: string;
  duration: string;
  origin: string;
  originCity: string;
  destination: string;
  destinationCity: string;
  segments: Segment[];
};

export type Offer = {
  id: string;
  totalAmount: string;
  totalCurrency: string;
  passengers: Passenger[];
  slices: Slice[];
};

export type Offers = {
  offers: Offer[];
};
