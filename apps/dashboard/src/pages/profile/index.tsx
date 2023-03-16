import { Container, Text } from '@chakra-ui/react';
import DashboardHeader from '@dashboard/components/DashboardHeader';

const Profile = () => {
  return (
    <>
      <DashboardHeader title="My Profile" />
      <Container py={4}>
        <Text>Profile Page</Text>
      </Container>
    </>
  );
};

export default Profile;
