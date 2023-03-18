import AppLogo from './AppLogo';
import { Box, Container, Flex } from '@chakra-ui/react';
import AppSearchbar from './AppSearchbar';
import { useMediaQuery } from '@chakra-ui/react';
import DarkModeToggler from './DarkModeToggler';
import { Link } from 'react-router-dom';
import { Auth } from './auth';

const AppHeader = () => {
  const [isTab] = useMediaQuery('(min-width: 768px)');

  return (
    <Box background="customBg" py={3}>
      <Container>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          gap={4}
          mb={!isTab ? 2 : 0}
        >
          <Link to="/">
            <AppLogo />
          </Link>
          {/* {isTab && (
            <Box maxWidth="400px" width="full">
              <AppSearchbar />
            </Box>
          )} */}

          <Flex gap={2} alignItems="center">
            <DarkModeToggler />
            <Auth />
          </Flex>
        </Flex>
        {/* {!isTab && <AppSearchbar />} */}
      </Container>
    </Box>
  );
};

export default AppHeader;
