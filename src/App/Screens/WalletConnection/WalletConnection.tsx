import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { actions, walletConnections } from 'Background/walletConnectionSlice'
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

  const onSubmit: SubmitHandler<ConnectionFormType> = async ({
    url,
    macaroon,
  }) => {
    // if connection is not success full, I need to alert the user that it might be because of
    // TLS Cert issue. they should open the url in their browser, click advanced, and click proceed
    const infoReq = await requestInfo({ url, macaroon })
    const { alias, identity_pubkey: pubKey, ...rest } = await infoReq.json()
    const balanceReq = await getBalance({ url, macaroon })
    const { balance } = await balanceReq.json()
    dispatch(
      actions.addConnection({ provider: 'lnd', macaroon, url, alias, balance })
    )
    reset()
  }

  const handleRemoveConnection = () => {
    dispatch(actions.removeConnection())
  }

  // if No connected wallets, show new wallet onboarding flow
  return (
    <>
      <h3 className="text-lg py-10">Connection</h3>
      <div className="flex flex-1 rounded-2xl p-6 bg-base-300 text-base-content">
        {connections.length > 0 ? (
          <Card>
            {connections.map((connection) => (
              <div
                key={connection.alias}
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
                <div>
                  <button
                    onClick={handleRemoveConnection}
                    className="btn btn-primary bg-bitcoin"
                  >
                    <TrashIcon style={{ height: '32px', width: '32px' }} />
                  </button>
                  {connection.balance} sats
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
                <p></p>
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
