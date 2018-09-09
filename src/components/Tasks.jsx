import React from 'react';
import { NavLink } from 'react-router-dom';
// import '../css/Tasks.css'

let Tasks = (props) => {
  var deleteTask = (event) => {
    event.preventDefault();
    // window.alert('Task deletion not yet implemented!');
    props.handleDelete(event.target.attributes.jsvalue.value);
  }
  let params = props.match.params;
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
    let val = 'Tasks';
    if(props.project) { return props.project.title + ' Tasks' }
    return val;
  }

  let navBackText = () => {
    if(props.priority) { return props.priority.title }
    return 'Projects'
  }

  let navBackLink = () => {
    return props.match.url.split('/').slice(0,-2).join('/') + 's'
  }



  return (
    <div className='list-wrapper'>
      <div className="flex row controls">
        <NavLink to={navBackLink()}>&lt; {navBackText()}</NavLink>
        <a style={{cursor: 'inherit', textDecoration: 'none'}}>{navTitle()}</a>
        <NavLink to={`${props.match.url}/new`}>Add +</NavLink>
      </div>
      <ul className='item-list'>
        {list()}
      </ul>
    </div>
  )
}


export default Tasks;
