import React, { useEffect, useState } from 'react';
import browser from 'webextension-polyfill';
import { hot } from 'react-hot-loader/root';
import { Landing } from './Screens/Landing';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard } from './Screens/Dashboard';
import { ProfileType } from '../Background/actions';
import { Settings } from './Screens/Settings';
import { Primary } from './Layouts';
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

export default hot(App);
