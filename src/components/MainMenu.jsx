import React        from 'react';
import { NavLink }  from 'react-router-dom';
import MenuItemIcon from './MenuItemIcon';
import '../css/MainMenu.css';

let MenuItem = (props) => {
  return (
    <div className='menu-item-link' >
      <NavLink to={props.link}>
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

let MainMenu = (props) => {
  return (
    <div id='main-menu'>
      <MenuItem
        icon='/images/gratitudes@2x.png'
        title='Gratitudes'
        tagline='Because Grateful People Are Happy'
        link='/gratitudes'
        />
      <MenuItem
        icon='/images/priorities@2x.png'
        title='Priorities'
        tagline='The Most Important Aspects of Your Life'
        link='/priorities' >
        <div className="priorities-submenu flex row" style={{background: 'rgba(0, 155, 180, 0.8)'}} >
          <div className="flex row" >
            <img className='icon' src="/images/projects@2x.png" alt="Folder Icon" />
            <p>Projects: {props.projects.length}</p>
          </div>
          <div className="second flex row" style={{background: 'rgba(0, 165, 180, 0.8)'}}>
            <img className='icon' src="/images/tasks@2x.png" alt="Folder Icon" />
            <p>Tasks: {props.tasks.length}</p>
          </div>
        </div>
      </MenuItem>
      <MenuItem
        icon='/images/relationships@2x.png'
        title='Relationships'
        tagline='Forget Stocks. Invest in People.'
        link='/relationships'
        />
      <MenuItem
        icon='/images/tasks@2x.png'
        title="Today's Tasks"
        tagline='Stay Focused, Make an Impact'
        link='/tasks/today'
        />
      <a id='reset-state' href='/' onClick={props.reset} >
        Reset Data
      </a>
    </div>
  )
}

export default MainMenu;
