import { useEffect, useState } from 'react';
import { Duffel } from '@duffel/api';
import './App.css';
// import axios from 'axios';

const ACCESS_TOKEN = 'duffel_test_Vv4A0ZMBCW92TyRL1EErp2C21CD4AWLBqOs2gCXEjZH';

// const url = 'http://localhost:3001/api/offer_requests';

// const queryParams = new URLSearchParams({
//   slices: JSON.stringify([
//     {
//       origin: 'NYC',
//       destination: 'ATL',
//       departure_date: '2021-06-21',
//     },
//     {
//       origin: 'ATL',
//       destination: 'NYC',
//       departure_date: '2021-07-21',
//     },
//   ]),
//   passengers: JSON.stringify([
//     { type: 'adult' },
//     { type: 'adult' },
//     { age: 1 },
//   ]),
//   cabin_class: 'business',
// });

// const config = {
//   headers: {
//     'Accept-Encoding': 'gzip',
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//     'Duffel-Version': 'v1',
//     Authorization: `Bearer ${ACCESS_TOKEN}`,
//   },
// };

function App() {
  const [flightData, setFlightData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const duffel = new Duffel({ token: ACCESS_TOKEN });
      try {
        const response = await duffel.offerRequests.create({
          slices: [
            {
              origin: 'DUB', // Dublin Airport code
              destination: 'RIX', // Riga Airport code
              departure_date: '2023-11-30',
            },
          ],
          passengers: [{ type: 'adult' }],
          cabin_class: 'economy',
          return_offers: false,
        });
        console.log(response.data);
        setFlightData(response.data);
      } catch (error) {
        console.error('Error:', error.message || error);
        setError('Error fetching flight data');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>React Flights Booking App</h1>

      {error && <p>{error}</p>}

      {flightData && (
        <div>
          <h2>Flight Data</h2>
          <pre>{JSON.stringify(flightData, null, 2)}</pre>
        </div>
      )}
    </>
  );
}

export default App;
