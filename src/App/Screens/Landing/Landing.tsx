import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Primary } from '../../Layouts';
// @ts-ignore
import logo from '../../logo.svg';

const Landing: FC = () => {
  let navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('email-verify');
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  });
  return (
    <Primary>
      <div className="flex basis-full justify-center content-center">
        <div className="flex flex-col justify-center justify-items-center items-center content-center text-white">
          <img src={logo} width="72" alt="Referify Logo" />
          <h1 className="font-black text-4xl pt-8">Lunch Money</h1>
        </div>
      </div>
    </Primary>
  );
};

export default Landing;
