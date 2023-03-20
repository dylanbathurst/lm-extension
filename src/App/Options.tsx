import React, { useEffect, useState } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard } from './Screens/Dashboard';
import { Settings } from './Screens/Settings';
import AuthProvider, { RequireAuth } from './Components/AuthProvider';
import Options from './Layouts/Options';
import WalletConnection from './Screens/WalletConnection';

const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
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
            <Route path="wallet-connection" element={<WalletConnection />} />
            <Route
              path="my-info"
              element={<Settings closeModal={() => {}} isOpen={true} />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;
