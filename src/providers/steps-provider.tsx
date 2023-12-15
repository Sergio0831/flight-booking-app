import { createContext } from 'react';
import { useSessionStorage } from '@uidotdev/usehooks';

/**
 * StepsProvider Component
 *
 * This component provides a context for managing steps in a multi-step process
 */

// Props for the StepsProvider component
type StepsProviderProps = {
  children: React.ReactNode;
  steps: number;
  defaultStep?: number;
  storageKey?: string;
};

// State shape for the StepsProvider
type StepsProviderState = {
  currentStep: number;
  goForwards: () => void;
  goBackwards: () => void;
  goToSection: (item: number) => void;
};

// Initial state for the StepsProvider
const initialState: StepsProviderState = {
  currentStep: 1,
  goForwards: () => null,
  goBackwards: () => null,
  goToSection: () => null,
};

// Create a context for the StepsProvider
export const StepsProviderContext = createContext<StepsProviderState>(initialState);

/**
 * StepsProvider Component
 *
 * @param {StepsProviderProps} props
 * @returns {JSX.Element}
 */
export function StepsProvider({
  children,
  steps,
  storageKey = 'step',
  defaultStep = 1,
}: StepsProviderProps): JSX.Element {
  // Validate steps prop insure it's positive integer
  if (typeof steps !== 'number' || steps <= 0) {
    throw new Error('Steps must be a positive integer');
  }

  const [currentStep, setCurrentStep] = useSessionStorage(storageKey, defaultStep);

  // Function to move forward to the next step
  const goForwards = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps));
  };

  // Function to move backword to the next step
  const goBackwards = () => {
    setCurrentStep((prev) => Math.max(prev - 1, defaultStep));
  };

  // Function to go to a specific step
  const goToSection = (item: number) => {
    setCurrentStep(item);
  };

  // Value to be provided by the context
  const value = {
    currentStep: currentStep,
    goForwards,
    goBackwards,
    goToSection,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps,
    isConfirmation: currentStep === steps,
  };

  // Provide the context value to the children
  return <StepsProviderContext.Provider value={value}>{children}</StepsProviderContext.Provider>;
}
