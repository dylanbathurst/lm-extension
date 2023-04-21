import React, { useEffect, useState } from 'react';
import { SendIcon } from '@bitcoin-design/bitcoin-icons-react/filled';
import { getBalance, listInvoices } from 'lib/api';
import { useAppSelector } from 'Background/hooks';
import { defaultConnection } from 'Background/walletConnectionSlice';

const Dashboard: React.FC = () => {
  const [balance, setBalance] = useState(0);
  const [invoices, setInvoices] = useState<
    { memo: string; state: string }[] | null
  >(null);

  const connection = useAppSelector(defaultConnection);
  useEffect(() => {
    if (connection) {
      const { url, macaroon } = connection;
      getBalance({ url, macaroon })
        .then((res) => res.json())
        .then(({ balance }) => {
          setBalance(balance);
        });
      listInvoices({ url, macaroon })
        .then((res) => res.json())
        .then(({ invoices }) => {
          console.log('foooooo', invoices);
          setInvoices(invoices);
        });
    }
  }, []);
  return (
    <div className="flex flex-col basis-full justify-between content-center">
      <div className="flex basis-full justify-center justify-items-center items-center content-center text-white">
        <div className="flex items-baseline">
          <h1 className="font-black text-3xl pr-2">{balance}</h1>
          <p className="text-lg text-slate-400 pl-2">sats</p>
        </div>
      </div>
      <button
        onClick={() => {}}
        className="flex items-center justify-center text-lg rounded-md bg-bitcoin text-dark-mode mt-2 py-3 font-medium"
      >
        <SendIcon style={{ height: '32px', width: '32px' }} />
        Withdraw
      </button>
      {invoices &&
        invoices.map((invoice) => {
          return (
            <div>
              {invoice.memo}: {invoice.state}
            </div>
          );
        })}
    </div>
  );
};

export default Dashboard;
