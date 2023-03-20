import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface ConnectionType {
  provider: 'lnd';
  url: string;
  macaroon: string;
  alias: string;
  balance: number;
}

export interface WalletConnection {
  connections: ConnectionType[];
  default?: ConnectionType;
}

type ConnectionIndex = number;

const initialState: WalletConnection = {
  connections: [],
  default: undefined,
};

export const walletConnectionSlice = createSlice({
  name: 'walletConnection',
  initialState,
  reducers: {
    addConnection: (state, action: PayloadAction<ConnectionType>) => {
      console.log(action.payload);
      state.connections.push(action.payload);
    },
    removeConnection: (state, action: PayloadAction<ConnectionType>) => {},
    setDefault: (state, action: PayloadAction<ConnectionIndex>) => {
      state.default = state.connections[action.payload];
    },
  },
});

export const { actions, reducer } = walletConnectionSlice;
export const walletConnections = (state: RootState) =>
  state.walletConnections.connections;
