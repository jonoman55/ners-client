import { createRoot, Root } from 'react-dom/client';
// import { Provider } from 'react-redux';

import App from './App';
// import { store } from './app/store';
import { SnackbarProvider, SocketProvider } from './contexts';
import './styles/index.css';

const container: HTMLElement = document.getElementById('root') as HTMLElement;
const root: Root = createRoot(container);

// TODO : Add provider back after SocketProvider converted to RTK
root.render(
  // <Provider store={store}>
  <SnackbarProvider>
    <SocketProvider>
      <App />
    </SocketProvider>
  </SnackbarProvider>
  // </Provider>
);