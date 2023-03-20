import React, { useEffect, useState } from 'react';
import browser from 'webextension-polyfill';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { Primary } from './Layouts';
import { Landing } from './Screens/Landing';
import { EmailVerify } from './Screens/EmailVerify';
import { Dashboard } from './Screens/Dashboard';

import AuthProvider, { RequireAuth } from './Components/AuthProvider';

const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="email-verify" element={<EmailVerify />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Primary header />
              </RequireAuth>
            }
          >
            <Route index element={<Landing />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;
