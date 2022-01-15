import React, { PropsWithChildren } from 'react';

const initialState = {
  step: 1,
  stepDetails: [],
  nextStep: () => {},
  prevStep: () => {},
  reset: () => {},
  updateStepDetails: (step: number, details: { [index: string]: unknown }) => {},
};

export const CreateContext = React.createContext(initialState);

const CreateStreamProvider: React.FC<PropsWithChildren<{}>> = (props) => {
  const [step, setStep] = React.useState(1);
  const [stepDetails, setStepDetails] = React.useState([]);

  const nextStep = () => setStep((val) => (val < 3 ? val + 1 : val));
  const prevStep = () => setStep((val) => (val > 1 ? val - 1 : val));
  const reset = () => {
    setStep(1);
    setStepDetails(initialState.stepDetails);
  };
  const updateStepDetails = (currentStep, details) => {
    const newStepDetails = [...stepDetails];
    newStepDetails[currentStep] = details;
    setStepDetails(newStepDetails);
  };

  return (
    <CreateContext.Provider
      value={{
        step,
        stepDetails,
        nextStep,
        prevStep,
        reset,
        updateStepDetails,
      }}
      {...props}
    />
  );
};

export default CreateStreamProvider;
