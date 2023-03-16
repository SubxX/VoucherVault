import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  ModalBody,
  ModalFooter,
  TabPanel,
} from '@chakra-ui/react';
import { supabase } from '@dashboard/utils/supabase.utils';
import { Controller, useForm } from 'react-hook-form';
import { ILogin } from './interfaces/login.interface';

const SignInTab = () => {
  const { control, reset, handleSubmit } = useForm<ILogin>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const submit = async ({ email, password }: ILogin) => {
    console.log({ email, password });
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) {
      console.log(error);
    }
    reset();
  };
  return (
    <form onSubmit={handleSubmit(submit)}>
      <TabPanel p={0}>
        <ModalBody py={0} pt={4}>
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
                <Input
                  placeholder="Email Id"
                  value={value}
                  onChange={onChange}
                />
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
                <Input
                  placeholder="Password"
                  type="password"
                  value={value}
                  onChange={onChange}
                />
                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
              </FormControl>
            )}
          />
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button variant="primary" mr={3} type="submit" w="full">
            Login
          </Button>
        </ModalFooter>
      </TabPanel>
    </form>
  );
};

export default SignInTab;
