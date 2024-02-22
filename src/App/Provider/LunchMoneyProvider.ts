import { ProfileType } from 'Background/userProfileSlice'
import { LunchMoneyProvider, RequestModel } from './types'

export default class MyProvider implements LunchMoneyProvider {
  public userInfo: Partial<ProfileType | undefined> = undefined

  protected checkForProfile = (
    event: MessageEvent<{
      application: string
      action: string
      payload: Partial<ProfileType>
    }>
  ) => {
    if (event.data.action !== 'profile') return
    if (event.data.application !== 'LUNCH_MONEY') return
    if (!event.data.payload) return

    this.userInfo = event.data.payload

    const profileEvent = new CustomEvent('profile', {
      detail: this.userInfo,
    })

    window.dispatchEvent(profileEvent)
  }

  protected checkForInvoice = (
    event: MessageEvent<{
      application: string
      action: string
      payload: { payment_request: string; r_hash: string }
    }>
  ) => {
    if (
      event.data.action !== 'invoice' ||
      event.data.application !== 'LUNCH_MONEY' ||
      !event.data.payload.payment_request
    )
      return

    const invoiceEvent = new CustomEvent('invoice', {
      detail: event.data.payload.payment_request,
    })

    window.dispatchEvent(invoiceEvent)
  }

  createInfoRequest = (requestModel: RequestModel) => {
    window.addEventListener('message', this.checkForInvoice)
    window.addEventListener('message', this.checkForProfile)
    window.postMessage(
      {
        application: 'LUNCH_MONEY',
        action: 'createPayment',
        payload: requestModel,
      },
      '*'
    )
  }
}
