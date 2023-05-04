import browser from 'webextension-polyfill'
import { MessageType } from 'Background/actions'

export const sendMessage = ({ action, payload }: MessageType) =>
  browser.runtime.sendMessage({
    application: 'LUNCH_MONEY',
    action,
    payload,
  })

export const requestUser = () =>
  sendMessage({ action: 'requestUser', payload: { origin } })
