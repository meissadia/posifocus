import React from 'react';
import { NavLink } from 'react-router-dom';
import Instructions from './Instructions';
// import '../css/Priorities.css'

let Priorities = (props) => {
  var deletePriority = (event) => {
    event.preventDefault();
    props.handleDelete('priorities', event.target.attributes.jsvalue.value);
  }

  var list = () => {
    if(props.data.length === 0) { return <Instructions section='priorities'/> }

    return props.data.map((elem, index) => (
      <li className='list-item' key={index + '_' + elem.id} >
        <NavLink to={'/priority/' + elem.id + '/projects'}>
          <div className='title'>{elem.title}</div>
        </NavLink>
        <a className='delete' onClick={deletePriority} >
          <img
            jsvalue={elem.id}
            jstitle={elem.title}
            src="/images/delete-icon.png"
            alt="Delete Icon" />
        </a>
      </li>
    ))
  };

  return (
    <div className='list-wrapper'>
      <div className="flex row controls">
        <NavLink to='/'>&lt; Dashboard</NavLink>
        <a style={{cursor: 'inherit', textDecoration: 'none'}}>Priorities</a>
        <NavLink to='/priorities/new'>Add +</NavLink>
      </div>
      <ul className='item-list'>
        {list()}
      </ul>
    </div>
  )
}


export default Priorities;
