import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/scss/PageNavigation.sass';
import backIcon from '../images/back.svg';
import plusIcon from '../images/plus.svg';
import homeIcon from '../images/home2.svg';

const back = 'Back';

const NonLink = props => {
  if (!props.text || props.text === '-') return null;
  return (
    <button className={'non-link ' + props.className}>
      {props.text}
    </button>
  )
}

const linkState = (dest) => {
  if (dest.pathname) { return dest };

  return {
    pathname: dest,
    state: {
      enter: 'enter-left'
    }
  }
}

const ActionsLeft = props => {
  if (props.back) {
    const showIcon = props.back[0].showIcon !== 'no';

    return (
      <NavLink
        to={linkState(props.back[0])}
        prefetch='true'
        className='left'
      >
        {showIcon &&
          <img className='icon invert' src={backIcon} alt='Back arrow' />
        }
        {props.back[1] || back}
      </NavLink>
    )
  }

  return <NonLink text={props.backNonLink} className='left' />
}

const HomeAction = () => (
  <NavLink
    to={'/'}
    prefetch='true'
    className='right'
  >
    {<img className='icon invert home' alt='Home' src={homeIcon} />}
  </NavLink>
)

const ActionsRight = props => (
  <div className='right'>
    {!props.hideHome && <HomeAction />}
    {
      props.add &&
      <NavLink
        to={linkState(props.add[0])}
        prefetch='true'
      >
        {props.add[1] || <img className='icon' alt='Plus' src={plusIcon} />}
      </NavLink>
    }
    {
      !props.add &&
      <NonLink text={props.addNonLink} className='right' />
    }

  </div>
)

const ActionBar = props => (
  <div className="flex row controls">
    <ActionsLeft {...props} />
    {props.middle}
    <ActionsRight {...props} />
  </div>
);

const PageNavigation = (props) => {
  return (
    <div className='page-nav'>
      <ActionBar {...props} />
      <NonLink text={props.title} className='title' />
    </div>
  )
}

export default PageNavigation;
