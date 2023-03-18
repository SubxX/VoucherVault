import { Routes, Route } from 'react-router-dom';
import { ChakraBaseProvider } from '@chakra-ui/react';
import { theme } from '../theme';

// Layouts
import DashboardLayout from '../layouts/DashboardLayout';
import AppLayout from '../layouts/AppLayout';

// Components

// Pages
import Home from '../pages/home';
import MyCoupons from '../pages/my-coupons';
import MyOrders from '../pages/my-orders';
import Profile from '../pages/profile';
import DashboardHome from '@dashboard/pages/dashboard-home';

// Hooks
import useSupabaseAuthStateListener from '@dashboard/hooks/useSupabaseAuthStateListener';
import useInitUser from '@dashboard/hooks/useInitUser';

function App() {
  useSupabaseAuthStateListener();
  useInitUser();

  return (
    <ChakraBaseProvider theme={theme}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" index element={<Home />} />
        </Route>

        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="my-coupons" element={<MyCoupons />} />
          <Route path="my-orders" element={<MyOrders />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<p>404</p>} />
      </Routes>
    </ChakraBaseProvider>
  );
}

export default App;
