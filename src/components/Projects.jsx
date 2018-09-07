import React from 'react';
import { NavLink } from 'react-router-dom';
import Instructions from './Instructions';
// import '../css/Projects.css'

let Projects = (props) => {
  var deleteProject = (event) => {
    event.preventDefault();
    // props.handleDelete('projects', event.target.attributes.jsvalue.value);
    window.alert('Project deletion not yet implemented!');
  }
  let list = () => {
    if(props.data.length === 0) { return <Instructions section='projects'/> }

    return props.data.map((elem, index) => (
      <li className='list-item' key={index + '_' + elem.id} >
        <NavLink to={'/projects/' + props.parent.id + '/tasks/' + elem.id} >
          <div className='title'>{elem.title}</div>
        </NavLink>
        <a className='delete' onClick={deleteProject} >
          <img
            jsvalue={elem.id}
            jstitle={elem.title}
            src="/images/delete-icon.png"
            alt="Delete Icon" />
        </a>
      </li>
    ))
  };

  let navTitle = () => {
    if(props.parent) { return props.parent.title }
    return 'Projects'
  }

  return (
    <div className='list-wrapper'>
      <div className="flex row controls">
        <NavLink to='/priorities'>&lt; Priorities</NavLink>
        <a style={{cursor: 'inherit', textDecoration: 'none'}}>{navTitle()}</a>
        <NavLink to='/new_task'>Add +</NavLink>
      </div>
      <ul className='item-list'>
        {list()}
      </ul>
    </div>
  )
}


export default Projects;
