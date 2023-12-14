import { StepsProviderContext } from '@/providers/steps-provider';
import { useContext } from 'react';

export const useSteps = () => {
  const context = useContext(StepsProviderContext);

  if (context === undefined) throw new Error('useSteps must be used within a ThemeProvider');

  return context;
};
