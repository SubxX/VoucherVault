import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  IconButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { GrAdd } from 'react-icons/gr';
import { Controller, useForm } from 'react-hook-form';

type ICoupon = {
  code: string;
  validUpto: string;
  expiresIn: number;
  type: string;
  description?: string;
  commisionPercent?: number;
  commissionAmount?: number;
  categories: string[];
  link: string;
  brand: string;
};

const CreateCoupon = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { control, reset, handleSubmit } = useForm<ICoupon>({
    defaultValues: {
      code: '',
      validUpto: '',
      expiresIn: undefined,
      type: '',
      description: '',
      categories: [],
      link: '',
      brand: '',
    },
  });

  const onSubmit = (payload: ICoupon) => {
    console.log(payload);
  };

  return (
    <>
      <IconButton
        onClick={onOpen}
        variant="primary"
        aria-label="Create Coupon"
        size="sm"
      >
        <GrAdd />
      </IconButton>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Create coupon</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Controller
              control={control}
              name="code"
              rules={{ required: 'Required' }}
              render={({
                field: { value, onChange },
                formState: { errors },
              }) => (
                <FormControl isInvalid={Boolean(errors?.code?.message)}>
                  <FormLabel>Code</FormLabel>
                  <Input
                    placeholder="Enter Coupon Code"
                    value={value}
                    onChange={onChange}
                  />
                  <FormErrorMessage>{errors?.code?.message}</FormErrorMessage>
                </FormControl>
              )}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCoupon;
