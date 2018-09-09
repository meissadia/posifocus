import React from 'react';
import { NavLink } from 'react-router-dom';

const AppFrame = (props) => {
  return (
    <div className='App'>
      <header>
        <NavLink to='/'>
          <img className='app-logo'
            src={props.logo}
            alt={props.altText}
            />
        </NavLink>
      </header>
      { props.children }
    </div>
  )
}

export default AppFrame;
