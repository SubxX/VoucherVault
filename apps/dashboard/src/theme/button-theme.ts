import { defineStyleConfig, defineStyle } from '@chakra-ui/react';

const primary = defineStyle({
  background: 'primary.500',
  color: 'white',
  _hover: {
    background: 'primary.600',
  },
  _disabled: {
    background: 'primary.200',
    _hover: {
      background: 'primary.200 !important',
    }
  },
  _loading: {
    color: 'primary.800'
  },


  // let's also provide dark mode alternatives
  //   _dark: {
  //     background: 'orange.300',
  //   },
});

export default defineStyleConfig({
  baseStyle: {
    borderRadius: 'full',
  },
  variants: { primary },
});
