import React from 'react';

import useCreateStream from '../../hooks/useCreateStream';

const CreateStreamFinal: React.FC<{}> = () => {
  const { step, prevStep, stepDetails, updateStepDetails } = useCreateStream();

  const submitHandler = async (event) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const { streamName } = target;
    if (streamName.value) {
      updateStepDetails(step - 1, {
        streamName: streamName.value,
      });
    }
    target.reset();
  };

  return (
    <div className="pb-4">
      <div className="hero">
        <div className="hero-content w-full md:w-1/2">
          <form className="form-control w-full space-y-4" onSubmit={submitHandler}>
            <label className="text-xl label label-text" htmlFor="streamName">
              Enter stream name (optional)
            </label>
            <input
              className="input rounded-box input-primary"
              defaultValue={stepDetails[step]?.apiKey}
              name="streamName"
              id="streamName"
              placeholder="Enter your stream name"
            />
            <div className="flex items-center justify-around py-4">
              <button type="button" className="btn w-36 btn-primary btn-outline" onClick={prevStep}>
                Back
              </button>
              <button type="submit" className="btn btn-primary w-48">
                Create Stream
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateStreamFinal;
