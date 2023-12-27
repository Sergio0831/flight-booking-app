import { Suspense, lazy } from 'react';

import AppContainer from './components/layout/AppContainer';

import { useSteps } from './hooks/useSteps';
import Sidebar from './components/layout/Sidebar';
import Content from './components/layout/Content';
import Loader from './components/loader';

const BookingForm = lazy(() => import('./components/booking-form'));
const OffersList = lazy(() => import('./components/offers/OffersList'));
const PassengersInfo = lazy(() => import('./components/passengers-info'));
const Summary = lazy(() => import('./components/summary'));

function App() {
  const { currentStep } = useSteps();

  return (
    <AppContainer>
      <Sidebar />
      <Content>
        {currentStep === 1 && (
          <Suspense fallback={<Loader />}>
            <BookingForm />
          </Suspense>
        )}
        {currentStep === 2 && (
          <Suspense fallback={<Loader />}>
            <OffersList />
          </Suspense>
        )}
        {currentStep === 3 && (
          <Suspense fallback={<Loader />}>
            <PassengersInfo />
          </Suspense>
        )}
        {currentStep === 4 && (
          <Suspense fallback={<Loader />}>
            <Summary />
          </Suspense>
        )}
      </Content>
    </AppContainer>
  );
}

export default App;
