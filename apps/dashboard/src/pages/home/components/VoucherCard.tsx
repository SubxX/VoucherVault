import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { Card, CardBody, CardFooter, CardHeader } from '@chakra-ui/card';
import { Box, Heading, HStack, Text, Stack } from '@chakra-ui/layout';
import VerifiedIcon from '@dashboard/assets/icons/VerifiedIcon';
import Rating from '@dashboard/components/Rating';
import { IVoucher } from '@dashboard/interfaces/coupon.interface';
import { Link } from 'react-router-dom';

const VoucherCard = ({
  title,
  description,
  sellerName,
  price,
  rating,
  _id,
}: IVoucher) => {
  return (
    <Card background="customBg" w="full" p={4} variant="outline">
      <CardHeader p={0}>
        <HStack justifyContent="space-between" alignItems="center">
          <Heading size={'md'} fontWeight={500}>
            {title}
          </Heading>
          <VerifiedIcon />
        </HStack>
      </CardHeader>
      <CardBody p={0} pt={2}>
        <Text fontWeight={400} fontSize="sm">
          {description}
        </Text>
      </CardBody>
      <CardFooter p={0} pt={3}>
        <Stack
          justifyContent="space-between"
          w="full"
          gap={2}
          flexDir={{ base: 'column', md: 'row' }}
        >
          <HStack gap={2} flex={1}>
            <Avatar name={sellerName} size="md" />
            <Box>
              <Text mb={1}>{sellerName}</Text>
              <Rating
                // size={5}
                icon="star"
                scale={5}
                fillColor="gold"
                strokeColor="grey"
              />
            </Box>
          </HStack>
          <HStack gap={4} justifyContent="space-between" m={0}>
            <Text fontWeight={500} fontSize="2xl">{`Rs. ${price}`}</Text>
            <Button variant="primary" as={Link} to={`/checkout/${_id}`}>
              Purchase
            </Button>
          </HStack>
        </Stack>
      </CardFooter>
    </Card>
  );
};

export default VoucherCard;
