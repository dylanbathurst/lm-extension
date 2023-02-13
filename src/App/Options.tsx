import React, { useEffect, useState } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard } from './Screens/Dashboard';
import { Settings } from './Screens/Settings';
import AuthProvider, { RequireAuth } from './Components/AuthProvider';
import Options from './Layouts/Options';

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
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route
              path="settings"
              element={<Settings closeModal={() => {}} isOpen={true} />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;
