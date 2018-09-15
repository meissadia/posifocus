import React       from 'react';
import { NavLink } from 'react-router-dom';

const AppFrame = (props) => {
  return (
    <div className='App'>
      <header>
        <NavLink to='/' prefetch='true'>
          <img className='app-logo'
            src='/images/posifocus-logo.png'
            alt='Posifocus Target'
            />
        </NavLink>
      </header>
      { props.children }
    </div>
  )
}

export default AppFrame;
