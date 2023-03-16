// You choose initial value.

import { ThemeConfig } from '@chakra-ui/react';

// App subscribes to system color mode changes.
export const config: ThemeConfig = {
  initialColorMode: 'light', // 'dark' | 'light'
  useSystemColorMode: true,
};
