// import { ModeToggle } from './components/mode-toggle';
import AppContainer from './components/layout/app-container';
import Sidebar from './components/layout/sidebar';
import Content from './components/layout/content';
import Header from './components/layout/header';
import { BookingForm } from './components/booking-form';
import { useSteps } from './hooks/useSteps';
import { Button } from './components/ui/button';

function App() {
  const { currentStep, goBackwards } = useSteps();

  return (
    <AppContainer>
      <Sidebar />
      <Content>
        <Header />
        {currentStep === 0 && <BookingForm />}
        {currentStep === 1 && (
          <>
            <h1>Step {currentStep + 1}</h1>
            <Button type="button" variant="link" onClick={() => goBackwards()}>
              Go Back
            </Button>
          </>
        )}
        {currentStep === 2 && <h1>Step {currentStep + 1}</h1>}
        {currentStep === 3 && <h1>Step {currentStep + 1}</h1>}
      </Content>
    </AppContainer>
  );
}

export default App;
