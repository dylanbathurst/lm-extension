import browser from 'webextension-polyfill'
import actionParser, { MessageType } from './actions'

browser.runtime.onMessage.addListener((message: MessageType) => {
  return actionParser(message)
})

browser.runtime.onInstalled.addListener(() => {
  // browser.runtime.openOptionsPage();
})

export {}
