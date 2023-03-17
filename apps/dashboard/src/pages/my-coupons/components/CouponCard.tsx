import {
  CardHeader,
  Heading,
  Card,
  HStack,
  CardBody,
  Text,
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  AlertDialogContent,
  useDisclosure,
} from '@chakra-ui/react';
import VerifiedIcon from '@dashboard/assets/icons/VerifiedIcon';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ICoupon } from '@dashboard/interfaces/coupon.interface';
import { useDeleteCouponMutation } from '@dashboard/store/api/coupon.query';
import { useRef } from 'react';
import { useAppDispatch } from '@dashboard/store/store';
import { openDialog } from '@dashboard/store/features/coupon/coupon-handler.slice';

const CouponCard = (props: ICoupon) => {
  const { title, description, bidAmount, _id } = props;
  const [deleteCoupon, { isLoading }] = useDeleteCouponMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();
  const dispatch = useAppDispatch();

  const closeDialog = () => {
    if (isLoading) return;
    onClose();
  };
  const editCoupon = () => dispatch(openDialog(props));

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
                icon={<BiDotsVerticalRounded />}
                aria-label="Options"
                size="xs"
              />
              <MenuList>
                <MenuItem onClick={onOpen}>Delete</MenuItem>

                <AlertDialog
                  leastDestructiveRef={cancelRef}
                  isOpen={isOpen}
                  onClose={closeDialog}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Coupon
                      </AlertDialogHeader>

                      <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                      </AlertDialogBody>

                      <AlertDialogFooter>
                        <Button
                          onClick={closeDialog}
                          ref={cancelRef}
                          isDisabled={isLoading}
                        >
                          Cancel
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={deleteCoupon.bind(this, _id)}
                          ml={3}
                          isLoading={isLoading}
                        >
                          Delete
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>

                <MenuItem onClick={editCoupon}>Edit</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
      </CardHeader>
      <CardBody p={0} pt={2}>
        <Text fontWeight={400} fontSize="sm">
          {description}
        </Text>

        <HStack gap={4} justifyContent="space-between" mt={2}>
          <Text fontWeight={500} fontSize="2xl">{`Rs. ${bidAmount}`}</Text>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default CouponCard;
