import { IconButton, useColorMode } from '@chakra-ui/react';
import { FiSun, FiMoon } from 'react-icons/fi';

const DarkModeToggler = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton aria-label="Toggle dark mode" onClick={toggleColorMode}>
      {colorMode === 'light' ? <FiMoon /> : <FiSun />}
    </IconButton>
  );
};

export default DarkModeToggler;
