import LitJsSdk from 'lit-js-sdk';

const litNodeClient = new LitJsSdk.LitNodeClient();
litNodeClient.connect();

export default litNodeClient;
