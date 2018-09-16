import React from 'react';

const AppOffline = (props) => {
  let offline = !props.online;
  let base = 'notification';

  let cssClasses = () => {
    if(offline) { return  base + ' show offline'; };
    return base;
  }

  return (
    <p className={ cssClasses() } >
      The Network is Unreachable
    </p>
  )
}

export default AppOffline;
