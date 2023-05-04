import browser from 'webextension-polyfill'
import actionParser from './actions'

browser.runtime.onMessage.addListener(actionParser)

browser.runtime.onInstalled.addListener(() => {
  // browser.runtime.openOptionsPage();
})

export {}
