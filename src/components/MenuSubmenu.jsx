import React from 'react';
import '../css/MainMenu.css';
import projects from '../images/projects@2x.png';
import tasks from '../images/tasks@2x.png';

let MenuSubmenu = (props) => (
  <div className="priorities-submenu flex row" >
    <div className="flex row" >
      <img className='icon' src={projects} alt="Folder" />
      <p>Projects: {props.projCount}</p>
    </div>
    <div className="second flex row" >
      <img className='icon' src={tasks} alt="Checked Box" />
      <p>Tasks: {props.taskCount}</p>
    </div>
  </div>
)

export default MenuSubmenu
