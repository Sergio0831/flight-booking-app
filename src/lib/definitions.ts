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

// Airport type
export type Airport = {
  code: string;
  name: string;
  city: string;
  country: string;
};

// Flights offers types
type Passenger = {
  id: string;
  type: string;
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
