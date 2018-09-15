import React from 'react';

const NetworkIndicator = (props) => {
  let style = {}
  if(!props.online) {
    style = {
      display: 'block',
      visibility: 'visible',
      backgroundColor: 'rgba(212, 83, 0, 0.7)',
      height: '20px',
      padding: '5px 0',
      opacity: '1'
    }
  }

  return (
    <p className='online-status' style={style}>
      The App is currently {!props.online ? 'Offline' : 'Online' }!
    </p>
  )
}

export default NetworkIndicator;
