import React, { FC } from 'react'

const Onboard: FC<{ header?: true }> = ({ children, header }) => {
  return (
    <section className="flex flex-col flex-1 bg-dark-mode p-6 pt-1"></section>
  )
}

export default Onboard
