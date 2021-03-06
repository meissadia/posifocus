import React        from 'react';
import { NavLink }  from 'react-router-dom';
import MenuItemIcon from './MenuItemIcon';
import '../../styles/css/MainMenu.css';

let MenuItem = (props) => {
  return (
    <div className='menu-item-link'>
      <NavLink to={navlink(props)} prefetch='true'>
        <div className='flex menu-item'>
          { props.faIcon ||
              <MenuItemIcon
                icon={props.icon}
                title={props.title}
                invert={props.iconInvert}
                />
          }
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

let navlink = props => {
  return {
    pathname: props.link,
  }
}


export default MenuItem;
