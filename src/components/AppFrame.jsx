import React       from 'react';
import { NavLink } from 'react-router-dom';
import logo        from '../images/posifocus-logo.png';

const AppFrame = (props) => {
  return (
    <div className='App'>
      <header>
        <NavLink to='/' prefetch='true'>
          <img className='app-logo'
            src={logo}
            alt='Posifocus Target'
            />
        </NavLink>
      </header>
      { props.children }
    </div>
  )
}

export default AppFrame;
