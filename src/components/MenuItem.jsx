import React        from 'react';
import { NavLink }  from 'react-router-dom';
import MenuItemIcon from './MenuItemIcon';
import Colors from '../lib/Colors';
import '../css/MainMenu.css';

let MenuItem = (props) => {
  return (
    <div className='menu-item-link' style={styles(props)}>
      <NavLink to={navlink(props)} onClick={updateBackground.bind(this, props)} prefetch='true'>
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
  background: props.background || Colors.clear
})

let navlink = props => {
  return {
    pathname: props.link,
    state: styles(props)
  }
}

let updateBackground = (props, event) => {
  // console.log('Item set bg: ' + props.background);
  // props.setBackground(props.background)
}

export default MenuItem;
