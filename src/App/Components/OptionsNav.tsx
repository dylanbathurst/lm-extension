import React, { FC, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SunIcon } from '@bitcoin-design/bitcoin-icons-react/filled'
import { LightningIcon } from '@bitcoin-design/bitcoin-icons-react/filled'
import { TransactionsIcon } from '@bitcoin-design/bitcoin-icons-react/filled'
import { ContactsIcon } from '@bitcoin-design/bitcoin-icons-react/filled'

// @ts-ignore
import logo from '../logo.svg'
import { requestInfo } from 'lib/api'

const OptionsNav: FC<{
  darkMode: boolean
  toggleDarkMode: () => void
}> = ({ darkMode, toggleDarkMode }) => {
  useEffect(() => {})
  return (
    <div className="flex flex-col justify-between h-screen py-5 text-base-content pt-8 bg-base-300 transition-all duration-700 ease-in-out relative md:w-44 lg:w-56">
      <div className="flex flex-col">
        <h1 className="flex text-lg font-bold pb-8 self-center">
          <img src={logo} width="30" alt="Referify Logo" className="pb-2" />
        </h1>
        <ul className="menu space-y-4 text-base font-semibold">
          <li>
            <NavLink to="activity">
              <TransactionsIcon className="w-5" />
              Activity
            </NavLink>
          </li>
          <li>
            <NavLink to="my-info">
              <ContactsIcon className="w-5" />
              My Info
            </NavLink>
          </li>
          <li>
            <NavLink to="wallet-connection">
              <LightningIcon className="w-5" />
              Connect
            </NavLink>
          </li>
        </ul>
      </div>
      {/* <button className="w-6 self-center" onClick={toggleDarkMode}>
        <SunIcon style={{ color: darkMode ? "black" : "white" }} />
      </button> */}
    </div>
  )
}

export default OptionsNav
