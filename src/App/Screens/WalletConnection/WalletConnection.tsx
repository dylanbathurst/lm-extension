import React, { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  ConnectionType,
  actions,
  walletConnections,
} from 'Background/walletConnectionSlice'
import { TrashIcon } from '@bitcoin-design/bitcoin-icons-react/filled'
import { getBalance, requestInfo } from 'lib/api'
import { useAppDispatch, useAppSelector } from 'Background/hooks'

import Card from '../../Components/Card'

type ConnectionFormType = {
  url: string
  macaroon: string
}

const Wallet: FC = () => {
  const dispatch = useAppDispatch()
  const connections = useAppSelector(walletConnections)
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ConnectionFormType>()

  const getNodeInfo = async ({ url, macaroon }: ConnectionFormType) => {
    // if connection is not success full, I need to alert the user that it might be because of
    // TLS Cert issue. they should open the url in their browser, click advanced, and click proceed
    const infoReq = await requestInfo({ url, macaroon })
    const nodeInfo: ConnectionType = await infoReq.json()
    return nodeInfo
  }

  const getNodeBalance = async ({ url, macaroon }: ConnectionFormType) => {
    const balanceReq = await getBalance({ url, macaroon })
    const { balance }: { balance: number } = await balanceReq.json()
    return balance
  }

  const setNodeConnection = async ({ url, macaroon }: ConnectionFormType) => {
    const nodeInfo = await getNodeInfo({ url, macaroon })
    const balance = await getNodeBalance({ url, macaroon })

    if (!nodeInfo || !balance) {
      alert('Invalid Connection')
      return
    }

    dispatch(
      actions.addConnection({
        provider: 'lnd',
        macaroon,
        url,
        alias: nodeInfo.alias,
        balance,
      })
    )
  }

  const onSubmit: SubmitHandler<ConnectionFormType> = async ({
    url,
    macaroon,
  }) => {
    if (!url.startsWith('https://')) {
      url = `https://${url}`
    }
    await setNodeConnection({ url, macaroon })
    reset()
  }

  const handleRemoveConnection = () => {
    dispatch(actions.removeConnection())
  }

  useEffect(() => {
    const updateConnection = async () => {
      const connection = connections[0]
      if (connection) {
        const { url, macaroon } = connection
        const nodeInfo = await getNodeInfo({ url, macaroon })
        const balance = await getNodeBalance({
          url,
          macaroon,
        })

        dispatch(
          actions.updateConnection({
            index: 0,
            connection: { ...connection, ...nodeInfo, balance },
          })
        )
      }
    }

    if (connections.length > 0) {
      updateConnection()
    }
  }, [])

  // if No connected wallets, show new wallet onboarding flow
  return (
    <>
      <h3 className="text-lg py-10">Connection</h3>
      <div className="flex flex-1 rounded-2xl p-6 bg-base-300 text-base-content">
        {connections.length > 0 ? (
          <Card>
            {connections.map((connection, i) => (
              <div
                key={connection.alias + i}
                className="flex flex-1 justify-between align-middle"
              >
                <div className="flex items-center">
                  <img
                    width={35}
                    height={35}
                    src="/lnd.png"
                    className="border-2 border-white rounded-full mr-4 h-[35px]"
                  />
                  <div className="flex flex-col">
                    <div className="capitalize text-2xl">
                      {connection.alias}
                    </div>
                    <div className="uppercase">{connection.provider}</div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleRemoveConnection}
                    className="btn btn-primary bg-bitcoin"
                  >
                    <TrashIcon style={{ height: '32px', width: '32px' }} />
                  </button>
                  <span>{connection.balance} sats</span>
                </div>
              </div>
            ))}
          </Card>
        ) : (
          <Card>
            <div className="flex flex-1 justify-between items-center gap-10">
              <div className="flex flex-col justify-start text-center w-1/2">
                <img
                  width={100}
                  src="/lnd.png"
                  className="border-2 border-white rounded-full self-center mb-5"
                />
                <h2 className="text-lg">Connect your LND Lightning Wallet</h2>
                <p>
                  <Link to="/wallet">Use the LunchMoney Wallet</Link>
                </p>
              </div>
              <form
                noValidate
                className="flex flex-col gap-4 flex-1"
                onSubmit={handleSubmit(onSubmit)}
              >
                <label className="flex-grow">
                  <span>LND REST Url</span>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md dark:bg-white/10 border-transparent focus:border-gray-500 focus:ring-0"
                    {...register('url', {
                      required: true,
                    })}
                  />
                </label>
                <label className="flex-grow">
                  <span>You Admin Macaroon</span>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md dark:bg-white/10 border-transparent focus:border-gray-500 focus:ring-0"
                    {...register('macaroon', {
                      required: true,
                    })}
                  />
                </label>
                <input
                  disabled={isSubmitting}
                  type="submit"
                  value="Connect"
                  className="inline-flex rounded-lg border dark:border-white opacity-60 hover:opacity-75 self-end px-6 py-2 text-lg font-medium hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                />
              </form>
            </div>
          </Card>
        )}
      </div>
    </>
  )
}

export default Wallet
