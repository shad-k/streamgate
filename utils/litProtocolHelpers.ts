import LitJsSdk from 'lit-js-sdk';
import litNodeClient from './litNodeClient';

export const checkIfAccessControlAndSaveConditions = async (details, playbackId) => {
  if (!details || !details.address) {
    return Promise.resolve({
      accessControlConditions: null,
      resourceId: null,
    });
  }

  return new Promise(async (resolve) => {
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: 'ethereum' });
    const accessControlConditions = [
      {
        contractAddress: details.address,
        standardContractType: details.type,
        chain: 'ethereum',
        method: 'balanceOf',
        parameters: [':userAddress'],
        returnValueTest: {
          comparator: '>',
          value: details.quantity,
        },
      },
      {
        operator: 'or',
      },
      {
        // To authorize the creator of the stream irrespective of whether they satisfy the access control conditions
        contractAddress: '',
        standardContractType: '',
        chain: 'ethereum',
        method: '',
        parameters: [':userAddress'],
        returnValueTest: {
          comparator: '=',
          value: authSig.address,
        },
      },
    ];
    const resourceId = {
      baseUrl: window.location.host,
      path: `/stream/${playbackId}`,
      orgId: '',
      role: '',
      extraData: '',
    };

    await litNodeClient.saveSigningCondition({
      accessControlConditions,
      chain: 'ethereum',
      authSig,
      resourceId,
    });

    resolve({
      accessControlConditions,
      resourceId,
    });
  });
};
