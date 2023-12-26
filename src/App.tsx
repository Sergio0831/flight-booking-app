import AppContainer from './components/layout/app-container';
import Sidebar from './components/layout/sidebar';
import Content from './components/layout/content';
import { useSteps } from './hooks/useSteps';
import { BookingForm } from './components/booking-form';
import OffersList from './components/offers/OffersList';
import PassengersInfo from './components/passengers-info';

function App() {
  const { currentStep } = useSteps();

  return (
    <AppContainer>
      <Sidebar />
      <Content>
        {currentStep === 1 && <BookingForm />}
        {currentStep === 2 && <OffersList />}
        {currentStep === 3 && <PassengersInfo />}
        {currentStep === 4 && <h1>Step {currentStep}</h1>}
      </Content>
    </AppContainer>
  );
}

export default App;
