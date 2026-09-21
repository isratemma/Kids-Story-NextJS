import React from 'react';
import Logo from '@/components/layouts/Logo';

const loading = () => {
  return (
    <div>
      <div className="flex flex-col min-h-screen justify-center items-center gap-5 ">
        <h2 className="text-5xl font-bold animated-pulse">Loading</h2>
        <div>
          <Logo></Logo>
        </div>
      </div>
    </div>
  );
};

export default loading;
