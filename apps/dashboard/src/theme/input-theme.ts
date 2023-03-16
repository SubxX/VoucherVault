// import { defineStyleConfig, defineStyle } from '@chakra-ui/react';
import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  inputAnatomy.keys
);

export default defineMultiStyleConfig({
  baseStyle: {
    field: {
      borderRadius: '18px',
      rounded: '18px',
    },
  },

  defaultProps: {
    variant: 'filled',
  },
});
