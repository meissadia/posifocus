import React       from 'react';
import { NavLink } from 'react-router-dom';

let NonLink = (props) => (
  <a className='non-link'>
    {props.text}
  </a>
)

let PageNavigation = (props) => {
  let add = 'New +';
  let back = '< Back';
  return(
    <div className="flex row controls">
      {
        props.back ?
        <NavLink to={props.back[0]}>&lt; {props.back[1] || back}</NavLink> :
        <NonLink />
      }
      <NonLink text={props.title} />
      {
        props.add ?
        <NavLink to={props.add[0]}>{props.add[1] || add}</NavLink> :
        <NonLink />
      }
    </div>
  )
}

export default PageNavigation;
