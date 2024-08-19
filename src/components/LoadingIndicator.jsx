import React from 'react';
import { Spinner } from '@nextui-org/react';

const LoadingIndicator = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner size="lg" />
    </div>
  );
};

export default LoadingIndicator;
