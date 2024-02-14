import browser from 'webextension-polyfill'
import { MessageType } from 'Background/actions'

export const sendMessage = ({ action, payload }: MessageType) =>
  browser.runtime.sendMessage({
    application: 'LUNCH_MONEY',
    action,
    payload,
  })

export const createPayment = (origin: string) => {
  return sendMessage({
    action: 'createPayment',
    payload: { origin },
  })
}

export const pollInvoiceStatus = (origin: string, r_hash: string) => {
  return sendMessage({
    action: 'pollInvoiceStatus',
    payload: { origin, r_hash },
  })
}
