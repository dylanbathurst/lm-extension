import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Card from '../../Components/Card';
import { actions, ProfileType } from '../../../Background/userProfileSlice';
import { useAppDispatch, useAppSelector } from '../../../Background/hooks';

const NAME_DEFAULT = ['Satoshi', 'Nakamoto'];
const EMAIL_DEFAULT = 'hi@getlunchmoney.com';

type SettingsComponentType = FC<{
  isOpen: boolean;
  closeModal: () => void;
}>;

const Settings: SettingsComponentType = ({ isOpen, closeModal }) => {
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => state.userProfile);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProfileType>({
    defaultValues: async () => userProfile,
  });

  const onSubmit: SubmitHandler<ProfileType> = (lunchMoneyUser) => {
    dispatch(actions.updateProfile(lunchMoneyUser));
    alert('Updated Successfully');
  };

  return (
    <>
      <div className="flex flex-col mx-auto min-w-[20rem] justify-center transform overflow-hidden">
        <h3 className="text-lg">Settings</h3>
        <form
          noValidate
          className="flex flex-col gap-4 flex-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-4">
            <Card>
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
            </Card>
            <Card>
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
            </Card>
            <Card>
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
            </Card>
            <Card>
              <label className="flex-grow">
                <span>Age</span>
                <input
                  className="mt-1 block w-full rounded-md dark:bg-white/10 border-transparent focus:border-gray-500 focus:ring-0"
                  type="text"
                  {...register('age', { required: true })}
                />
              </label>
            </Card>
            <Card>
              <label className="flex-grow">
                <span>Zip Code</span>
                <input
                  className="mt-1 block w-full rounded-md dark:bg-white/10 border-transparent focus:border-gray-500 focus:ring-0"
                  type="text"
                  {...register('location', { required: true })}
                />
              </label>
            </Card>
          </div>
          <input
            disabled={isSubmitting}
            type="submit"
            value="Update"
            className="inline-flex rounded-lg border dark:border-white opacity-60 hover:opacity-75 self-end px-6 py-2 text-lg font-medium hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          />
        </form>
      </div>
    </>
  );
};

export default Settings;
