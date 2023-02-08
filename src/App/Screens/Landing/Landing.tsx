import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Components/AuthProvider/AuthProvider';

import { Primary } from '../../Layouts';
// @ts-ignore
import logo from '../../logo.svg';

const Landing: FC = () => {
  let navigate = useNavigate();
  const auth = useAuth();
  useEffect(() => {
    if (auth.user) {
      navigate('dashboard');
    }
  }, [auth.user]);
  return (
    <div className="flex basis-full justify-center content-center">
      <div className="flex flex-col justify-center justify-items-center items-center content-center text-white">
        <img src={logo} width="72" alt="Referify Logo" />
        <h1 className="font-black text-4xl pt-8">Lunch Money</h1>
      </div>
    </div>
  );
};

export default Landing;
