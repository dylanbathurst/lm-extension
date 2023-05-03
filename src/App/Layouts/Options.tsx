import React, { FC, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import OptionsNav from "../Components/OptionsNav";

const Options: FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    // Setting the theme class on the html element
    const htmlElement = window.document.documentElement;
    const themeClassName = darkMode ? "light" : "dark";
    htmlElement.classList.remove(darkMode ? "dark" : "light");
    htmlElement.classList.add(themeClassName);
  }, [darkMode]);

  return (
    <section className="min-h-full max-h-screen flex transition-all bg-[#101213]">
      <OptionsNav darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="flex flex-col min-h-screen w-full overflow-y-auto relative">
        <main className="flex-1 md:mx-8 lg:mx-12 my-8">
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default Options;
