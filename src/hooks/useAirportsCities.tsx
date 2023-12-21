import { useSessionStorage } from '@uidotdev/usehooks';

export function useAirportsCities() {
  const [airportCity, setAirportCity] = useSessionStorage('airportCity', {
    originCity: '',
    destinationCity: '',
    tripType: '',
  });

  return { airportCity, setAirportCity };
}
