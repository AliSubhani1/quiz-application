import React from 'react';
import './App.css';
import Navbar from './Components/Navbar.tsx';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './Routes/AppRouter.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistor, store } from './Store/index.ts';

function App() {
  return (
    <div className="bg-gray-2 w-screen h-screen">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navbar />
          <BrowserRouter basename="/">
            <AppRouter />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
