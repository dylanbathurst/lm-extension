import React from 'react';
import ReactDOM from 'react-dom/client';
import browser from 'webextension-polyfill';
import { configureLMStore } from '../Background/store';
import './index.css';
import Options from '../App/Options';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

browser.storage.sync.get('LM_STORE').then((state) => {
  const store = configureLMStore(state.LM_STORE);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <Options />
      </Provider>
    </React.StrictMode>
  );
});
