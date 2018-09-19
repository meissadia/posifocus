import React from 'react';
import { NavLink } from 'react-router-dom';
import appLogo from '../images/posifocus-logo.png';

const AppHeader = props => {
  return (
    <header id='header'>
      <NavLink to='/' prefetch='true'>
        <img className='app-logo'
          src={appLogo}
          alt='Posifocus Target'
          />
      </NavLink>
    </header>
  )
}

export default AppHeader;
