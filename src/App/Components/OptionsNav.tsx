import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const OptionsNav: FC = () => {
  return (
    <div className="w-40 mr-7">
      <ul className="space-y-4 text-sm lg:space-y-2 border-l border-slate-100 dark:border-slate-800">
        <li>
          <Link
            className="block border-l pl-4 -ml-px border-transparent hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300"
            to="dashboard"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            className="block border-l pl-4 -ml-px border-transparent hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300"
            to="settings"
          >
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default OptionsNav;
