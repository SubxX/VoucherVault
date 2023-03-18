import { Center, Container, Spinner, VStack } from '@chakra-ui/react';
import CouponCard from './components/CouponCard';
import DashboardHeader from '@dashboard/components/DashboardHeader';
import CreateCoupon from './components/CreateCoupon';
import { useGetMyCouponsQuery } from '@dashboard/store/api/coupon.query';
import LinkBankAccount from '@dashboard/components/LinkBankAccount';

const MyCoupons = () => {
  const { data: coupons, isLoading } = useGetMyCouponsQuery();

  return (
    <>
      <DashboardHeader title="My Coupons" actions={<CreateCoupon />} />

      <Container py={4}>
        {isLoading && (
          <Center>
            <Spinner />
          </Center>
        )}

        <LinkBankAccount />

        {!isLoading && !coupons?.length && <Center>No coupons found!</Center>}

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
