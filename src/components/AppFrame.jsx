import React       from 'react';
// import Colors from '../lib/Colors';

const AppFrame = (props) => {
  return (
    <div id='App' className={classes(props)}>
      { props.children }
    </div>
  )
}

let classes = props => {
  return props.background
}

export default AppFrame;
