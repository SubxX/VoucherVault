import { ColorModeScript } from '@chakra-ui/react';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { theme } from './theme';
import { HashRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </HashRouter>
    </Provider>
  </StrictMode>
);
