import React from 'react';
import { useRouter } from 'next/router';

const Stream: React.FC<{}> = () => {
  const router = useRouter();
  return (
    <div>
      {router.query.cid as string}
      {router.query.id as string}
    </div>
  );
};

export default Stream;
