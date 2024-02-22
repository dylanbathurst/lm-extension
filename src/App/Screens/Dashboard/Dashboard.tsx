import React, { useEffect, useState } from 'react'
import { getBalance, listInvoices } from 'lib/api'
import { useAppSelector } from 'Background/hooks'
import { defaultConnection } from 'Background/walletConnectionSlice'
import ActivityItem, { ActivityType } from '../../Components/ActivityItem'

const Dashboard: React.FC = () => {
  const connection = useAppSelector(defaultConnection)
  const [balance, setBalance] = useState(connection?.balance || 0)
  const [invoices, setInvoices] = useState<ActivityType[] | null>(null)

  useEffect(() => {
    if (connection) {
      const { url, macaroon } = connection
      getBalance({ url, macaroon })
        .then((res) => res.json())
        .then(({ balance }) => {
          setBalance(balance)
        })
      listInvoices({ url, macaroon })
        .then((res) => res.json())
        .then(({ invoices }) => invoices.reverse())
        .then((invoices) => {
          setInvoices(invoices)
        })
    }
  }, [connection])

  return (
    <>
      <div className="flex stats bg-transparent py-14 px-0 text-base-content">
        <div className="stat px-9">
          <div className="stat-title">Total Sats Earned</div>
          <div className="stat-value text-white">
            {Number(balance).toLocaleString()}
          </div>
        </div>
      </div>
      <div className="flex flex-1 rounded-2xl p-6 bg-base-300">
        <div className="flex flex-col basis-full justify-between content-center">
          {invoices?.length ? (
            invoices.map((invoice) => {
              return (
                <div key={invoice.r_preimage}>
                  <ActivityItem
                    key={invoice.payment_request}
                    activity={invoice}
                  />
                  <div className="divider"></div>
                </div>
              )
            })
          ) : (
            <span className="text-2xl self-center opacity-75">No Activity</span>
          )}
        </div>
      </div>
    </>
  )
}

export default Dashboard
