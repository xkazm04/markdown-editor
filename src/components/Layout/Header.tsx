import React from 'react';
import DXLogo from '../../assets/dx-logo.png';

export const Header = () => {
  return (
    <div className="h-14 -z-10  bg-[#562AD0] px-5 flex justify-start items-center">
      <img src={DXLogo} alt="DX Hero logo" />
    </div>
  );
};
