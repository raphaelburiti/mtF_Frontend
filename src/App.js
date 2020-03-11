import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'

import Alert from './Components/Alert'
import LoadServices from './Components/LoadServices'

import './App.css';

import Routes from './routes';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Alert />
          <LoadServices />
          <Routes />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
