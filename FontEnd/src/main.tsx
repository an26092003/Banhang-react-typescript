import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { Provider } from 'react-redux';
import persistor, { store } from "./store";
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify'

// Css module

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading="null" persistor={persistor}>
          <ToastContainer />
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
)
