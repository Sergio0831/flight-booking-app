export type BookingFormValues = {
  tripType: 'return' | 'one way';
  from: string;
  destination: string;
  departDate: Date;
  returnDate: Date;
  adults: string;
  children: string;
};
