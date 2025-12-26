import React from 'react';
import ReactDOM from 'react-dom/client';
import { clarity } from 'react-microsoft-clarity';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

clarity.init('upwf6o1tj5');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);