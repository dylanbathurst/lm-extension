import browser from 'webextension-polyfill';

export type ProfileType = {
  firstName: string;
  lastName: string;
  email: string;
  gender: ['Male', 'Female'];
  age: number;
  location: string;
};

type ActionPayloads = Partial<ProfileType>;
type ActionTypes = 'updateProfile';

export type MessageType = {
  application?: string;
  action?: ActionTypes;
  payload: ActionPayloads;
};

const actionParser = async (message: MessageType) => {
  if (message.application !== 'LUNCH_MONEY' || !message.action) {
    return;
  }

  switch (message.action) {
    case 'updateProfile':
      await browser.storage.local.set({
        profile: message.payload,
      });
      console.log('did it', message.payload);
      break;
    default:
      return;
  }
};

// type CompanyType = { total: 1000; remaining: 500 };
// async (message: MessageType, sender: Runtime.MessageSender) => {
//   if (message && message.application === 'LUNCH_MONEY') {
//     try {
//       const { remaining, total } = await checkCompany(message);
//       const lunchMoneyUser = await browser.storage.local.get([
//         'lunchMoneyUser',
//       ]);
//       const payload = { remaining, total, ...lunchMoneyUser };
//       return (remaining > 0 && payload) || null;
//     } catch (error) {
//       // Hack to set user when my wifi sucks
//       // return browser.storage.local.get(['lunchMoneyUser'])
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
