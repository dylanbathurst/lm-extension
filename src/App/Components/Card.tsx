import React, { FC, useState, Fragment } from 'react';
import { Switch } from '@headlessui/react';

const Card: FC = ({ children }) => {
  const [enabled, setEnabled] = useState(true);
  return (
    <div className="flex flex-col relative bg-white bg-opacity-10 rounded-lg p-6 flex-grow text-left align-middle shadow-xl transition-all">
      <div className="absolute right-3 top-3">
        <Switch checked={enabled} onChange={setEnabled} as={Fragment}>
          {({ checked }) => (
            <button
              className={`${
                checked ? 'bg-gray-600' : 'bg-gray-400'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  checked ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </button>
          )}
        </Switch>
      </div>
      {children}
    </div>
  );
};

export default Card;
