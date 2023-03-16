import { Outlet } from 'react-router-dom';
import { Container } from '@chakra-ui/react';

import AppHeader from '../components/AppHeader';

const AppLayout = () => {
  return (
    <>
      <AppHeader />
      <Container py={8}>
        <Outlet />
      </Container>
    </>
  );
};

export default AppLayout;
