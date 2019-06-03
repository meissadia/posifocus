import React from 'react';
import appLogo from '../images/posifocus-logo.png';

export const DashHeader = props => (
  <header id='header'>
    <img className='app-logo'
      src={appLogo}
      alt='Posifocus Target'
    />
  </header>
);

export default DashHeader;
