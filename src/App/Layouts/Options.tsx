import React, { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import OptionsNav from '../Components/OptionsNav';

const Options: FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    // Setting the theme class on the html element
    const htmlElement = window.document.documentElement;
    const themeClassName = darkMode ? 'light' : 'dark';
    htmlElement.classList.remove(darkMode ? 'dark' : 'light');
    htmlElement.classList.add(themeClassName);
  }, [darkMode]);

  return (
    <section className="flex flex-col flex-1 gap-4 min-w-[40rem] transition-all">
      {/* secondary nav goes here */}
      <OptionsNav darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="ml-40 p-6">
        <Outlet />
      </div>
    </section>
  );
};

export default Options;
