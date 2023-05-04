import React, { FC, useState } from 'react'
import browser from 'webextension-polyfill'
import { BellIcon, GearIcon } from '@bitcoin-design/bitcoin-icons-react/filled'
import { Link } from 'react-router-dom'
// @ts-ignore
import logo from '../logo.svg'
import { Settings } from '../Screens/Settings'

const Header: FC = () => {
  let [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    browser.tabs.create({
      url: browser.runtime.getURL('/options.html#/my-info'),
    })
  }

  return (
    <div className="flex justify-between">
      <h1 className="flex text-md font-bold text-white py-4">
        {/* <img src={logo} width="23" alt="Referify Logo" className="pr-2" />
        Lunch Money */}
      </h1>
      <div className="flex items-center justify-between w-16">
        <Link to="/additional-info">
          {/* <BellIcon style={{ width: '25px', color: 'white' }} /> */}
        </Link>
        <button onClick={openModal}>
          <GearIcon style={{ width: '25px', color: 'white' }} />
        </button>
      </div>
      {isOpen && <Settings closeModal={closeModal} isOpen={isOpen} />}
    </div>
  )
}

export default Header
