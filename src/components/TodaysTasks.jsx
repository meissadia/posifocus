import React from 'react';
import { NavLink } from 'react-router-dom';
import Instructions from './Instructions';
// import '../css/Tasks.css'

let TodaysTasks = (props) => {
  var deletePriority = (event) => {
    event.preventDefault();
    props.handleDelete('tasks', event.target.attributes.jsvalue.value);
  }

  var list = () => {
    if(props.data.length === 0) { return <Instructions section='tasks'/> }

    return props.data.filter((task) => (task.today))
      .map((task, index) => (
        <li className='list-item' key={index + '_' + task.id} >
          <div className='title'>{task.title}</div>
          <label htmlFor="today">Due Today</label>
          <input type="checkbox" name="today" defaultChecked={task.today} />
          <a className='delete' onClick={deletePriority} >
            <img
              jsvalue={task.id}
              jstitle={task.title}
              src="/images/delete-icon.png"
              alt="Delete Icon" />
          </a>
        </li>
      ));
    }

  return (
    <div className='list-wrapper'>
      <div className="flex row controls">
        <NavLink to='/'>&lt; Dashboard</NavLink>
        <a style={{cursor: 'inherit', textDecoration: 'none'}}>Today's Tasks</a>
        <a style={{cursor: 'inherit', textDecoration: 'none'}}>&nbsp;</a>
      </div>
      <ul className='item-list'>
        {list()}
      </ul>
    </div>
  )
}


export default TodaysTasks;
