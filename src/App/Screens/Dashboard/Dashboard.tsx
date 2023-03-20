import React from 'react';
import { Primary } from '../../Layouts';
import { SendIcon } from '@bitcoin-design/bitcoin-icons-react/filled';
import { createInvoice } from '../../../lib/messages';

const Dashboard: React.FC = () => {
  const createInvoiceHandler = () => {
    // createInvoice()
    //   .then((res) => res.json())
    //   .then(console.log)
    //   .catch(console.error);
  };
  return (
    <div className="flex flex-col basis-full justify-between content-center">
      <div className="flex basis-full justify-center justify-items-center items-center content-center text-white">
        <div className="flex items-baseline">
          <h1 className="font-black text-3xl pr-2">152,832.86</h1>
          <p className="text-lg text-slate-400 pl-2">sats</p>
        </div>
      </div>
      <button
        onClick={createInvoiceHandler}
        className="flex items-center justify-center text-lg rounded-md bg-bitcoin text-dark-mode mt-2 py-3 font-medium"
      >
        <SendIcon style={{ height: '32px', width: '32px' }} />
        Withdraw
      </button>
    </div>
  );
};

export default Dashboard;
