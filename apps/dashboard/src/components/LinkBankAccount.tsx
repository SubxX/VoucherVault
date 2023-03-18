import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { useRazorpayOnboardingMutation } from '@dashboard/store/api/payment.query';
import { useAppDispatch, useAppSelector } from '@dashboard/store/store';
import { closeDialog } from '@dashboard/store/features/onboarding/onboarding.slice';

const Form = ({ onClose }: any) => {
  const [onboard, { isLoading }] = useRazorpayOnboardingMutation();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      phone: '',
      email: '',
      legalBusinessName: '',
      contactName: '',
      streetAddress1: '',
      streetAddress2: '',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '112233',
      country: 'IN',
      accountNumber: '',
      ifscCode: '',
      tnc: true,
    },
  });

  const onSubmit = (payload: any) => {
    console.log(payload);
    onboard(payload);
  };

  return (
    <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader>Razorpay Onboarding</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6} gap={3} display="grid">
        <Controller
          control={control}
          name="email"
          rules={{ required: 'Required' }}
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <FormControl isInvalid={Boolean(errors?.email?.message)}>
              <FormLabel>Enter email</FormLabel>
              <Input
                placeholder="Enter email"
                value={value}
                onChange={onChange}
              />
              <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="phone"
          rules={{ required: 'Required' }}
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <FormControl isInvalid={Boolean(errors?.phone?.message)}>
              <FormLabel>Enter phone</FormLabel>
              <Input
                placeholder="Enter phone"
                value={value}
                onChange={onChange}
              />
              <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="legalBusinessName"
          rules={{ required: 'Required' }}
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <FormControl
              isInvalid={Boolean(errors?.legalBusinessName?.message)}
            >
              <FormLabel>Legal Business Name</FormLabel>
              <Input
                placeholder="Enter legal name"
                value={value}
                onChange={onChange}
              />
              <FormErrorMessage>
                {errors?.legalBusinessName?.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="contactName"
          rules={{ required: 'Required' }}
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <FormControl isInvalid={Boolean(errors?.contactName?.message)}>
              <FormLabel>Contact Name</FormLabel>
              <Input
                placeholder="Enter contact name"
                value={value}
                onChange={onChange}
              />
              <FormErrorMessage>
                {errors?.contactName?.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="streetAddress1"
          rules={{ required: 'Required' }}
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <FormControl isInvalid={Boolean(errors?.streetAddress1?.message)}>
              <FormLabel>Street Address 1</FormLabel>
              <Input
                placeholder="Enter street address 1"
                value={value}
                onChange={onChange}
              />
              <FormErrorMessage>
                {errors?.streetAddress1?.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="streetAddress2"
          rules={{ required: 'Required' }}
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <FormControl isInvalid={Boolean(errors?.streetAddress2?.message)}>
              <FormLabel>Street Address</FormLabel>
              <Input
                placeholder="Enter street address 2"
                value={value}
                onChange={onChange}
              />
              <FormErrorMessage>
                {errors?.streetAddress2?.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="accountNumber"
          rules={{ required: 'Required' }}
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <FormControl isInvalid={Boolean(errors?.accountNumber?.message)}>
              <FormLabel>Bank Account number</FormLabel>
              <Input
                placeholder="Enter Code"
                value={value}
                onChange={onChange}
              />
              <FormErrorMessage>
                {errors?.accountNumber?.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="ifscCode"
          rules={{ required: 'Required' }}
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <FormControl isInvalid={Boolean(errors?.ifscCode?.message)}>
              <FormLabel>IFSC Code</FormLabel>
              <Input
                placeholder="Enter Code"
                value={value}
                onChange={onChange}
              />
              <FormErrorMessage>{errors?.ifscCode?.message}</FormErrorMessage>
            </FormControl>
          )}
        />
      </ModalBody>

      <ModalFooter>
        <Button variant="primary" mr={3} type="submit" isLoading={isLoading}>
          Submit
        </Button>
        <Button onClick={onClose} isDisabled={isLoading}>
          Cancel
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

const LinkBankAccount = () => {
  const dispatch = useAppDispatch();
  const { dialog: isOpen } = useAppSelector((state) => state.onboarding);
  const onClose = () => dispatch(closeDialog());

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <Form onClose={onClose} />
    </Modal>
  );
};

export default LinkBankAccount;
