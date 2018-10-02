import React       from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/css/PageNavigation.css';
import backIcon from '../images/back.svg';
import plusIcon from '../images/plus.svg';

let NonLink = (props) => (
  <a className='non-link'>
    {props.text}
  </a>
)

let PageNavigation = (props) => {
  // let add = 'New';
  let back = 'Back';
  return(
    <div className="flex row controls">
      {
        props.back ?
        <NavLink
          to={{pathname: props.back[0], state: {enter: 'enter-left'}}}
          prefetch='true'>
          <img className='icon invert' src={backIcon} alt='Back arrow'/> {props.back[1] || back}
        </NavLink> :
        <NonLink text={props.backNonLink}/>
      }
      <NonLink text={props.title} />
      {
        props.add ?
        <NavLink to={props.add[0]} prefetch='true'>
          {props.add[1] || <img className='icon' alt='Plus' src={plusIcon} />}
        </NavLink> :
        <NonLink text={props.addNonLink}/>
      }
    </div>
  )
}

export default PageNavigation;
