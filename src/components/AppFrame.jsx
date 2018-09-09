import React from 'react';

const AppFrame = (props) => {
  return (
    <div className='App'>
      <header>
        <img className='app-logo'
          src={props.logo}
          alt={props.altText}
          />
      </header>
      { props.children }
    </div>
  )
}

export default AppFrame;
