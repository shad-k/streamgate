import React from 'react';
import { CreateContext } from '../components/create/CreateStreamProvider';

const steps = ['API Key', 'Configure Access Control', 'Create Stream'];

const useCreateStream = () => {
  const context = React.useContext(CreateContext);

  return {
    steps,
    ...context,
  };
};

export default useCreateStream;
