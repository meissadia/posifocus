import React from 'react';
import { NavLink } from 'react-router-dom';

const AppHeader = props => (
  <header id='header'>
    <NavLink to='/' prefetch='true'>
      <img className='app-logo'
        src='/images/posifocus-logo.png'
        alt='Posifocus Target'
        />
    </NavLink>
  </header>
)

export default AppHeader;
