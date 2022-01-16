import React from 'react';
import LitJsSdk from 'lit-js-sdk';
import { useRouter } from 'next/router';

import litNodeClient from '../../utils/litNodeClient';
import axios from 'axios';

const ConnectWallet: React.FC<{}> = () => {
  const router = useRouter();
  const cid = router.query.cid as string;
  const [connecting, setConnecting] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  const connectWallet = async () => {
    setConnecting(true);
    const res = await axios.post('/api/getJSONFromIPFS', { cid });
    const { playbackId, accessControlConditions, resourceId } = res.data;
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: 'ethereum' });
    try {
      const jwt = await litNodeClient.getSignedToken({
        accessControlConditions,
        chain: 'ethereum',
        authSig,
        resourceId: {
          ...resourceId,
          orgId: '',
          role: '',
          extraData: '',
        },
      });

      router.replace(`/stream/${playbackId}?jwt=${jwt}`);
      setConnecting(false);
    } catch (error) {
      if (error.code === 'not_authorized') {
        setShowError(true);
      }
      console.log(error);
      setConnecting(false);
    }
  };

  React.useEffect(() => {
    window.alert = () => {};
  }, []);

  return (
    <div className="flex flex-col w-full h-80 items-center justify-center px-10">
      {!showError && (
        <>
          <button className={`btn btn-lg btn-primary ${connecting ? 'loading' : ''}`} onClick={connectWallet}>
            Connect Wallet
          </button>
          <span className="mt-4 text-center">
            You need to sign a message with your wallet to check whether you pass the access control conditions
          </span>
        </>
      )}
      {showError && (
        <div className="alert alert-error">
          <div className="flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-6 h-6 mx-2 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              ></path>
            </svg>
            <label>You are not allowed to access this live stream</label>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
