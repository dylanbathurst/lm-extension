import React, { FC } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { actions, ProfileType } from 'Background/userProfileSlice'
import { useAppDispatch, useAppSelector } from 'Background/hooks'

import FormGroup from '../../Components/Card'

const NAME_DEFAULT = ['Satoshi', 'Nakamoto']
const EMAIL_DEFAULT = 'hi@getlunchmoney.com'

type SettingsComponentType = FC<{
  isOpen: boolean
  closeModal: () => void
}>

const Settings: SettingsComponentType = ({ isOpen, closeModal }) => {
  const dispatch = useAppDispatch()
  const userProfile = useAppSelector((state) => state.userProfile)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Partial<ProfileType>>({
    defaultValues: async () => userProfile,
  })

  const onSubmit: SubmitHandler<Partial<ProfileType>> = (lunchMoneyUser) => {
    dispatch(actions.updateProfile(lunchMoneyUser))
    alert('Updated Successfully')
  }

  return (
    <>
      <h3 className="text-lg py-10">Settings</h3>
      <div className="flex flex-1 rounded-2xl p-6 bg-base-300 text-base-content">
        <form
          noValidate
          className="flex flex-col gap-4 flex-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <FormGroup>
              <label className="flex-grow">
                <span>First Name</span>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md dark:bg-white/10 border-transparent focus:border-gray-500 focus:ring-0"
                  placeholder={NAME_DEFAULT[0]}
                  {...register('firstName', {
                    required: true,
                  })}
                />
              </label>
              <label className="flex-grow">
                <span>Last Name</span>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md dark:bg-white/10 border-transparent focus:border-gray-500 focus:ring-0"
                  placeholder={NAME_DEFAULT[1]}
                  {...register('lastName', {
                    required: true,
                  })}
                />
              </label>
            </FormGroup>
            <FormGroup>
              <label className="flex-grow">
                <span>Your email address</span>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md dark:bg-white/10 border-transparent focus:border-gray-500 focus:ring-0"
                  placeholder={EMAIL_DEFAULT}
                  {...register('email', {
                    required: true,
                  })}
                />
              </label>
            </FormGroup>
            <FormGroup>
              <label className="flex-grow">
                <span>Gender</span>
                <select
                  className="block w-full mt-1 rounded-md dark:bg-white/10 border-transparent focus:border-gray-500 focus:ring-0"
                  {...register('gender', { required: true })}
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label className="flex-grow">
                <span>Age</span>
                <input
                  className="mt-1 block w-full rounded-md dark:bg-white/10 border-transparent focus:border-gray-500 focus:ring-0"
                  type="text"
                  {...register('age', { required: true })}
                />
              </label>
              <label className="flex-grow">
                <span>Zip Code</span>
                <input
                  className="mt-1 block w-full rounded-md dark:bg-white/10 border-transparent focus:border-gray-500 focus:ring-0"
                  type="text"
                  {...register('location', { required: true })}
                />
              </label>
            </FormGroup>
          </div>
          <FormGroup>
            <input
              disabled={isSubmitting}
              type="submit"
              value="Update"
              className="btn btn-primary"
            />
          </FormGroup>
        </form>
      </div>
    </>
  )
}

export default Settings
