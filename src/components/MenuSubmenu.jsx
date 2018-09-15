import React from 'react';
import '../css/MainMenu.css';

let MenuSubmenu = (props) => (
  <div className="priorities-submenu flex row" >
    <div className="flex row" >
      <img className='icon' src='images/projects@2x.png' alt="Folder" />
      <p>Projects: {props.projCount}</p>
    </div>
    <div className="second flex row" >
      <img className='icon' src='images/tasks@2x.png' alt="Checked Box" />
      <p>Tasks: {props.taskCount}</p>
    </div>
  </div>
)

export default MenuSubmenu
