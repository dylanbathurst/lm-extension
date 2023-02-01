import React, { useEffect, useState } from 'react';
import browser from 'webextension-polyfill';
import { hot } from 'react-hot-loader/root';
import { Landing } from './Screens/Landing';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { EmailVerify } from './Screens/EmailVerify';
import { AdditionalInfo } from './Screens/AdditionalInfo';
import { BasicInfo } from './Screens/BasicInfo';
import { Dashboard } from './Screens/Dashboard';
import { OnboardSuccess } from './Screens/OnboardSuccess';
import { ProfileType } from '../Background/actions';

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
    <MemoryRouter>
      <Routes>
        <Route path="/" element={session ? <Dashboard /> : <Landing />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="email-verify" element={<EmailVerify />} />
        <Route path="basic-info" element={<BasicInfo />} />
        <Route path="additional-info" element={<AdditionalInfo />} />
        <Route path="onboard-success" element={<OnboardSuccess />} />
      </Routes>
    </MemoryRouter>
  );
};

export default hot(App);
