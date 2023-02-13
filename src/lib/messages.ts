import browser from 'webextension-polyfill';
import { MessageType } from '../Background/actions';

const sendMessage = (
  action: MessageType['action'],
  payload: MessageType['payload']
) => {
  return browser.runtime.sendMessage({
    application: 'LUNCH_MONEY',
    action,
    payload,
  });
};

const updateSettings = (settings: Required<MessageType['payload']>) =>
  sendMessage('updateProfile', settings);

export { updateSettings };
