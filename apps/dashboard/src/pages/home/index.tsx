import { Grid, VStack } from '@chakra-ui/react';
import { useGetCouponsQuery } from '@dashboard/store/api/coupon.query';
import { useState } from 'react';
import Filter from './components/Filter';
import VoucherCard from './components/VoucherCard';

const Home = () => {
  const [query, setQuery] = useState('');
  const { data: coupons } = useGetCouponsQuery(query);

  return (
    <Grid templateColumns={{ base: '1fr', lg: '380px 1fr' }} gap={5}>
      <div>
        <Filter setQuery={setQuery} />
      </div>
      <VStack gap={4} w="full">
        {coupons?.map(({ ...props }, i) => (
          <VoucherCard key={`item-${i}`} {...props} />
        ))}
      </VStack>
    </Grid>
  );
};

export default Home;
