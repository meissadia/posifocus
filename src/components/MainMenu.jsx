import React        from 'react';
import MenuItem     from './MenuItem'
import Submenu      from './MenuSubmenu'
import '../css/MainMenu.css';

let resetHeader = (color) => {
  let header = document.getElementById('header');
  header.style.background = 'rgba(0, 150, 255, 1)';
}

let MainMenu = (props) => {
  return (
    <div id='main-menu' onLoad={resetHeader}>
      <MenuItem
        icon='images/gratitudes@2x.png'
        title='Gratitudes'
        tagline='Because Grateful People Are Happy'
        link='/gratitudes'
        />
      <MenuItem
        icon='images/priorities@2x.png'
        title='Priorities'
        tagline='The Most Important Aspects of Your Life'
        link='/priorities'
        >
        <Submenu
          projCount={props.projectCount}
          taskCount={props.taskCount}
          />
      </MenuItem>
      <MenuItem
        icon='images/relationships@2x.png'
        title='Relationships'
        tagline='Forget Stocks. Invest in People.'
        link='/relationships'
        />
      <MenuItem
        icon='images/tasks@2x.png'
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
