import { Container, VStack } from '@chakra-ui/react';
import CouponCard from './components/CouponCard';
import DashboardHeader from '@dashboard/components/DashboardHeader';
import CreateCoupon from './components/CreateCoupon';
import { useGetMyCouponsQuery } from '@dashboard/store/api/coupon.query';

const MyCoupons = () => {
  const { data: coupons } = useGetMyCouponsQuery();

  return (
    <>
      <DashboardHeader title="My Coupons" actions={<CreateCoupon />} />

      <Container py={4}>
        <VStack gap={2}>
          {coupons?.map((v, i) => (
            <CouponCard key={v._id} {...v} />
          ))}
        </VStack>
      </Container>
    </>
  );
};

export default MyCoupons;
