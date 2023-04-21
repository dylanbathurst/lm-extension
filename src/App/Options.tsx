import React from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard } from './Screens/Dashboard';
import { Settings } from './Screens/Settings';
import AuthProvider, { RequireAuth } from './Components/AuthProvider';
import Options from './Layouts/Options';
import { store, persistor } from 'Background/store';
import WalletConnection from './Screens/WalletConnection';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { EmailVerify } from './Screens/EmailVerify';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
          <AuthProvider>
            <Routes>
              <Route path="email-verify" element={<EmailVerify />} />
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Options />
                  </RequireAuth>
                }
              >
                <Route index element={<Navigate to="/activity" replace />} />
                <Route path="activity" element={<Dashboard />} />
                <Route
                  path="wallet-connection"
                  element={<WalletConnection />}
                />
                <Route
                  path="my-info"
                  element={<Settings closeModal={() => {}} isOpen={true} />}
                />
              </Route>
            </Routes>
          </AuthProvider>
        </HashRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
