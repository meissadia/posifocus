import React from 'react';
import {NavLink} from 'react-router-dom';

let Placeholder = (props) => (
  <a className='plain-link'>
    {props.text}
  </a>
)

let PageNavigation = (props) => {
  return(
    <div className="flex row controls">
      {
        props.back ?
        <NavLink to={props.back[0]}>&lt; {props.back[1]}</NavLink> :
        <Placeholder />
      }
      <Placeholder text={props.title} />
      {
        props.add ?
        <NavLink to={props.add[0]}>{props.add[1]} +</NavLink> :
        <Placeholder />
      }
    </div>
  )
}

export default PageNavigation;
