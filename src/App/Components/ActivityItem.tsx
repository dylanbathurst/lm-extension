import React, { useEffect, useState } from 'react'
import {
  ClockIcon,
  HiddenIcon,
  CheckIcon,
} from '@bitcoin-design/bitcoin-icons-react/filled'

export type ActivityType = {
  memo: string
  r_preimage: string
  r_hash: string
  value: number
  value_msat: number
  settled: boolean
  creation_date: number
  settle_date: number
  payment_request: string
  description_hash: null
  expiry: number
  fallback_addr: string
  cltv_expiry: number
  route_hints: string[]
  private: boolean
  add_index: number
  settle_index: number
  amt_paid: string
  amt_paid_sat: string
  amt_paid_msat: string
  state: string
  htlcs: string[]
  is_keysend: boolean
  payment_addr: string
}

const ActivityItem: React.FC<{ activity: ActivityType }> = ({ activity }) => {
  return (
    <div className="flex justify-between items-center text-xl text-base-content gap-1 p-2">
      <div className="flex gap-3 text-sm items-center">
        <span title={activity.state}>
          {activity.amt_paid === '0' && activity.state === 'OPEN' && (
            <ClockIcon width={'1.75rem'} />
          )}
          {activity.amt_paid > '0' && activity.settled && (
            <CheckIcon width={'1.75rem'} />
          )}
          {activity.amt_paid === '0' && activity.state === 'CANCELED' && (
            <HiddenIcon width={'1.75rem'} />
          )}
        </span>
        <span className="opacity-50 cursor-help" title="Requested">
          {Number(activity.value).toLocaleString()}
        </span>
        /
        <span title="Received" className="cursor-help">
          {Number(activity.amt_paid).toLocaleString()}
        </span>
      </div>
      <span className="text-lg">
        {activity.memo.replace(/http:\/\/|https:\/\/|www\./g, '')}
      </span>
    </div>
  )
}

export default ActivityItem
