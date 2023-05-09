import browser from 'webextension-polyfill'
import { createInvoice, listInvoices } from 'lib/api'
import { RootState, store } from './store'
import { defaultConnection } from './walletConnectionSlice'
import { userProfile } from './userProfileSlice'

export type ProfileType = {
  firstName: string
  lastName: string
  email: string
  gender: ['Male', 'Female']
  age: number
  location: string
}

export type MessageType = {
  application?: string
} & {
  action: 'requestUser' | 'listInvoices'
  payload: { origin: string }
}

const actionParser = async (message: MessageType) => {
  if (message.application !== 'LUNCH_MONEY' || !message.action) {
    return
  }
  const profile = userProfile(store.getState())
  const connection = defaultConnection(store.getState())

  if (!connection) throw new Error('No node connection')

  const { url, macaroon } = connection

  switch (message.action) {
    case 'requestUser':
      const memo = message.payload.origin
      const invoiceRes = await createInvoice({ url, macaroon, memo })
      const invoice = await invoiceRes.json()
      const { payment_request } = invoice
      return { profile, payment_request }
    default:
      return
  }
}

export default actionParser
