import { createInvoice, getInvoice } from 'lib/api'
import { store } from './store'
import { defaultConnection } from './walletConnectionSlice'
import { userProfile } from './userProfileSlice'

export type MessageType = {
  application?: string
} & (
  | {
      action: 'createPayment' | 'listInvoices'
      payload: { origin: string }
    }
  | {
      action: 'pollInvoiceStatus'
      payload: { origin: string; r_hash: string }
    }
)

const actionParser = async (message: MessageType) => {
  if (message.application !== 'LUNCH_MONEY' || !message.action) {
    return
  }
  const profile = userProfile(store.getState())
  const connection = defaultConnection(store.getState())

  if (!connection) throw new Error('No node connection')

  const { url, macaroon } = connection

  switch (message.action) {
    case 'createPayment':
      const memo = message.payload.origin
      try {
        const invoiceRes = await createInvoice({ url, macaroon, memo })
        const invoice = await invoiceRes.json()
        console.log(invoice)
        const { payment_request, r_hash } = invoice
        console.log(r_hash)

        return { payment_request, r_hash }
      } catch (error) {
        throw new Error('Error getting invoice: ' + error)
      }
    case 'pollInvoiceStatus':
      const { r_hash } = message.payload

      console.log('polling invoice status', r_hash)

      while (true) {
        const invoiceRes = await getInvoice({ url, macaroon, r_hash })
        const invoice = await invoiceRes.json()

        if (invoice.settled) {
          return { status: 'settled', profile }
        }

        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    default:
      return
  }
}

export default actionParser
