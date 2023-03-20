import browser from 'webextension-polyfill';
import { RootState } from './store';

export type ProfileType = {
  firstName: string;
  lastName: string;
  email: string;
  gender: ['Male', 'Female'];
  age: number;
  location: string;
};

export type MessageType = {
  application?: string;
} & {
  action: 'requestUser';
  payload: { origin: string };
};

const actionParser = async (message: MessageType) => {
  if (message.application !== 'LUNCH_MONEY' || !message.action) {
    return;
  }
  switch (message.action) {
    case 'requestUser':
      console.log('gettign here');
      let tabs = await browser.tabs.query({ active: true });

      // Check if the message sender is also the active tab url
      tabs = tabs.filter((tab) =>
        String(tab.url).startsWith(message.payload.origin)
      );

      const lmUser = (await browser.storage.sync.get('LM_STORE')) as {
        LM_STORE: RootState;
      };
      const profile = lmUser.LM_STORE.userProfile;
      return { profile };
    default:
      return;
  }
};

// type CompanyType = { total: 1000; remaining: 500 };
// async (message: MessageType, sender: Runtime.MessageSender) => {
//   if (message && message.application === 'LUNCH_MONEY') {
//     try {
//       const { remaining, total } = await checkCompany(message);
//       const lunchMoneyUser = await browser.storage.sync.get([
//         'lunchMoneyUser',
//       ]);
//       const payload = { remaining, total, ...lunchMoneyUser };
//       return (remaining > 0 && payload) || null;
//     } catch (error) {
//       // Hack to set user when my wifi sucks
//       // return browser.storage.sync.get(['lunchMoneyUser'])
//     }
//   }
// }
// async function checkCompany(message: MessageType) {
//   // make sure the message is coming from the content script
//   const res = await fetch(`http://localhost:3001/current-session`);
//   const resJson: CompanyType = await res.json();
//   console.log(resJson);
//   return resJson;
// }

export default actionParser;
