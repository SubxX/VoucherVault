import { Box, Container, Heading, HStack, IconButton } from '@chakra-ui/react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';

type Props = {
  title: string;
  backBtn?: boolean;
  actions?: ReactNode;
};

const DashboardHeader = ({ title, backBtn = true, actions }: Props) => {
  const navigate = useNavigate();

  return (
    <Box
      position="sticky"
      top={0}
      left={0}
      zIndex={2}
      background="customBg"
      borderBottomWidth="1px"
      borderColor="customBorder"
    >
      <Container>
        <HStack alignItems="center" minH={14}>
          <HStack flex={1}>
            {backBtn && (
              <IconButton
                size="sm"
                variant="solid"
                aria-label="Back"
                onClick={navigate.bind(this, -1)}
              >
                <BiArrowBack />
              </IconButton>
            )}

            <Heading fontSize="lg">{title}</Heading>
          </HStack>

          {actions}
        </HStack>
      </Container>
    </Box>
  );
};

export default DashboardHeader;
