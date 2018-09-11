import React       from 'react';
import { NavLink } from 'react-router-dom';
import '../css/PageNavigation.css';

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
        <NavLink to={props.back[0]} prefetch='true'>&lt; {props.back[1] || back}</NavLink> :
        <NonLink />
      }
      <NonLink text={props.title} />
      {
        props.add ?
        <NavLink to={props.add[0]} prefetch='true'>{props.add[1] || add}</NavLink> :
        <NonLink />
      }
    </div>
  )
}

export default PageNavigation;
