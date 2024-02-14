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
        console.log('adsfasdf', data)

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
      console.error('error getting user', err)
    })
})

window.addEventListener('message', (event) => {
  if (event.data.action !== 'pollInvoiceStatus') return
  if (window.location.origin !== event.origin) return null

  pollInvoiceStatus(event.origin, event.data.payload)
    .then((data) => {
      console.log('pollInvoiceStatus', data)
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
      console.error('error getting user', err)
    })
})

export {}
