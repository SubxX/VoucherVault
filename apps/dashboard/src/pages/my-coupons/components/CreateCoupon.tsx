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
  Grid,
  Textarea,
} from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Controller, useForm } from 'react-hook-form';
import { Select } from 'chakra-react-select';

type ICoupon = {
  title: string;
  code: string;
  validUpto: string;
  expiresIn: number;
  paymentType: any[];
  description?: string;
  commisionPercent?: number;
  commissionAmount?: number;
  categories: any[];
  link: string;
  brand: any[];
};

const Form = ({ onClose }: any) => {
  const { control, reset, handleSubmit } = useForm<ICoupon>({
    defaultValues: {
      title: '',
      code: '',
      validUpto: '',
      expiresIn: undefined,
      paymentType: [''],
      description: '',
      categories: [],
      link: '',
      brand: [''],
    },
  });

  const onSubmit = (payload: ICoupon) => {
    console.log(payload);
  };

  return (
    <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader>Create coupon</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6} gap={3} display="grid">
        <Controller
          control={control}
          name="title"
          rules={{ required: 'Required' }}
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <FormControl isInvalid={Boolean(errors?.title?.message)}>
              <FormLabel>Promo Title</FormLabel>
              <Input
                placeholder="Enter Promo Title"
                value={value}
                onChange={onChange}
              />
              <FormErrorMessage>{errors?.code?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="brand"
          rules={{ required: 'Required' }}
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <FormControl isInvalid={Boolean(errors?.brand?.message)}>
              <FormLabel>Brand</FormLabel>
              <Select
                value={value}
                onChange={onChange}
                colorScheme="purple"
                options={[
                  {
                    label: 'Nyka',
                    value: 'nyka',
                  },
                  {
                    label: 'Paytm',
                    value: 'paytm',
                  },
                ]}
              />
              <FormErrorMessage>{errors?.brand?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="categories"
          rules={{ required: 'Required' }}
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <FormControl isInvalid={Boolean(errors?.categories?.message)}>
              <FormLabel>Categories</FormLabel>
              <Select
                value={value}
                onChange={onChange}
                isMulti
                colorScheme="purple"
                options={[
                  {
                    label: 'Nyka',
                    value: 'nyka',
                  },
                  {
                    label: 'Paytm',
                    value: 'paytm',
                  },
                ]}
              />
              <FormErrorMessage>{errors?.categories?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Grid gridTemplateColumns="1fr 1fr" gap={6}>
          <Controller
            control={control}
            name="validUpto"
            rules={{ required: 'Required' }}
            render={({ field: { value, onChange }, formState: { errors } }) => (
              <FormControl isInvalid={Boolean(errors?.validUpto?.message)}>
                <FormLabel>Valid Upto</FormLabel>
                <Input
                  placeholder="Valid Upto"
                  value={value}
                  onChange={onChange}
                />
                <FormErrorMessage>
                  {errors?.validUpto?.message}
                </FormErrorMessage>
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="expiresIn"
            rules={{ required: 'Required' }}
            render={({ field: { value, onChange }, formState: { errors } }) => (
              <FormControl isInvalid={Boolean(errors?.expiresIn?.message)}>
                <FormLabel>Valid Upto</FormLabel>
                <Input
                  placeholder="Expires In"
                  value={value}
                  onChange={onChange}
                />
                <FormErrorMessage>
                  {errors?.expiresIn?.message}
                </FormErrorMessage>
              </FormControl>
            )}
          />
        </Grid>

        <Controller
          control={control}
          name="paymentType"
          rules={{ required: 'Required' }}
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <FormControl isInvalid={Boolean(errors?.paymentType?.message)}>
              <FormLabel>Payment Type</FormLabel>
              <Select
                value={value}
                onChange={onChange}
                colorScheme="purple"
                options={[
                  {
                    label: 'Nyka',
                    value: 'nyka',
                  },
                  {
                    label: 'Paytm',
                    value: 'paytm',
                  },
                ]}
              />
              <FormErrorMessage>
                {errors?.paymentType?.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="code"
          rules={{ required: 'Required' }}
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <FormControl isInvalid={Boolean(errors?.code?.message)}>
              <FormLabel>Promo Code</FormLabel>
              <Input
                placeholder="Enter Code"
                value={value}
                onChange={onChange}
              />
              <FormErrorMessage>{errors?.code?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="description"
          rules={{ required: 'Required' }}
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <FormControl isInvalid={Boolean(errors?.description?.message)}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Enter Description if any"
                value={value}
                onChange={onChange}
              />

              <FormErrorMessage>
                {errors?.description?.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />
      </ModalBody>

      <ModalFooter>
        <Button variant="primary" mr={3} type="submit">
          Save
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </ModalContent>
  );
};

const CreateCoupon = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        onClick={onOpen}
        variant="primary"
        aria-label="Create Coupon"
        size="sm"
      >
        <AiOutlinePlus />
      </IconButton>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <Form onClose={onClose} />
      </Modal>
    </>
  );
};

export default CreateCoupon;
