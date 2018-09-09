import React from 'react';
import { NavLink } from 'react-router-dom';
import Instructions from './Instructions';
import '../css/ListViews.css';

let Contacts = (props) => {

  let valid = (prop) => {
    if(!prop || !prop.contacts || prop.contacts.length === 0)
      return false;
    return true;
  }

  let deleteContact = (event) => {
    event.preventDefault();
    props.handleDelete('contacts', event.target.attributes.jsvalue.value);
  }

  let list = () => {

    // if(!valid(props.parent)){ return <Instructions section='contacts'/>; }
    if(props.contacts.length == 0){ return <Instructions section='contacts'/>; }

    return props.contacts.map((contact, index) => (
      <li className='list-item' key={index + '_' + contact.id} >
        <div className='title'>{contact.title}</div>
        <div className='content'>{contact.content}</div>
        <a className='delete' onClick={deleteContact} >
          <img
            jsvalue={contact.id}
            jsrelationship={contact.relationship}
            src="/images/delete-icon.png"
            alt="Delete Icon" />
        </a>
      </li>
    ))
  };

  let navTitle = () => {
    if(props.parent) { return props.parent.title }
    return 'Contacts'
  }

  let addLink = () => {
    return props.match.url + '/new'
  }

  return (
    <div className='list-wrapper'>
      <div className="flex row controls">
        <NavLink to='/relationships'>&lt; Relationships</NavLink>
          <a style={{cursor: 'inherit', textDecoration: 'none'}}>{navTitle()}</a>
        <NavLink to={addLink()}>Add +</NavLink>
      </div>
      <ul className='item-list'>
        {list()}
      </ul>
    </div>
  )
}


export default Contacts;
