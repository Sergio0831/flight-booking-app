import express, { Request, Response } from 'express';
import { Duffel, DuffelError } from '@duffel/api';
import cors from 'cors';
import axios from 'axios';
import {
  DuffelResponse,
  Offer,
  OfferRequest,
  OfferSlice,
  CreateOfferRequest,
  Aircraft,
  Airline,
  Airport,
} from '@duffel/api/types';

require('dotenv').config();

const app = express();
const accessToken = process.env.ACCESS_TOKEN ?? '';

const duffel = new Duffel({
  token: accessToken,
});

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: '✨✈️✈️✈️👨🏻‍✈️👨🏻‍✈️👨🏻‍✈️🌎🌍🌏✨',
  });
});

app.get('/api/offers', async (req: Request, res: Response) => {
  try {
    const offerRequest: CreateOfferRequest = {
      slices: [
        {
          origin: 'DUB',
          destination: 'RIX',
          departure_date: '2024-01-08',
        },
        {
          origin: 'RIX',
          destination: 'DUB',
          departure_date: '2024-01-12',
        },
      ],
      passengers: [
        {
          type: 'adult',
        },
        {
          age: 10,
        },
      ],
      max_connections: 0,
    };
    const response = await duffel.offerRequests.create(offerRequest);
    const offers = response.data.offers.map((offer) => {
      return {
        airlineLogo: offer.owner.logo_symbol_url,
        totalAmount: offer.total_amount,
      };
    });

    res.json({ offers: response.data.offers });
  } catch (error) {
    if (error instanceof DuffelError) {
      res.json({
        title: error.errors[0].title,
        message: error.errors[0].message,
      });
      console.log(error);
    }
  }
});

// app.get('/api/airlines', async (req: Request, res: Response) => {
//   try {
//     // const response = await duffel.aircraft.get('arc_00009VMF8AhXSSRnQDI6Hi');
//     // const response = await duffel.airlines.get('arl_00009VME7DAyfgJ6qz2UAH');
//     // const response = await duffel.airlines.list({
//     //   limit: 10,
//     // });
//     // const response = await duffel.airports.list({
//     //   limit: 10,
//     // });
//     const response = await duffel.offerRequests.get(
//       '"orq_0000AcVElZQ3y6MQoDCyUS',
//     );
//     // const aircraft: Aircraft = response.data;
//     // const airline = response.data;
//     // const airports: OfferRequest = response.data;
//     // const airlines: Airline[] = response.data;
//     res.json(response.data);
//   } catch (error) {
//     if (error instanceof DuffelError) {
//       console.log(error.errors[0].message);
//       // console.error('Error to get aircraft:', error.message || error);
//     }
//   }
// });

export default app;
