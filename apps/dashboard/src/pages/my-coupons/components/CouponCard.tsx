import {
  CardHeader,
  Heading,
  Card,
  HStack,
  CardBody,
  Text,
  IconButton,
} from '@chakra-ui/react';
import VerifiedIcon from '@dashboard/assets/icons/VerifiedIcon';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { IVoucher } from '@dashboard/interfaces/voucher.interface';

const CouponCard = ({ title, description }: IVoucher) => {
  return (
    <Card background="customBg" w="full" p={4} variant="outline">
      <CardHeader p={0}>
        <HStack justifyContent="space-between" alignItems="center">
          <Heading size={'md'} fontWeight={500}>
            {title}
          </Heading>

          <HStack>
            <VerifiedIcon />

            <Menu>
              <MenuButton
                as={IconButton}
                icon={<RxDragHandleDots2 />}
                aria-label="Options"
                size="xs"
              />
              <MenuList>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
      </CardHeader>
      <CardBody p={0} pt={2}>
        <Text fontWeight={400} fontSize="sm">
          {description}
        </Text>
      </CardBody>
    </Card>
  );
};

export default CouponCard;
