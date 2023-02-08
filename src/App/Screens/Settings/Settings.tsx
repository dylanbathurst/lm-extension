import React, { FC, Fragment, useState } from 'react';
import browser from 'webextension-polyfill';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Dialog, Transition } from '@headlessui/react';

const NAME_DEFAULT = ['Satoshi', 'Nakamoto'];
const EMAIL_DEFAULT = 'hi@getlunchmoney.com';

export type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  gender: ['Male', 'Female'];
  age: number;
  location: string;
};

type SettingsComponentType = FC<{
  isOpen: boolean;
  closeModal: () => void;
}>;

const Settings: SettingsComponentType = ({ isOpen, closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    defaultValues: async () =>
      browser.storage.local.get('profile').then((result) => {
        return result.profile;
      }),
  });

  const onSubmit: SubmitHandler<Inputs> = (lunchMoneyUser) => {
    browser.runtime.sendMessage({
      application: 'LUNCH_MONEY',
      action: 'updateProfile',
      payload: lunchMoneyUser,
    });
  };

  return (
    <div className="fixed flex inset-0 overflow-y-auto text-white">
      <div className="flex flex-1 justify-end mt-10 p-4 text-center">
        <div className="flex flex-col w-full transform overflow-hidden rounded-lg bg-white bg-opacity-10 p-6 text-left align-middle shadow-xl transition-all">
          <h3 className="text-lg">Settings</h3>
          <div className="flex flex-1 flex-col">
            {!isSubmitting && !isSubmitSuccessful && (
              <form
                noValidate
                className="flex flex-1 flex-col justify-between"
                onSubmit={handleSubmit(onSubmit)}
              >
                <label>
                  <span>First Name</span>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md bg-gray-100 bg-opacity-10 border-transparent focus:border-gray-500 focus:ring-0"
                    placeholder={NAME_DEFAULT[0]}
                    {...register('firstName', {
                      required: true,
                    })}
                  />
                </label>{' '}
                <label>
                  <span>Last Name</span>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md bg-gray-100 bg-opacity-10 border-transparent focus:border-gray-500 focus:ring-0"
                    placeholder={NAME_DEFAULT[1]}
                    {...register('lastName', {
                      required: true,
                    })}
                  />
                </label>
                <label>
                  <span>Your email address</span>
                  <div className="flex justify-between py-1 mt-1 w-full bg-gray-100 bg-opacity-10 border-transparent rounded-md focus-within:border focus-within:border-gray-500 focus-within:ring-0">
                    <input
                      type="email"
                      className="grow border-0 bg-transparent focus:border-gray-500 focus:ring-0"
                      placeholder={EMAIL_DEFAULT}
                      {...register('email', {
                        required: true,
                      })}
                    />
                  </div>
                </label>
                <div className="">
                  <label>
                    <span>Gender</span>
                    <select
                      className="block w-full mt-1 rounded-md bg-gray-100 bg-opacity-10 border-transparent focus:border-gray-500 focus:ring-0"
                      {...register('gender', { required: true })}
                    >
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                </div>
                <div>
                  <label>
                    <span>Age</span>
                    <input
                      className="mt-1 block w-full rounded-md bg-gray-100 bg-opacity-10 border-transparent focus:border-gray-500 focus:ring-0"
                      type="text"
                      {...register('age', { required: true })}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    <span>Zip Code</span>
                    <input
                      className="mt-1 block w-full rounded-md bg-gray-100 bg-opacity-10 border-transparent focus:border-gray-500 focus:ring-0"
                      type="text"
                      {...register('location', { required: true })}
                    />
                  </label>
                </div>
                <input
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-dark-mode px-4 py-4 text-lg font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                />
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
