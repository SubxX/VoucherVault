import { Button } from '@chakra-ui/button';
import { IoArrowForwardOutline } from 'react-icons/io5';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  VStack,
  Text,
  HStack,
  Divider,
  Image,
  Heading,
} from '@chakra-ui/react';
import SignInTab from './SignInTab';
import GoogleImage from '../../assets/png/googleIcon.png';
import SignUpTab from './SignUpTab';
import { supabase } from '@dashboard/utils/supabase.utils';
import { useAppDispatch, useAppSelector } from '@dashboard/store/store';
import { setDialog } from '@dashboard/store/features/auth/auth.slice';
import { Link } from 'react-router-dom';

const Auth = () => {
  const {
    dialog: isOpen,
    user,
    loading,
  } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const onOpen = () => dispatch(setDialog(true));
  const onClose = () => dispatch(setDialog(false));

  const googleAuth = async () => {
    const { error } = await supabase.auth.signIn({ provider: 'google' });
  };

  if (user)
    return (
      <Button as={Link} to="/dashboard" isLoading={loading}>
        Dashboard
      </Button>
    );

  return (
    <>
      <Button
        variant="ghost"
        flex="none"
        rightIcon={<IoArrowForwardOutline />}
        onClick={onOpen}
        isLoading={loading}
      >
        Sign In
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay backdropFilter="blur(2px)" />
        <ModalContent width="350px">
          <Tabs isFitted variant="enclosed-colored">
            <ModalHeader pb={0}>
              <Heading fontSize="2xl" mb={5}>
                Create account
              </Heading>

              <TabList gap={4}>
                <Tab>Sign In</Tab>
                <Tab>Sign Up</Tab>
              </TabList>
              <ModalCloseButton />
            </ModalHeader>

            <VStack pt={4} px={4}>
              <Button w="full" variant="outline" onClick={googleAuth}>
                <Image src={GoogleImage} mr={2} />
                Google
              </Button>
              <HStack alignItems="center" w="full">
                <Divider border="1px solid rgba(0, 0, 0, 0.3)" />
                <Text px={1}>OR</Text>
                <Divider border="1px solid rgba(0, 0, 0, 0.3)" />
              </HStack>
            </VStack>

            <TabPanels>
              <SignInTab />
              <SignUpTab />
            </TabPanels>
          </Tabs>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Auth;
