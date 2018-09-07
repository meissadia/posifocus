import React from 'react';
import { NavLink } from 'react-router-dom';
import Instructions from './Instructions';
import '../css/ListViews.css'

let Gratitudes = (props) => {
  var deleteGratitude = (event) => {
    event.preventDefault();
    props.handleDelete('gratitudes', event.target.attributes.jsvalue.value);
  }

  var list = () => {
    if(props.data.length === 0) { return <Instructions section='gratitudes'/> }

    return props.data.map((elem, index) => (
      <li className='list-item' key={index + '_' + elem.id} >
        <div className='title'>{elem.title}</div>
        <div className='content'>{elem.content}</div>
        <a className='delete' onClick={deleteGratitude} >
          <img
            jsvalue={elem.id}
            jstitle={elem.title}
            src="/images/delete-icon.png"
            alt="Delete Icon" />
        </a>
        <div className='date'>{elem.date.split(' ').slice(0,4).join(' ')}</div>
      </li>
    ))
  };

  return (
    <div className='list-wrapper'>
      <div className="flex row controls">
        <NavLink to='/#menu'>&lt; Dashboard</NavLink>
        <a style={{cursor: 'inherit', textDecoration: 'none'}}>Gratitudes</a>
        <NavLink to='/new_gratitude'>Add +</NavLink>
      </div>
      <ul className='item-list'>
        {list()}
      </ul>
    </div>
  )
}


export default Gratitudes;
