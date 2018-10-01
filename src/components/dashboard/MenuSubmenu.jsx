import React        from 'react';
import projectsIcon      from '../../images/projects.svg';
import tasksIcon         from '../../images/tasks.svg';


import '../../css/MainMenu.css';

let MenuSubmenu = (props) => (
  <div className="priorities-submenu flex row" >
    <div className="flex row" >
      <img src={projectsIcon} className='icon' alt="Open Folder" />
      <p>Projects: {props.projCount}</p>
    </div>
    <div className="second flex row" >
      <img src={tasksIcon} className='icon' alt="Checked Box" />
      <p>Tasks: {props.taskCount}</p>
    </div>
  </div>
)

export default MenuSubmenu
