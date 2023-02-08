import browser from 'webextension-polyfill';

browser.runtime
  .sendMessage({
    application: 'LUNCH_MONEY',
    apiKey: window.sessionStorage.getItem('lunchMoneyKey'),
  })
  .then((data) => {
    // if (!data.lunchMoneyUser) return null;
    // window.sessionStorage.setItem(
    //   'lunchMoneyUser',
    //   JSON.stringify(data.lunchMoneyUser)
    // );
  });

export {};
