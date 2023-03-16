import { Grid, VStack } from '@chakra-ui/react';
import Filter from './components/Filter';
import VoucherCard from './components/VoucherCard';
import { Vouchers } from './static-data/staticData';

const Home = () => {
  return (
    <Grid templateColumns={{ base: '1fr', lg: '380px 1fr' }} gap={5}>
      <div>
        <Filter />
      </div>
      <VStack gap={4} w="full">
        {Vouchers.map(({ ...props }, i) => (
          <VoucherCard key={`item-${i}`} {...props} />
        ))}
      </VStack>
    </Grid>
  );
};

export default Home;
