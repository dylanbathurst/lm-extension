import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SunIcon } from '@bitcoin-design/bitcoin-icons-react/filled';

// @ts-ignore
import logo from '../logo.svg';
import { requestInfo } from 'lib/api';

const OptionsNav: FC<{
  darkMode: boolean;
  toggleDarkMode: () => void;
}> = ({ darkMode, toggleDarkMode }) => {
  useEffect(() => {});
  return (
    <div className="flex flex-col justify-between w-40 pl-4 py-4 fixed left-0 h-screen">
      <div className="flex flex-col">
        <h1 className="flex text-lg font-bold pb-8 self-center">
          <img src={logo} width="30" alt="Referify Logo" className="pb-2" />
        </h1>
        <ul className="space-y-4 text-sm lg:space-y-2 border-l border-slate-100 dark:border-slate-800">
          <li>
            <Link
              className="block border-l pl-4 -ml-px border-transparent hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-300"
              to="activity"
            >
              Activity Feed
            </Link>
          </li>
          <li>
            <Link
              className="block border-l pl-4 -ml-px border-transparent hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-300"
              to="my-info"
            >
              My Info
            </Link>
          </li>
          <li>
            <Link
              className="block border-l pl-4 -ml-px border-transparent hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-300"
              to="wallet-connection"
            >
              Connect a Wallet
            </Link>
          </li>
        </ul>
      </div>
      <button className="w-6 self-center" onClick={toggleDarkMode}>
        <SunIcon style={{ color: darkMode ? 'black' : 'white' }} />
      </button>
    </div>
  );
};

export default OptionsNav;
