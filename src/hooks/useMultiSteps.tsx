import { useState } from 'react';

const useMultiSteps = (steps: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goBackwards = () => {
    if (currentIndex === 0) return;
    setCurrentIndex((prev) => prev - 1);
  };

  const goForwards = () => {
    if (currentIndex === steps - 1) return;
    setCurrentIndex((prev) => prev + 1);
  };

  // go to section
  const goToSection = (item: number) => {
    setCurrentIndex(item);
  };

  return {
    currentIndex,
    goForwards,
    goBackwards,
    goToSection,
    isFirstStep: currentIndex === 0,
    isLastStep: currentIndex === steps - 2,
    isConfirmation: currentIndex === steps - 1,
  };
};

export default useMultiSteps;
