import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  IconButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Controller, useForm } from 'react-hook-form';
import { Select } from 'chakra-react-select';
import { useGetCategoriesQuery } from '@dashboard/store/api/categories.query';
import { useGetBrandsQuery } from '@dashboard/store/api/brand.query';
import {
  useAddCouponMutation,
  useUpdateCouponMutation,
} from '@dashboard/store/api/coupon.query';
import { ICoupon } from '@dashboard/interfaces/coupon.interface';
import { useAppDispatch, useAppSelector } from '@dashboard/store/store';
import {
  openDialog,
  closeDialog,
} from '@dashboard/store/features/coupon/coupon-handler.slice';
import { useEffect } from 'react';
import dayjs from 'dayjs';

type SelectProp = {
  value: string;
  label: string;
};
type ICouponForm = Omit<ICoupon, 'brand' | 'categories' | 'type'> & {
  type: SelectProp;
  categories: SelectProp[];
  brand: SelectProp;
};

const CouponPaymentType = [
  {
    label: 'Percent',
    value: 'PERCENT',
  },
  {
    label: 'Amount',
    value: 'AMOUNT',
  },
];

const Form = ({ onClose }: any) => {
  const [createCoupon] = useAddCouponMutation();
  const [editCoupon] = useUpdateCouponMutation();

  const { data: categories } = useGetCategoriesQuery();
  const { data: brands } = useGetBrandsQuery();
  const { loading: isLoading, startData } = useAppSelector(
    (state) => state.couponHandler
  );
  const isEdit = Boolean(startData);

  const { control, handleSubmit, setValue } = useForm<ICouponForm>({
    defaultValues: {
      title: startData?.title ?? '',
      code: startData?.code ?? '',
      validUpto: dayjs(startData?.validUpto).format('YYYY-MM-DD') ?? '',
      description: startData?.description ?? '',
      link: startData?.link ?? '',
      bidAmount: startData?.bidAmount ?? undefined,
    },
  });

  useEffect(() => {
    if (startData) {
      const selectedBrand = startData?.brand as any;
      const brand = { value: selectedBrand?.label, label: selectedBrand.name };

      const selectedCategories = startData?.categories as any;
      const categories = selectedCategories?.map((c: any) => ({
        value: c._id,
        label: c.name,
      }));
      const type = CouponPaymentType.find(
        (c) => c.value === startData?.type
      ) as any;

      setValue('categories', categories);
      setValue('brand', brand);
      setValue('type', type);
    }
  }, [startData]);

  const onSubmit = (payload: ICouponForm) => {
    const { brand, categories, type, ...rest } = payload;
    const formattedPayload = {
      ...rest,
      type: type?.value,
      categories: categories?.map(({ value }) => value),
      brand: brand.value,
    };
    if (isEdit) {
      editCoupon({ ...formattedPayload, _id: startData?._id as string });
      return;
    }
    createCoupon(formattedPayload);
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
                options={CouponPaymentType}
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
          name="bidAmount"
          rules={{ required: 'Required' }}
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <FormControl isInvalid={Boolean(errors?.code?.message)}>
              <FormLabel>Bid Amount</FormLabel>
              <NumberInput value={value} onChange={onChange} variant="filled">
                <NumberInputField
                  rounded="full"
                  placeholder="Enter your price"
                />
                <NumberInputStepper w="40px">
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormErrorMessage>{errors?.code?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Enter Description if any"
                value={value}
                onChange={onChange}
              />
            </FormControl>
          )}
        />
      </ModalBody>

      <ModalFooter>
        <Button variant="primary" mr={3} type="submit" isLoading={isLoading}>
          Save
        </Button>
        <Button onClick={onClose} isDisabled={isLoading}>
          Cancel
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

const CreateCoupon = () => {
  const dispatch = useAppDispatch();
  const openAddDialog = () => dispatch(openDialog());
  const onClose = () => dispatch(closeDialog());
  const isOpen = useAppSelector((state) => state.couponHandler.open);

  return (
    <>
      <IconButton
        onClick={openAddDialog}
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
