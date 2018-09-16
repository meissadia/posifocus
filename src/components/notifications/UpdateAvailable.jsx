import React from 'react';

let UpdateAvailable = (props) => {
  let yes = props.update && props.online;
  let base = 'notification';

  let cssClasses = () => {
    if(yes) { return base + ' show update'; };
    return base;
  }

  let applyUpdate = (timeout=5000) => {
    if(yes && props.autoUpdate){
      setTimeout( ()=> { window.location.reload(); }, timeout );
    }
  }

  return (
    <p className={ cssClasses() }>
      Update Available: Restart the app to install!
      { applyUpdate(props.timeout) }
    </p>
  )
}

export default UpdateAvailable;
