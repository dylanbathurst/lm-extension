import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SunIcon } from "@bitcoin-design/bitcoin-icons-react/filled";
import { LightningIcon } from "@bitcoin-design/bitcoin-icons-react/filled";
import { TransactionsIcon } from "@bitcoin-design/bitcoin-icons-react/filled";
import { ContactsIcon } from "@bitcoin-design/bitcoin-icons-react/filled";

// @ts-ignore
import logo from "../logo.svg";
import { requestInfo } from "lib/api";

const OptionsNav: FC<{
  darkMode: boolean;
  toggleDarkMode: () => void;
}> = ({ darkMode, toggleDarkMode }) => {
  useEffect(() => {});
  return (
    <div className="flex flex-col justify-between h-screen py-5 pt-8 bg-dark-mode transition-all duration-700 ease-in-out relative md:w-40 lg:w-52">
      <div className="flex flex-col">
        <h1 className="flex text-lg font-bold pb-8 self-center">
          <img src={logo} width="30" alt="Referify Logo" className="pb-2" />
        </h1>
        <ul className="space-y-4 text-base font-semibold border-l border-slate-100 dark:border-slate-800">
          <li>
            <Link
              className="flex gap-2 pl-4 py-2 hover:bg-white/5 hover:text-slate-900 dark:text-slate-300"
              to="activity"
            >
              <TransactionsIcon className="w-5" />
              Activity
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-2 pl-4 py-2 hover:bg-white/5 hover:text-slate-900 dark:text-slate-300"
              to="my-info"
            >
              <ContactsIcon className="w-5" />
              My Info
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-2 pl-4 py-2 hover:bg-white/5 hover:text-slate-900 dark:text-slate-300"
              to="wallet-connection"
            >
              <LightningIcon className="w-5" />
              Connect
            </Link>
          </li>
        </ul>
      </div>
      {/* <button className="w-6 self-center" onClick={toggleDarkMode}>
        <SunIcon style={{ color: darkMode ? "black" : "white" }} />
      </button> */}
    </div>
  );
};

export default OptionsNav;
