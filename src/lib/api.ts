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

export const createInvoice = ({
  url,
  macaroon,
  memo,
}: {
  url: string
  macaroon: string
  memo: string
}) =>
  fetch(`${url}/v1/invoices`, {
    body: JSON.stringify({
      value: 10000,
      memo,
    }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Grpc-Metadata-macaroon': macaroon,
    },
  })
