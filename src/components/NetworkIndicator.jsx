import React from 'react';

const NetworkIndicator = (props) => {
  let style = {}
  if(!props.online) {
    style = {
      display: 'block',
      visibility: 'visible',
      backgroundColor: 'rgba(60, 26, 4, 0.7)',
      height: '25px',
      lineHeight: '25px',
      padding: '5px 0',
      opacity: '1',
      boxShadow: '0px -125px 125px 50px grey'
    }
  }

  return (
    <p className='online-status' style={style}>
      The Network is Unreachable
    </p>
  )
}

export default NetworkIndicator;
