import React, { useEffect, useState } from 'react';
import browser from 'webextension-polyfill';
import { hot } from 'react-hot-loader/root';
import { Landing } from './Screens/Landing';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from './Screens/Dashboard';
import { ProfileType } from '../Background/actions';
import { Settings } from './Screens/Settings';
import { Primary } from './Layouts';

const App: React.FC = () => {
  const [session, setSession] = useState<ProfileType | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = (await browser.storage.local.get('profile')) as ProfileType;
      if (user) {
        setSession(user);
      }
    };
    fetchUser();
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Primary />}>
          <Route index element={session ? <Dashboard /> : <Landing />} />
          <Route
            path="settings"
            element={<Settings closeModal={() => {}} isOpen={true} />}
          />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default hot(App);
