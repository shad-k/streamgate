import React, { FormEvent } from 'react';
import { BiLinkExternal } from 'react-icons/bi';

import useCreateStream from '../../hooks/useCreateStream';

const LivepeerAPIForm: React.FC<{}> = () => {
  const { step, nextStep, prevStep, stepDetails, updateStepDetails } = useCreateStream();

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const { apikey } = target;

    updateStepDetails(step, {
      apiKey: apikey.value,
    });
    nextStep();
    target.reset();
  };

  return (
    <div>
      <div className="hero">
        <div className="hero-content w-full md:w-1/2">
          <form className="form-control w-full space-y-4" onSubmit={submitHandler}>
            <label className="text-xl label label-text" htmlFor="apikey">
              Livepeer.com API Key
            </label>
            <input
              className="input rounded-box input-primary"
              defaultValue={stepDetails[step]?.apiKey}
              name="apikey"
              id="apikey"
              placeholder="Enter your API key here"
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
            Our live streams are powered by &nbsp;
            <a href="https://livepeer.com/" className="link font-bold text-lg inline-flex items-center">
              Livepeer.com
              <BiLinkExternal />
            </a>
            . You will need a Livepeer.com API key to setup a live stream.
          </p>
          <div className="mt-4">
            <span className="text-lg">Steps to acquire an API key:</span>
            <ol className="list-decimal list-inside">
              <li>Sign up/ Log in to Livepeer.com.</li>
              <li>In the sidebar click on &quot;Developers&quot; and then &quot;API Keys&quot; tab.</li>
              <li>Click on &quot;Create Key&quot; to create an API Key.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivepeerAPIForm;
