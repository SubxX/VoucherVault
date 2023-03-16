import { extendTheme } from '@chakra-ui/react';
import { config } from '../config/theme.config';
import Button from './button-theme';
import Input from './input-theme';
import Textarea from './textarea-theme';
import Container from './container-theme';
import { mode } from '@chakra-ui/theme-tools';
import { customBg, customBorder } from './schemantic-tokens';

const styles = {
  global: (props: any) => ({
    body: {
      bg: mode('#F5F5F5', '#141214')(props),
    },
  }),
};

const colors = {
  primary: {
    50: '#f2f0ff',
    100: '#e8e4ff',
    200: '#d4cdff',
    300: '#b5a6ff',
    400: '#9173ff',
    500: '#713bff',
    600: '#6214ff',
    700: '#5200ff',
    800: '#4501d6',
    900: '#3a03af',
    1000: '#666666',
  },
};

const theme = extendTheme({
  components: {
    Button,
    Input,
    Textarea,
    Container,
  },
  colors,
  config,
  styles,
  semanticTokens: {
    colors: {
      customBg,
      customBorder,
    },
  },
});

export default theme;
