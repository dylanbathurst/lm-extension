import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { Landing } from './Screens/Landing';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { EmailVerify } from './Screens/EmailVerify';
import { AdditionalInfo } from './Screens/AdditionalInfo';
import { BasicInfo } from './Screens/BasicInfo';
import { Dashboard } from './Screens/Dashboard';
import { OnboardSuccess } from './Screens/OnboardSuccess';
import { Inputs } from './Screens/EmailVerify/EmailVerify';

const App: React.FC = () => {
  const [session, setSession] = useState<Inputs | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('lunchMoneyUser');
    if (user) {
      setSession(JSON.parse(user));
    }
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
