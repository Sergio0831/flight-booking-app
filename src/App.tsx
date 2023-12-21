// import { ModeToggle } from './components/mode-toggle';
import AppContainer from './components/layout/app-container';
import Sidebar from './components/layout/sidebar';
import Content from './components/layout/content';
import { useSteps } from './hooks/useSteps';
import { Button } from './components/ui/button';
import { BookingForm } from './components/booking-form';
import OffersList from './components/offers/offers-list';

function App() {
  const { currentStep, goBackwards } = useSteps();

  return (
    <AppContainer>
      <Sidebar />
      <Content>
        {currentStep === 1 && <BookingForm />}
        {currentStep === 2 && <OffersList />}
        {currentStep === 3 && (
          <Button type="button" variant="link" onClick={() => goBackwards()}>
            Go Back
          </Button>
        )}
        {currentStep === 4 && <h1>Step {currentStep}</h1>}
      </Content>
    </AppContainer>
  );
}

export default App;
