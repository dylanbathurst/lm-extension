export const requestInfo = ({
  url,
  macaroon,
}: {
  url: string
  macaroon: string
}) =>
  fetch(`${url}/v1/getinfo`, {
    headers: {
      'Content-Type': 'application/json',
      'Grpc-Metadata-macaroon': macaroon,
    },
  })

export const requestNodeInfo = ({
  url,
  macaroon,
  pubKey,
}: {
  url: string
  macaroon: string
  pubKey: string
}) =>
  fetch(`${url}/v1/graph/node/${pubKey}`, {
    headers: {
      'Content-Type': 'application/json',
      'Grpc-Metadata-macaroon': macaroon,
    },
  })

export const getBalance = ({
  url,
  macaroon,
}: {
  url: string
  macaroon: string
}) =>
  fetch(`${url}/v1/balance/channels`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Grpc-Metadata-macaroon': macaroon,
    },
  })

export const listInvoices = ({
  url,
  macaroon,
}: {
  url: string
  macaroon: string
}) =>
  fetch(`${url}/v1/invoices`, {
    headers: {
      'Content-Type': 'application/json',
      'Grpc-Metadata-macaroon': macaroon,
    },
  })

export const getInvoice = ({
  url,
  macaroon,
  r_hash,
}: {
  url: string
  macaroon: string
  r_hash: string
}) => {
  return fetch(`${url}/v1/invoice/${base64ToHex(r_hash)}`, {
    headers: {
      'Content-Type': 'application/json',
      'Grpc-Metadata-macaroon': macaroon,
    },
  })
}

export const createInvoice = ({
  url,
  macaroon,
  memo,
}: {
  url: string
  macaroon: string
  memo: string
}) => {
  return fetch(`${url}/v1/invoices`, {
    body: JSON.stringify({
      value: 21,
      memo,
    }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Grpc-Metadata-macaroon': macaroon,
    },
  })
}

function base64ToHex(str: string) {
  for (
    var i = 0, bin = atob(str.replace(/[ \r\n]+$/, '')), hex = [];
    i < bin.length;
    ++i
  ) {
    let tmp = bin.charCodeAt(i).toString(16)
    if (tmp.length === 1) tmp = '0' + tmp
    hex[hex.length] = tmp
  }
  return hex.join('')
}
