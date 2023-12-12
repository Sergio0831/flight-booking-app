import { ThemeProvider } from '@/components/theme-provider';
// import { ModeToggle } from './components/mode-toggle';
import { CustomForm } from './components/custom-form';
import AppContainer from './components/layout/app-container';
import Sidebar from './components/layout/sidebar';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppContainer>
        <Sidebar />
        <CustomForm />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
