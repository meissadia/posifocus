import React        from 'react';
import projectsIcon from '../../images/projects@2x.png';
import tasksIcon    from '../../images/tasks@2x.png';
import '../../css/MainMenu.css';

let MenuSubmenu = (props) => (
  <div className="priorities-submenu flex row" >
    <div className="flex row" >
      <img className='icon' src={projectsIcon} alt="Folder" />
      <p>Projects: {props.projCount}</p>
    </div>
    <div className="second flex row" >
      <img className='icon' src={tasksIcon} alt="Checked Box" />
      <p>Tasks: {props.taskCount}</p>
    </div>
  </div>
)

export default MenuSubmenu
