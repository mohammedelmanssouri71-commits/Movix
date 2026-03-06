import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import { store } from './store/store';
import { Provider } from 'react-redux';
import axios from 'axios';
import { getAccessToken } from './utils/auth';

const JSON_API_URL = process.env.REACT_APP_JSON_API_URL;

axios.interceptors.request.use((config) => {
  const token = getAccessToken();
  const isMockApiRequest = config.url?.startsWith(JSON_API_URL);

  if (token && isMockApiRequest) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
