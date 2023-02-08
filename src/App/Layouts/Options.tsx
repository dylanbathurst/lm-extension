import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { BellIcon, GearIcon } from '@bitcoin-design/bitcoin-icons-react/filled';
import { Link } from 'react-router-dom';

// @ts-ignore
import logo from '../logo.svg';
import OptionsNav from '../Components/OptionsNav';

const Options: FC = () => {
  return (
    <section className="flex flex-col flex-1 gap-4 bg-dark-mode p-6 pt-1">
      <div className="flex justify-between">
        <h1 className="flex text-lg font-bold text-white py-4">
          <img src={logo} width="23" alt="Referify Logo" className="pr-2" />
          Lunch Money
        </h1>
        <div className="flex items-center justify-between w-16">
          <Link to="/additional-info">
            <BellIcon style={{ width: '25px', color: 'white' }} />
          </Link>
          <button onClick={() => {}}>
            <GearIcon style={{ width: '25px', color: 'white' }} />
          </button>
        </div>
      </div>
      <div className="flex flex-1">
        <OptionsNav />
        <Outlet />
      </div>
    </section>
  );
};

export default Options;
