import browser from 'webextension-polyfill'

export default function injectScript() {
  try {
    if (!document) throw new Error('No document')
    const container = document.head || document.documentElement
    if (!container) throw new Error('No container element')
    const scriptEl = document.createElement('script')
    scriptEl.setAttribute('async', 'false')
    scriptEl.setAttribute('type', 'text/javascript')
    scriptEl.setAttribute(
      'src',
      browser.runtime.getURL('inpageScript.bundle.js')
    )
    container.appendChild(scriptEl)
  } catch (err) {
    console.error('LunchMoney script injection failed', err)
  }
}
