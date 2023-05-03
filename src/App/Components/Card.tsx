import React, { FC } from 'react';

const Card: FC = ({ children }) => {
  return (
    <div className="flex relative gap-4 bg-black/5 dark:bg-dark-mode rounded-lg p-6 text-left align-middle transition-all">
      {children}
    </div>
  );
};

export default Card;
