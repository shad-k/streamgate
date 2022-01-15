import React from 'react';
import useCreateStream from '../../hooks/useCreateStream';

const CreateStepper: React.FC<{}> = () => {
  const { step, steps } = useCreateStream();
  return (
    <ul className="steps">
      {steps.map((currentStep: string, index) => {
        return (
          <li key={index + 1} className={`step ${index + 1 <= step ? 'step-primary' : ''}`}>
            {currentStep}
          </li>
        );
      })}
    </ul>
  );
};

export default CreateStepper;
