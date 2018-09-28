import React        from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import '../../css/MainMenu.css';

let MenuSubmenu = (props) => (
  <div className="priorities-submenu flex row" >
    <div className="flex row" >
      <FontAwesomeIcon className='icon' icon={faFolderOpen} size='3x' invert='true' />
      <p>Projects: {props.projCount}</p>
    </div>
    <div className="second flex row" >
      <FontAwesomeIcon className='icon' icon={faCheckSquare} size='3x' invert='true' />
      <p>Tasks: {props.taskCount}</p>
    </div>
  </div>
)

export default MenuSubmenu
