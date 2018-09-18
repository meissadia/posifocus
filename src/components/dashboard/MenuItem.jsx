import React        from 'react';
import { NavLink }  from 'react-router-dom';
import MenuItemIcon from './MenuItemIcon';
import Colors from '../../lib/Colors';
import '../../css/MainMenu.css';

let MenuItem = (props) => {
  return (
    <div className='menu-item-link'>
      <NavLink to={navlink(props)} prefetch='true'>
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

let styles = props => ({
  // background: props.background || Colors.blue_green
})

let navlink = props => {
  return {
    pathname: props.link,
    state: styles(props)
  }
}


export default MenuItem;
