import React        from 'react';
import { NavLink }  from 'react-router-dom';
import MenuItemIcon from './MenuItemIcon';
import '../css/MainMenu.css';

let MenuItem = (props) => {
  return (
    <div className='menu-item-link' >
      <NavLink to={props.link} prefetch='true'>
        <div className='flex menu-item'>
          <MenuItemIcon icon={props.icon} title={props.title} />
          <div className="menu-item-details">
            <p className='title'>{props.title || <br />}</p>
            <p className='tagline'>{props.tagline || <br />}</p>
          </div>
        </div>
        {props.children}
      </NavLink>
    </div>
  )
}

export default MenuItem;
