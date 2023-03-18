import { Avatar } from '@chakra-ui/avatar';
import { Card, CardBody, CardFooter, CardHeader } from '@chakra-ui/card';
import { Box, Heading, HStack, Text, Stack } from '@chakra-ui/layout';
import { Tag, TagLabel } from '@chakra-ui/react';
import CheckoutButton from '@dashboard/components/CheckoutButton';
// import Rating from '@dashboard/components/Rating';
import { ICoupon } from '@dashboard/interfaces/coupon.interface';
import dayjs from 'dayjs';

const VoucherCard = ({
  title,
  description,
  bidAmount,
  createdBy,
  _id,
  brand,
  categories,
  validUpto,
}: ICoupon) => {
  const createdByName = `${createdBy?.firstName ?? ''} ${
    createdBy?.lastName ?? ''
  }`;

  return (
    <Card background="customBg" w="full" p={4} variant="outline">
      <CardHeader p={0}>
        <HStack justifyContent="space-between" alignItems="center">
          <Heading size={'md'} fontWeight={500}>
            {title}
          </Heading>
          {/* <VerifiedIcon /> */}
        </HStack>
      </CardHeader>
      <CardBody p={0} pt={2}>
        <Text fontWeight={400}>{description}</Text>
        <HStack mt={1}>
          <Text>Brand : </Text>
          <Text fontWeight="bold">{(brand as any)?.name}</Text>
        </HStack>
        <HStack mt={1}>
          <Text>Categories : </Text>
          <HStack mt={2}>
            {(categories as any).map((cat: any) => (
              <Tag key={`${_id}-${cat?._id}`} colorScheme="purple">
                <TagLabel>{cat.name}</TagLabel>
              </Tag>
            ))}
          </HStack>
        </HStack>
        <HStack mt={1}>
          <Text>Expires in : </Text>
          <Text fontWeight="bold">
            {dayjs(validUpto).diff(new Date(), 'days')} days
          </Text>
        </HStack>
      </CardBody>
      <CardFooter p={0} pt={3}>
        <Stack
          justifyContent="space-between"
          w="full"
          gap={2}
          flexDir={{ base: 'column', md: 'row' }}
        >
          <HStack gap={2} flex={1}>
            <Avatar name={createdByName} size="md" />
            <Box>
              <Text mb={1}>{createdByName}</Text>
              {/* <Rating
                // size={5}
                icon="star"
                scale={5}
                fillColor="gold"
                strokeColor="grey"
              /> */}
            </Box>
          </HStack>
          <HStack gap={4} justifyContent="space-between" m={0}>
            <Text fontWeight={500} fontSize="2xl">{`Rs. ${bidAmount}`}</Text>
            <CheckoutButton couponId={_id} creator={createdBy?._id} />
            {/* <Button variant="primary" as={Link} to={`/checkout/${_id}`}>
              Purchase
            </Button> */}
          </HStack>
        </Stack>
      </CardFooter>
    </Card>
  );
};

export default VoucherCard;
