import React from 'react';
import { NavLink } from 'react-router-dom';
// import '../css/Tasks.css'

let Tasks = (props) => {
  var deleteTask = (event) => {
    event.preventDefault();
    window.alert('Task deletion not yet implemented!');
    // props.handleDelete('projects', event.target.attributes.jsvalue.value);
  }
  let params = props.params;
  let list = () => {
    if(props.data.length === 0) {
      return (
        <li>
          <img
            className='instructions'
            src='/images/projects-instructions-tableview.png'
            alt='Instructions' />
        </li>
      )
    }

    return props.data.map((elem, index) => (
      <li className='list-item' key={index + '_' + elem.id} >
        <div className='title'>{elem.title}</div>
        <div className='content'>Done? {elem.done ? 'Yes' : 'No'}</div>
        <div className='content'>Due Today? {elem.today ? 'Yes' : 'No'}</div>
        <a className='delete' onClick={deleteTask} >
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
    if(props.project) { return props.project.title }
    return 'Tasks';
  }

  let navBack = () => {
    if(props.priority) { return props.priority.title }
    return 'Projects'
  }



  return (
    <div className='list-wrapper'>
      <div className="flex row controls">
        <NavLink to={'/projects/' + params.priority_id }>&lt; {navBack()}</NavLink>
        <a style={{cursor: 'inherit', textDecoration: 'none'}}>{navTitle()}</a>
        <NavLink to='/new_task'>Add +</NavLink>
      </div>
      <ul className='item-list'>
        {list()}
      </ul>
    </div>
  )
}


export default Tasks;
