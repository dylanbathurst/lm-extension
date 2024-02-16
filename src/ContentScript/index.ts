import { createPayment, pollInvoiceStatus } from 'lib/messages'
import injectScript from './injectScript'

injectScript()

window.addEventListener('message', (event) => {
  if (event.data.action !== 'createPayment') return
  if (window.location.origin !== event.origin) return null

  createPayment(event.origin)
    .then(
      (data: { payment_request: string; origin: string; r_hash: string }) => {
        if (!data.payment_request) return null

        window.postMessage(
          {
            application: 'LUNCH_MONEY',
            action: 'invoice',
            payload: data,
          },
          '*'
        )
        window.postMessage(
          {
            application: 'LUNCH_MONEY',
            action: 'pollInvoiceStatus',
            payload: data.r_hash,
          },
          '*'
        )
      }
    )
    .catch((err) => {
      console.error('error creating payment', err)
    })
})

window.addEventListener('message', (event) => {
  if (event.data.action !== 'pollInvoiceStatus') return
  if (window.location.origin !== event.origin) return null

  pollInvoiceStatus(event.origin, event.data.payload)
    .then((data) => {
      if (data.status !== 'settled') return null

      window.postMessage(
        {
          application: 'LUNCH_MONEY',
          action: 'profile',
          payload: data,
        },
        '*'
      )
    })
    .catch((err) => {
      console.error('error polling invoice status', err)
    })
})

export {}
