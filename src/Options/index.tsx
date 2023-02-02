import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Options from '../App/Options';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);
