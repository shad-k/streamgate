import React from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import { ethers } from 'ethers';

import useCreateStream from '../../hooks/useCreateStream';

const LitTokenGating: React.FC<{}> = () => {
  const { step, nextStep, prevStep, stepDetails, updateStepDetails } = useCreateStream();

  const submitHandler = (event) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const { address, quantity, type } = target;

    if (!ethers.utils.isAddress(address.value)) {
      alert('Please enter a valid address');
      return;
    }
    updateStepDetails(step - 1, {
      address: address.value,
      quantity: quantity.value,
      type: type.value,
    });
    target.reset();
    nextStep();
  };
  return (
    <div className="pb-4">
      <div className="hero">
        <div className="hero-content w-full md:w-1/2">
          <form className="form-control w-full space-y-4" onSubmit={submitHandler}>
            <label className="text-xl label" htmlFor="address">
              Token/NFT Contract Address
              <button type="button" className="btn btn-outline btn-primary btn-xs" onClick={nextStep}>
                Skip
              </button>
            </label>
            <input
              className="input rounded-box input-primary"
              defaultValue={stepDetails[step]?.apiKey}
              name="address"
              id="address"
              placeholder="Enter a contract address"
              required
            />
            <div className="flex flex-col justify-start">
              <div className="text-xl label">Select token type</div>
              <label className="cursor-pointer label justify-start" htmlFor="ERC-20">
                <input type="radio" name="type" className="radio" value="ERC-20" id="ERC-20" required />
                <span className="label-text ml-2">ERC-20</span>
              </label>
              <label className="cursor-pointer label justify-start" htmlFor="ERC-721">
                <input type="radio" name="type" className="radio" value="ERC-721" id="ERC-721" required />
                <span className="label-text ml-2">ERC-721</span>
              </label>
              <label className="cursor-pointer label justify-start" htmlFor="ERC-1155">
                <input type="radio" name="type" className="radio" value="ERC-1155" id="ERC-1155" required />
                <span className="label-text ml-2">ERC-1155</span>
              </label>
            </div>
            <label className="text-xl label" htmlFor="quantity">
              Quantity
            </label>
            <input
              className="input rounded-box input-primary"
              defaultValue={stepDetails[step]?.apiKey}
              name="quantity"
              id="quantity"
              type="number"
              placeholder="Enter quantity of tokens required"
              required
            />
            <div className="flex items-center justify-around py-4">
              <button type="button" className="btn w-36 btn-primary btn-outline" onClick={prevStep}>
                Back
              </button>
              <button type="submit" className="btn btn-primary w-36">
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="card card-compact border border-info shadow-xl rounded-box m-20 relative text-accent-content">
        <div className="card-body">
          <p>
            You can control access to your live streams by using our token gating mechanism powered by&nbsp;
            <a href="https://litprotocol.com/" className="link font-bold text-lg inline-flex items-center">
              Lit Protocol
              <BiLinkExternal />
            </a>
          </p>
          <div className="mt-4 text-lg">
            <span className="">
              Add a token or NFT contract address above and mention the quantity required by the user to gain access to
              your live stream
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LitTokenGating;