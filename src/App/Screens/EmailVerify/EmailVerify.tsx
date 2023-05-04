import React, { FC } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import browser from 'webextension-polyfill'
import { actions } from 'Background/userProfileSlice'
import { useAppDispatch } from 'Background/hooks'

import { useAuth } from '../../Components/AuthProvider/AuthProvider'
// @ts-ignore
import email from '../../email.svg'

const EMAIL_DEFAULT = 'hi@getlunchmoney.com'

export type Inputs = {
  email: string
}

const EmailVerify: FC = () => {
  const auth = useAuth()
  let navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { register, handleSubmit } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (lunchMoneyUser) => {
    dispatch(actions.updateProfile(lunchMoneyUser))
    browser.runtime
      .sendMessage({
        application: 'LUNCH_MONEY',
        action: 'updateProfile',
        payload: lunchMoneyUser,
      })
      .then(() => {
        auth.signin(() => {
          navigate('/dashboard')
        })
      })
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col justify-center items-center px-7 mt-40 text-white">
          <img className="" src={email} width="40" alt="email icon" />
          <h1 className="text-2xl mt-10 font-extrabold">Enter Your Email</h1>
        </div>
        <form
          noValidate
          className="flex flex-1 flex-col justify-between pt-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="px-10">
            <label>
              <div
                className="flex justify-between
                    py-1
                    mt-1
                    w-full
                    text-white
                    bg-input-bg
                    placeholder:text-white
                    border-transparent
                    rounded-md
                    focus-within:outline-none
                    focus-within:outline-blue-600
                    focus-within:outline-1"
              >
                <input
                  type="email"
                  className="grow border-0 bg-transparent focus:ring-0"
                  placeholder={EMAIL_DEFAULT}
                  {...register('email', {
                    required: true,
                  })}
                />
              </div>
            </label>
            <p className="text-white text-center pt-2">
              Your email address is masked by default.
            </p>
          </div>
          <input
            type="submit"
            value="Get Started"
            className="text-lg rounded-md bg-b-orange mt-2 py-3 font-medium text-dark-mode"
          />
        </form>
      </div>
    </div>
  )
}

export default EmailVerify
