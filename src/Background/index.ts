import browser, { Runtime } from 'webextension-polyfill';

type MessageType = {
  application?: string;
  apiKey?: string;
};

type CompanyType = { total: 1000; remaining: 500 };
/*
 * This is the meat of the application. The extension listens for a message from its
 * content script asking for the user's data. It checks that the company is a paying
 * customer before sending a message with the users data.
 */
browser.runtime.onMessage.addListener(
  async (message: MessageType, sender: Runtime.MessageSender) => {
    if (message && message.application === 'lunchMoney') {
      try {
        const { remaining, total } = await checkCompany(message);
        const lunchMoneyUser = await browser.storage.local.get([
          'lunchMoneyUser',
        ]);
        const payload = { remaining, total, ...lunchMoneyUser };
        return (remaining > 0 && payload) || null;
      } catch (error) {
        // Hack to set user when my wifi sucks
        // return browser.storage.local.get(['lunchMoneyUser'])
      }
    }
  }
);

async function checkCompany(message: MessageType) {
  // make sure the message is coming from the content script
  const res = await fetch(`http://localhost:3001/current-session`);
  const resJson: CompanyType = await res.json();
  console.log(resJson);
  return resJson;
}

browser.runtime.onInstalled.addListener(() => {
  browser.runtime.openOptionsPage();
});

export {};
