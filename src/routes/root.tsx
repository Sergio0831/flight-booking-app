import AppContainer from '@/components/layout/app-container';
import Sidebar from '@/components/layout/sidebar';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <AppContainer>
      <Sidebar />
      <div>
        <Outlet />
      </div>
    </AppContainer>
  );
}
