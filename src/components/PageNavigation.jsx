import React       from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/css/PageNavigation.css';
import backIcon from '../images/back.svg';
import plusIcon from '../images/plus.svg';

let NonLink = (props) => (
  <a className={'non-link ' + props.className}>
    {props.text}
  </a>
)

let linkState = (dest) => {
  if(dest.pathname) { return dest };

  return {
    pathname: dest,
    state: {
      enter: 'enter-left'
    }
  }
}

let PageNavigation = (props) => {
  let back = 'Back';
  return(
    <div className="flex row controls">
      {
        props.back ?
        <NavLink
          to={linkState(props.back[0])}
          prefetch='true'
          className='left'
          >
          <img className='icon invert' src={backIcon} alt='Back arrow'/> {props.back[1] || back}
        </NavLink> :
        <NonLink text={props.backNonLink} className='left'/>
      }
      <NonLink text={props.title} className='middle'/>
      {
        props.add ?
        <NavLink
          to={linkState(props.add[0])}
          prefetch='true'
          className='right'
          >
          {props.add[1] || <img className='icon' alt='Plus' src={plusIcon} />}
        </NavLink> :
        <NonLink text={props.addNonLink} className='right'/>
      }
    </div>
  )
}

export default PageNavigation;
