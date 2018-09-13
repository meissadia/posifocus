import React        from 'react';
import MenuItem     from './MenuItem'
import Submenu      from './MenuSubmenu'
import '../css/MainMenu.css';
import gratitudes from '../images/gratitudes@2x.png';
import priorities from '../images/priorities@2x.png';
import relationships from '../images/relationships@2x.png';
import tasks from '../images/tasks@2x.png';

let MainMenu = (props) => {
  return (
    <div id='main-menu'>
      <MenuItem
        icon={gratitudes}
        title='Gratitudes'
        tagline='Because Grateful People Are Happy'
        link='/gratitudes'
        />
      <MenuItem
        icon={priorities}
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
        icon={relationships}
        title='Relationships'
        tagline='Forget Stocks. Invest in People.'
        link='/relationships'
        />
      <MenuItem
        icon={tasks}
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
