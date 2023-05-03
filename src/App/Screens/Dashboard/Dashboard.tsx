import React, { useEffect, useState } from 'react';
import { SendIcon } from '@bitcoin-design/bitcoin-icons-react/filled';
import { getBalance, listInvoices } from 'lib/api';
import { useAppSelector } from 'Background/hooks';
import { defaultConnection } from 'Background/walletConnectionSlice';
import ActivityItem, { ActivityType } from './ActivityItem';

const Dashboard: React.FC = () => {
  const [balance, setBalance] = useState(0);
  const [invoices, setInvoices] = useState<ActivityType[] | null>(null);

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
        .then(({ invoices }) => invoices.reverse())
        .then((invoices) => {
          setInvoices(invoices);
        });
    }
  }, []);
  return (
    <>
      <div className="stats bg-transparent py-14">
        <div className="stat">
          <div className="stat-title">Total Sats Earned</div>
          <div className="stat-value text-white">
            {Number(balance).toLocaleString()}
          </div>
        </div>
      </div>
      <div className="flex flex-1 rounded-2xl p-6 bg-dark-mode">
        <div className="flex flex-col basis-full justify-between content-center">
          {invoices &&
            invoices.map((invoice) => {
              return (
                <ActivityItem
                  key={invoice.payment_request}
                  activity={invoice}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
