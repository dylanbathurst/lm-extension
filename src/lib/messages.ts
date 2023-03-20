import browser from 'webextension-polyfill';
import { MessageType, ProfileType } from '../Background/actions';

const sendMessage = ({ action, payload }: MessageType) =>
  browser.runtime.sendMessage({
    application: 'LUNCH_MONEY',
    action,
    payload,
  });

const requestUser = () =>
  sendMessage({ action: 'requestUser', payload: { origin } });

const requestInfo = ({ url, macaroon }: { url: string; macaroon: string }) =>
  fetch(`${url}/v1/getinfo`, {
    headers: {
      'Content-Type': 'application/json',
      'Grpc-Metadata-macaroon': macaroon,
    },
  });

const requestNodeInfo = ({
  url,
  macaroon,
  pubKey,
}: {
  url: string;
  macaroon: string;
  pubKey: string;
}) =>
  fetch(`${url}/v1/graph/node/${pubKey}`, {
    headers: {
      'Content-Type': 'application/json',
      'Grpc-Metadata-macaroon': macaroon,
    },
  });

const getBalance = ({ url, macaroon }: { url: string; macaroon: string }) =>
  fetch(`${url}/v1/balance/channels`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Grpc-Metadata-macaroon': macaroon,
    },
  });

const createInvoice = ({ url, macaroon }: { url: string; macaroon: string }) =>
  fetch(`${url}/v1/invoices`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Grpc-Metadata-macaroon': macaroon,
    },
  });

export { getBalance, requestUser, requestNodeInfo, requestInfo, createInvoice };
