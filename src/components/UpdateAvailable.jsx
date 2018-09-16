import React from 'react';

let UpdateAvailable = (props) => {
  let styles = () => {
    if(props.update && props.online) {
      return (
        {
          display: 'block',
          visibility: 'visible',
          color: 'white',
          backgroundColor: 'rgb(47, 115, 51)',
          height: '25px',
          lineHeight: '25px',
          padding: '5px 0',
          opacity: '1'
        }
      );
    }
    return {};
  }

  return (
    <p className='online-status' style={styles()}>
      Update Available: Restart the app to install!
    </p>
  )
}

export default UpdateAvailable;
