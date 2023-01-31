import React, { FC, useEffect, useState } from 'react';
import useCreateKeys from '../hooks/crypto/useCreateKeys';
import { Inputs } from '../Screens/Settings/Settings';

type Props =
  | {
      keys: { privateKey: string; publicKey: string };
      isLoading: false;
    }
  | {
      isLoading: true;
      keys?: never;
    };

const CreateUserKeys: FC<Props> = ({ isLoading, keys }) => {
  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div>
      Public Key: <textarea value={keys.publicKey} />
      Private Key: <textarea value={keys.privateKey} />
    </div>
  );
  // const message = await createMessage({
  //   binary: new Uint8Array([0x01, 0x01, 0x01]),
  // });
  // const encrypted = await encrypt({
  //   message, // input as Message object
  //   passwords: ['secret stuff'], // multiple passwords possible
  //   format: 'binary', // don't ASCII armor (for Uint8Array output)
  // });
  // console.log(encrypted); // Uint8Array
  // const encryptedMessage = await readMessage({
  //   binaryMessage: encrypted, // parse encrypted bytes
  // });
  // const { data: decrypted } = await decrypt({
  //   message: encryptedMessage,
  //   passwords: ['secret stuff'], // decrypt with password
  //   format: 'binary', // output as Uint8Array
  // });
  // console.log(decrypted); // Uint8Array([0x01, 0x01, 0x01])
};

export default CreateUserKeys;
