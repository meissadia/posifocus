import React          from 'react';
import projectsIcon   from '../../images/projects.svg';
import tasksIcon      from '../../images/tasks.svg';

import '../../styles/scss/MainMenu.sass';

let MenuSubmenu = (props) => (
  <div className="priorities-submenu flex row" >
    <div className="first flex row" >
      <img src={projectsIcon} className='icon' alt="Open Folder" />
      <p>Projects:<span>{props.projCount}</span></p>
    </div>
    <div className="second flex row" >
      <img src={tasksIcon} className='icon' alt="Checked Box" />
      <p>Tasks:<span>{props.taskCount}</span></p>
    </div>
  </div>
)

export default MenuSubmenu
