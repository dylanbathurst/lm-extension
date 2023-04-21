import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import browser from 'webextension-polyfill';

import { RootState } from 'Background/store';

const PersistContext = createContext<RootState | undefined>(undefined);

export default function PersistProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<RootState>();

  useEffect(() => {
    browser.storage.sync.get('LM_STORE').then((state) => {
      setStore(state.LM_STORE);
    });
  }, []);

  return (
    <PersistContext.Provider value={store}>{children}</PersistContext.Provider>
  );
}

export function useStore() {
  return useContext(PersistContext);
}
