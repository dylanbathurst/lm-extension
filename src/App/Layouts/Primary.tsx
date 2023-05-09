import React, { FC } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Primary: FC<{ header?: true }> = ({ header }) => {
  return (
    <section className="flex flex-col flex-1 p-6 pt-1">
      {header && <Header />}
      <Outlet />
    </section>
  )
}

export default Primary
