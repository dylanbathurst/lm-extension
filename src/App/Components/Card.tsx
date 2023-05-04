import React, { FC } from 'react'

const Card: FC = ({ children }) => {
  return (
    <div className="flex relative gap-4 rounded-lg p-3 text-left align-middle transition-all">
      {children}
    </div>
  )
}

export default Card
