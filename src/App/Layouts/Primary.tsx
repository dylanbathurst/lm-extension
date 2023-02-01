import React, { FC } from 'react';
import Header from './Header';

const Primary: FC<{ header?: true }> = ({ children, header }) => {
  return (
    <section className="flex flex-col flex-1 bg-dark-mode p-6 pt-1">
      {header && <Header />}
      {children}
    </section>
  );
};

export default Primary;
