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
  Textarea,
} from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Controller, useForm } from 'react-hook-form';
import { Select } from 'chakra-react-select';
import { useGetCategoriesQuery } from '@dashboard/store/api/categories.query';
import { useGetBrandsQuery } from '@dashboard/store/api/brand.query';

type ICoupon = {
  title: string;
  code: string;
  validUpto: string;
  expiresIn?: number;
  type: any[];
  description?: string;
  commisionPercent?: number;
  commissionAmount?: number;
  categories: any[];
  link: string;
  brand: any[];
};

const Form = ({ onClose }: any) => {
  const { data: categories } = useGetCategoriesQuery();
  const { data: brands } = useGetBrandsQuery();

  const { control, reset, handleSubmit } = useForm<ICoupon>({
    defaultValues: {
      title: '',
      code: '',
      validUpto: '',
      expiresIn: undefined,
      type: [''],
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
                options={brands ?? []}
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
                options={categories ?? []}
              />
              <FormErrorMessage>{errors?.categories?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="validUpto"
          rules={{ required: 'Required' }}
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <FormControl isInvalid={Boolean(errors?.validUpto?.message)}>
              <FormLabel>Valid Upto</FormLabel>
              <Input
                type="date"
                placeholder="Valid Upto"
                value={value}
                onChange={onChange}
              />
              <FormErrorMessage>{errors?.validUpto?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="type"
          rules={{ required: 'Required' }}
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <FormControl isInvalid={Boolean(errors?.type?.message)}>
              <FormLabel>Payment Type</FormLabel>
              <Select
                value={value}
                onChange={onChange}
                colorScheme="purple"
                options={[
                  {
                    label: 'Percent',
                    value: 'PERCENT',
                  },
                  {
                    label: 'Value',
                    value: 'VALUE',
                  },
                ]}
              />
              <FormErrorMessage>{errors?.type?.message}</FormErrorMessage>
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
