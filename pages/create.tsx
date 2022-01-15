import React from 'react';
import CreateStepper from '../components/create/CreateStepper';
import CreateStreamProvider from '../components/create/CreateStreamProvider';

import LivepeerAPIForm from '../components/create/LivepeerAPIForm';
import LitTokenGating from '../components/create/LitTokenGating';
import useCreateStream from '../hooks/useCreateStream';

// show form
// save api key
// add access constraints
//

const ResetButton = () => {
  const { reset } = useCreateStream();
  return (
    <button onClick={reset} className="btn btn-sm btn-error btn-outline">
      Reset
    </button>
  );
};

const StepBody = () => {
  const { step } = useCreateStream();
  const renderStep = React.useCallback((currentStep) => {
    switch (currentStep) {
      case 1:
        return <LivepeerAPIForm />;
      case 2:
      case 3:
        return <LitTokenGating />;
    }
  }, []);
  return renderStep(step);
};

const Create: React.FC<{}> = () => {
  return (
    <CreateStreamProvider>
      <div className="flex justify-end px-4">
        <ResetButton />
      </div>
      <div className="card bg-slate-700 m-10 ">
        <CreateStepper />
      </div>
      <StepBody />
    </CreateStreamProvider>
  );
};

export default Create;
