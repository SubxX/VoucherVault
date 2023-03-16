import { Container, VStack } from '@chakra-ui/react';
import CouponCard from './components/CouponCard';
import { Vouchers } from '../home/static-data/staticData';
import DashboardHeader from '@dashboard/components/DashboardHeader';
import CreateCoupon from './components/CreateCoupon';

const MyCoupons = () => {
  return (
    <>
      <DashboardHeader title="My Coupons" actions={<CreateCoupon />} />

      <Container py={4}>
        <VStack gap={2}>
          {Vouchers.map((v, i) => (
            <CouponCard key={`voucher-${i}`} {...v} />
          ))}
        </VStack>
      </Container>
    </>
  );
};

export default MyCoupons;
