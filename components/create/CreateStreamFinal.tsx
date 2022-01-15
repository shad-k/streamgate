import axios from 'axios';
import React from 'react';

import useCreateStream from '../../hooks/useCreateStream';
import { checkIfAccessControlAndSaveConditions } from '../../utils/litProtocolHelpers';
import { createStream } from '../../utils/livepeerHelpers';

const CreateStreamFinal: React.FC<{}> = () => {
  const { step, prevStep, nextStep, stepDetails, updateStepDetails } = useCreateStream();
  const [creatingStream, setCreatingStream] = React.useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    setCreatingStream(true);

    const target = event.target as HTMLFormElement;
    const { streamName } = target;
    if (streamName.value) {
      updateStepDetails(step - 1, {
        streamName: streamName.value,
      });
    }

    try {
      const streamDetails = await createStream(stepDetails['1'], streamName.value);
      // Prefilling details for the next step
      // @ts-ignore
      const { accessControlConditions, resourceId } = await checkIfAccessControlAndSaveConditions(
        stepDetails['2'],
        streamDetails.playbackId
      );

      const res = await axios.post('/api/writeToIPFS', {
        playbackId: streamDetails.playbackId,
        accessControlConditions,
        resourceId,
      });

      updateStepDetails(step + 1, {
        ...streamDetails,
        cid: res.data.cid,
      });
    } catch (error) {
      alert(`Something went wrong: ${error.message}`);
    }
    setCreatingStream(false);
    target.reset();
    nextStep();
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
              <button type="submit" className={`btn btn-primary w-48 ${creatingStream ? 'loading' : ''}`}>
                {creatingStream ? 'Creating...' : 'Create Stream'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateStreamFinal;
