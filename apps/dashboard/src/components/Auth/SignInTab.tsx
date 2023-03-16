import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  ModalBody,
  ModalFooter,
  TabPanel,
  InputGroup,
  InputLeftElement,
  Alert,
  AlertIcon,
  CloseButton,
  Text,
} from '@chakra-ui/react';
import { supabase } from '@dashboard/utils/supabase.utils';
import { Controller, useForm } from 'react-hook-form';
import { ILogin } from './interfaces/login.interface';
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai';
import { useState } from 'react';

const SignInTab = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const closeErr = () => setError(undefined);

  const { control, handleSubmit } = useForm<ILogin>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const submit = async ({ email, password }: ILogin) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email, password });
      if (error) throw new Error(error?.message);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <TabPanel p={0}>
        <ModalBody py={0} pt={4}>
          {Boolean(error) && (
            <Alert status="error" mb={2}>
              <AlertIcon />
              <Text flex={1}>{error?.message}</Text>
              <CloseButton
                onClick={closeErr}
                aria-label="Close error message"
              />
            </Alert>
          )}

          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Required',
              pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                message: 'Invalid email',
              },
            }}
            render={({ field: { value, onChange }, formState: { errors } }) => (
              <FormControl isInvalid={Boolean(errors?.email?.message)}>
                <FormLabel>Email Id</FormLabel>

                <InputGroup>
                  <Input
                    placeholder="Email Id"
                    value={value}
                    onChange={onChange}
                  />
                  <InputLeftElement>
                    <AiOutlineLock />
                  </InputLeftElement>
                </InputGroup>

                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{ required: 'Required', minLength: 6 }}
            render={({ field: { value, onChange }, formState: { errors } }) => (
              <FormControl
                isInvalid={Boolean(errors?.password?.message)}
                mt={4}
              >
                <FormLabel>Password</FormLabel>

                <InputGroup>
                  <Input
                    placeholder="Password"
                    type="password"
                    value={value}
                    onChange={onChange}
                  />
                  <InputLeftElement>
                    <AiOutlineMail />
                  </InputLeftElement>
                </InputGroup>
                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
              </FormControl>
            )}
          />
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button variant="primary" type="submit" w="full" isLoading={loading}>
            Login
          </Button>
        </ModalFooter>
      </TabPanel>
    </form>
  );
};

export default SignInTab;
