import React from 'react';
import { NavLink } from 'react-router-dom';
import Instructions from './Instructions';

import '../css/ListViews.css'

let Relationships = (props) => {
  var deletePriority = (event) => {
    event.preventDefault();
    props.handleDelete('relationships', event.target.attributes.jsvalue.value);
  }

  var list = () => {
if(props.data.length === 0) { return <Instructions section='relationships'/> }

    return props.data.map((elem, index) => (
      <li className='list-item' key={index + '_' + elem.id} >
        <NavLink to={`/contacts/${elem.id}`}>
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
        <NavLink to='/#menu'>&lt; Dashboard</NavLink>
        <a style={{cursor: 'inherit', textDecoration: 'none'}}>Relationships</a>
        <NavLink to='/new_relationship'>Add +</NavLink>
      </div>
      <ul className='item-list'>
        {list()}
      </ul>
    </div>
  )
}


export default Relationships;
