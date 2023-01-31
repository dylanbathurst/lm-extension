import React, { useEffect, useState } from 'react';
import * as openpgp from 'openpgp';

type Props = {
  passphrase: string;
  user: {};
};

const useCreateKeys = ({ user, passphrase }: Props) => {
  const [keys, setKeys] = useState<{ privateKey: string; publicKey: string }>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function createKeys() {
      try {
        setIsLoading(true);
        const { privateKey, publicKey } = await openpgp.generateKey({
          type: 'rsa', // Type of the key
          rsaBits: 4096, // RSA key size (defaults to 4096 bits)
          userIDs: [user], // you can pass multiple user IDs
          passphrase,
        });
        setKeys({ privateKey, publicKey });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }

    if (!keys) {
      createKeys();
    }
  }, [keys, passphrase, user]);

  return { isLoading, keys };
};

export default useCreateKeys;
